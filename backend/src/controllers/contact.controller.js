import { prisma } from "../config/db.js";
import { sendEmail } from "../utils/email.js";
import { contactAdminNotification, contactUserConfirmation } from "../utils/emailTemplates.js";
import { env } from "../config/env.js";

// POST /api/contact
export const submitContact = async (req, res) => {
  const { name, email, phone, subject, message, website } = req.body;

  // Honeypot tripped — pretend success, don't save, don't email, don't
  // tell the bot anything useful.
  if (website) {
    return res.status(201).json({ success: true });
  }

  const submission = await prisma.contactSubmission.create({
    data: { name, email, phone: phone || null, subject: subject || null, message },
  });

  // Fire both emails without blocking the response on them — the form
  // submission already succeeded (saved to DB) by this point, so a slow
  // or failed email shouldn't make the visitor wait or see an error.
  sendEmail({
    to: env.ADMIN_NOTIFICATION_EMAIL,
    subject: `New contact form submission from ${name}`,
    html: contactAdminNotification({ name, email, phone, subject, message }),
  }).catch(() => {});

  sendEmail({
    to: email,
    subject: "We've received your message — FAJ Prime Estates",
    html: contactUserConfirmation({ name }),
  }).catch(() => {});

  res.status(201).json({ success: true, id: submission.id });
};
