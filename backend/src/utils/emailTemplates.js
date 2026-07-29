// Small HTML email templates. Kept plain and table-free on purpose —
// simple HTML renders reliably across every email client, unlike
// elaborate designed templates which often break in Outlook.

function wrapper(title, bodyHtml) {
  return `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #1a2a3a;">
      <h2 style="color: #0f1f2e; border-bottom: 2px solid #c9a227; padding-bottom: 12px;">${title}</h2>
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #888;">FAJ Prime Estates</p>
    </div>
  `;
}

export function contactAdminNotification({ name, email, phone, subject, message }) {
  return wrapper(
    "New Contact Form Submission",
    `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f5f5f0; padding: 12px; border-radius: 4px;">${message}</p>
    `
  );
}

export function contactUserConfirmation({ name }) {
  return wrapper(
    "We've received your message",
    `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to FAJ Prime Estates. A member of our team will respond within 24 hours.</p>
    `
  );
}

export function inspectionAdminNotification({
  name,
  email,
  phone,
  location,
  preferredDate,
  preferredTime,
  inspectionType,
  propertyTitle,
  message,
}) {
  return wrapper(
    "New Site Inspection Booking",
    `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location || "Not specified"}</p>
      <p><strong>Property:</strong> ${propertyTitle || "General inspection (no specific property)"}</p>
      <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
      <p><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</p>
      <p><strong>Inspection Type:</strong> ${inspectionType || "Not specified"}</p>
      ${message ? `<p><strong>Message:</strong></p><p style="background: #f5f5f0; padding: 12px; border-radius: 4px;">${message}</p>` : ""}
    `
  );
}

export function inspectionUserConfirmation({ name, preferredDate, preferredTime }) {
  return wrapper(
    "Inspection Booking Received",
    `
      <p>Hi ${name},</p>
      <p>Thank you for booking a site inspection with FAJ Prime Estates.</p>
      <p>Requested: <strong>${new Date(preferredDate).toLocaleDateString()}${preferredTime ? ` at ${preferredTime}` : ""}</strong></p>
      <p>Our team will call you within 24 hours to confirm the details.</p>
    `
  );
}
