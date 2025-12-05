import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface InputProps extends HTMLMotionProps<"input"> {
  label?: string;
  error?: string;
  icon?: React.ElementType;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-stone-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-stone-400" />
            </div>
          )}
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            ref={ref}
            className={`
              block w-full rounded-md border-stone-300 shadow-sm
              focus:border-stone-500 focus:ring-stone-500 sm:text-sm
              bg-stone-50 text-stone-900 placeholder-stone-400
              p-3 autofill:bg-stone-50
              ${Icon ? "pl-10" : "pl-3"}
              ${
                error
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                  : ""
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-stone-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
