import { prisma } from "../config/db.js";
import { sendEmail } from "../utils/email.js";
import { inspectionAdminNotification, inspectionUserConfirmation } from "../utils/emailTemplates.js";
import { env } from "../config/env.js";

// POST /api/inspections
export const submitInspection = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    location,
    preferredDate,
    preferredTime,
    property, // listing slug, optional
    inspectionType,
    message,
    website,
  } = req.body;

  if (website) {
    return res.status(201).json({ success: true });
  }

  // The form sends a listing SLUG (human-readable, from the dropdown),
  // but our database relation needs the listing's ID.
  let listing = null;
  if (property) {
    listing = await prisma.listing.findUnique({ where: { slug: property } });
  }

  const booking = await prisma.inspectionBooking.create({
    data: {
      name: fullName,
      email,
      phone,
      location: location || null,
      preferredDate,
      preferredTime: preferredTime || null,
      inspectionType: inspectionType || null,
      notes: message || null,
      listingId: listing?.id || null,
    },
  });

  sendEmail({
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `New inspection booking from ${fullName}`,
    html: inspectionAdminNotification({
      name: fullName,
      email,
      phone,
      location,
      preferredDate,
      preferredTime,
      inspectionType,
      propertyTitle: listing?.title,
      message,
    }),
  }).catch(() => {});

  sendEmail({
    to: email,
    subject: "Inspection Booking Received — FAJ Prime Estates",
    html: inspectionUserConfirmation({ name: fullName, preferredDate, preferredTime }),
  }).catch(() => {});

  res.status(201).json({ success: true, id: booking.id });
};
