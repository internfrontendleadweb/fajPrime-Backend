export const validators = {
  required: (label = "This field") => ({
    required: `${label} is required`,
  }),

  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
  },

  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[+]?[\d\s-]{10,15}$/,
      message: "Enter a valid phone number",
    },
  },

  name: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },

  message: {
    required: "Message is required",
    minLength: {
      value: 10,
      message: "Message must be at least 10 characters",
    },
  },
};
