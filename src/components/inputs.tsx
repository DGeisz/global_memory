import React from "react";
import { Input } from "antd";
import clsx from "clsx";

const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const UnderlinedInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      rootClassName={clsx(
        // "text-3xl",
        "text-white",
        "placeholder:text-gray-700",
        "rounded-none",
        "border-0 border-b border-solid border-neutral-500",
        props.className,
      )}
      variant={"borderless"}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

export const TextAreaInput: React.FC<InputProps | { rows?: number }> = (
  props,
) => {
  const { rows, placeholder, onChange, className } = props;

  return (
    <TextArea
      rows={rows ?? 4}
      placeholder={placeholder}
      rootClassName={clsx(
        "!bg-neutral-200/10",
        "text-neutral-200",
        "placeholder:text-neutral-400",
        className,
      )}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
