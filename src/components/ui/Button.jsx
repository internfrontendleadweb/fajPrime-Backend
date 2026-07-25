import { Link } from "react-router-dom";

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  text: "inline-flex items-center gap-1.5 text-gold-600 font-semibold text-small hover:gap-2.5 transition-all duration-300 ease-out-soft",
};

const sizeClasses = {
  sm: "!px-5 !py-2.5 !text-small",
  md: "",
  lg: "!px-10 !py-5 !text-body-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  icon: Icon,
  iconPosition = "right",
  ...rest
}) {
  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  }`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  );
}
