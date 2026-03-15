/**
 * CTALink — thin compatibility wrapper around Button (SSR).
 * Kept for backward compatibility; prefer Button directly in new code.
 */
import Button, { ButtonVariant } from "./ui/Button";

interface CTALinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function CTALink({
  href,
  children,
  variant = "primary",
  size = "md",
}: CTALinkProps) {
  return (
    <Button as="link" href={href} variant={variant} size={size}>
      {children}
    </Button>
  );
}
