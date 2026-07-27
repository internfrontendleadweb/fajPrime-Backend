import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import { validators } from "../../utils/validators.js";
import { api } from "../../services/api.js";

export default function ContactForm({ agentContext }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    await api.submitContactForm({ ...data, agentContext });
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="bg-gold-50 rounded-lg p-8 text-center">
        <CheckCircle2 size={40} className="text-gold-600 mx-auto mb-4" />
        <p className="font-serif text-h4 text-navy-900 mb-2">Message sent</p>
        <p className="text-small text-slate-500">
          Thank you for reaching out. A member of our team will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full Name" placeholder="Your name" error={errors.name?.message} {...register("name", validators.name)} />
        <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", validators.email)} />
      </div>
      <Input label="Phone Number" placeholder="+234 800 000 0000" error={errors.phone?.message} {...register("phone", validators.phone)} />
      <Input label="Subject" placeholder="What's this about?" {...register("subject")} />
      <Textarea label="Message" placeholder="Tell us how we can help..." error={errors.message?.message} {...register("message", validators.message)} />

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full justify-center" icon={Send}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
