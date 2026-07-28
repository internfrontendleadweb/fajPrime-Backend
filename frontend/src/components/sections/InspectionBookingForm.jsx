import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Textarea from "../ui/Textarea.jsx";
import DatePicker from "../ui/DatePicker.jsx";
import TimePicker from "../ui/TimePicker.jsx";
import Button from "../ui/Button.jsx";
import { validators } from "../../utils/validators.js";
import { locations } from "../../constants/locations.js";
import { api } from "../../services/api.js";

const inspectionTypes = ["Private Viewing", "Group Tour", "Virtual Inspection"];

export default function InspectionBookingForm() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getListings().then((data) => {
      if (!cancelled) setListings(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    await api.submitInspectionBooking(data);
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="bg-gold-50 rounded-lg p-10 text-center">
        <CheckCircle2 size={44} className="text-gold-600 mx-auto mb-4" />
        <p className="font-serif text-h3 text-navy-900 mb-2">Inspection Booked</p>
        <p className="text-body text-slate-500 max-w-sm mx-auto">
          Thank you. Our team will call you within 24 hours to confirm your inspection details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full Name" placeholder="Your full name" error={errors.fullName?.message} {...register("fullName", validators.name)} />
        <Input label="Email Address" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", validators.email)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Phone Number" placeholder="+234 800 000 0000" error={errors.phone?.message} {...register("phone", validators.phone)} />
        <Select label="Location" placeholder="Select preferred location" options={locations} {...register("location")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Controller
          name="preferredDate"
          control={control}
          rules={{ required: "Please choose a date" }}
          render={({ field }) => (
            <DatePicker label="Preferred Date" error={errors.preferredDate?.message} {...field} />
          )}
        />
        <Controller
          name="preferredTime"
          control={control}
          rules={{ required: "Please choose a time" }}
          render={({ field }) => (
            <TimePicker label="Preferred Time" error={errors.preferredTime?.message} {...field} />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Property"
          placeholder="Select a property (optional)"
          options={listings.map((l) => ({ value: l.slug, label: l.title }))}
          {...register("property")}
        />
        <Select label="Inspection Type" placeholder="Select type" options={inspectionTypes} {...register("inspectionType")} />
      </div>

      <Textarea label="Additional Message (optional)" placeholder="Anything else we should know?" {...register("message")} />

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full justify-center" icon={Send}>
        {isSubmitting ? "Booking..." : "Submit Booking Request"}
      </Button>
    </form>
  );
}
