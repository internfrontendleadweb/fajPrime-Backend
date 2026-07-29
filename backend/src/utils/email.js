// Email sending, wrapped so the rest of the app never talks to Resend
// directly. If RESEND_API_KEY isn't set (e.g. you haven't signed up yet,
// or you're just running this locally without wanting real emails to
// fire), this logs the email to the console instead of sending it —
// so nothing crashes and you can still see exactly what would have
// been sent.

import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export async function sendEmail({ to, subject, html }) {
  if (!resend) {
    console.log("\n📧 [email:dev-mode] RESEND_API_KEY not set — logging instead of sending:");
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body:\n${html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}\n`);
    return { simulated: true };
  }

  try {
    const result = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return result;
  } catch (err) {
    // Email failures should never take down a form submission that
    // already saved successfully to the database — log and move on.
    console.error("Email send failed:", err.message);
    return { error: err.message };
  }
}
