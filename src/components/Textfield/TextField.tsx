import React, { ReactElement } from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean | string;
  errorMessage?: any;
  fullWidth?: boolean;
  label?: any;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
}

const TextField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      defaultValue,
      disabled = false,
      error = false,
      errorMessage,
      fullWidth = false,
      label,
      name,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      required,
      type = "text",
      value,
    }: Props,
    ref,
  ): ReactElement => {
    const inputStyles = [
      "mt-2 py-3 rounded-sm border w-full text-sm font-sans tracking-wide text-gray-500 h-10 placeholder-gray-500",
      type !== "password" && "px-4",
      type === "password" && "pl-3 pr-8",
      !error &&
        !disabled &&
        "bg-white border-gray-200 transition-all focus:border-gray-400 outline-none hover:shadow-2xl focus:shadow-md",
      !error &&
        disabled &&
        "bg-gray-200 border-gray-200 transition-all focus:border-gray-400 outline-none cursor-not-allowed",
      error &&
        !disabled &&
        "bg-white border-error transition-all focus:border-error outline-none hover:shadow-2xl focus:shadow-md",
    ];

    const labelStyles = [
      error && !disabled && "text-error text-base font-sans mb-2 tracking-wide",
      !error && !disabled && "text-gray-900 text-base mb-2 font-sans tracking-wide",
    ];

    const rootStyles = ["font-sans", fullWidth && "w-full", !fullWidth && "w-64", className];

    return (
      <div className={clsx(rootStyles)}>
        {label && (
          <label className={clsx(labelStyles)}>
            {label} {required && <span className="text-alert">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            className={clsx(inputStyles)}
            name={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            ref={ref}
            aria-label={`Input field for ${label}`}
          />
        </div>
        {error && errorMessage && <div className="py-1 text-xs text-error">{errorMessage}</div>}
      </div>
    );
  },
);

export default TextField;
