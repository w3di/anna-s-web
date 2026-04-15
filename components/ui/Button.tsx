import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import { getLocalizedHref } from "@/lib/locale-routing";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "dark"
  | "cream"
  | "white"
  | "subtle";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  locale?: Locale;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  full?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends SharedProps {
  as?: "button";
}

export interface ButtonLinkProps extends SharedProps {
  as: "link";
  href: string;
  external?: boolean;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof SharedProps | "as"
>;

type Props = (ButtonProps & NativeButtonProps) | ButtonLinkProps;

function Spinner({ dark }: { dark?: boolean }) {
  return (
    <span
      className={dark ? styles.spinnerDark : styles.spinner}
      aria-hidden="true"
    />
  );
}

function buildClass(
  variant: ButtonVariant,
  size: ButtonSize,
  full: boolean,
  iconOnly: boolean,
  extra?: string
) {
  return [
    styles.btn,
    styles[variant],
    styles[size],
    full ? styles.full : "",
    iconOnly ? styles.iconOnly : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function ButtonContent({
  iconLeft,
  iconRight,
  loading,
  dark,
  children,
}: {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  dark?: boolean;
  children?: ReactNode;
}) {
  if (loading) {
    return (
      <>
        <Spinner dark={dark} />
        {children && <span style={{ opacity: 0.7 }}>{children}</span>}
      </>
    );
  }
  return (
    <>
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </>
  );
}

const Button = forwardRef<HTMLButtonElement, Props>((allProps, ref) => {
  const {
    variant = "primary",
    size = "md",
    locale,
    loading = false,
    full = false,
    iconOnly = false,
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
  } = allProps as ButtonProps & NativeButtonProps & { as?: string };

  const cls = buildClass(variant, size, full, iconOnly, className);
  const isDarkContent =
    variant === "outline" ||
    variant === "ghost" ||
    variant === "cream" ||
    variant === "subtle";

  const content = (
    <ButtonContent
      iconLeft={iconLeft}
      iconRight={iconRight}
      loading={loading}
      dark={isDarkContent}
    >
      {children}
    </ButtonContent>
  );

  const isLinkButton =
    "href" in allProps && (allProps as ButtonLinkProps).as === "link";

  if (isLinkButton) {
    const { href, external } = allProps as ButtonLinkProps;
    const resolvedHref =
      external || !locale ? href : getLocalizedHref(locale, href);

    if (external) {
      return (
        <a
          href={resolvedHref}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={resolvedHref} className={cls}>
        {content}
      </Link>
    );
  }

  const {
    disabled,
    type = "button",
    onClick,
    ...domRest
  } = rest as NativeButtonProps & {
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

  return (
    <button
      ref={ref}
      className={cls}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      {...domRest}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
