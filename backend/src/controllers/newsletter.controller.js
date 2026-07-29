import { prisma } from "../config/db.js";

// POST /api/newsletter
export const subscribeNewsletter = async (req, res) => {
  const { email, website } = req.body;

  if (website) {
    return res.status(201).json({ success: true });
  }

  // Idempotent: subscribing twice with the same email is a normal thing
  // a visitor might do (double-click, forgot they already signed up) —
  // treat it as success rather than an error.
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    return res.status(200).json({ success: true, alreadySubscribed: true });
  }

  const subscriber = await prisma.newsletterSubscriber.create({ data: { email } });
  res.status(201).json({ success: true, id: subscriber.id });
};
