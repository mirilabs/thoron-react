import React, { useState } from "react";
import { NumberField as BaseNumberField } from "@base-ui-components/react";
import "./NumberField.scss";

interface NumberFieldProps {
  className?: string;
  label?: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

function NumberField({
  className,
  label,
  name,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  required = false,
  ...props
}: NumberFieldProps) {
  const [isFocused, setFocused] = useState(false);

  return (
    <BaseNumberField.Root
      className={"number-field " + (className ?? "")}
      name={name}
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      required={required}
      {...props}
      >
      <label htmlFor={name}>{label}</label>
      <BaseNumberField.Group className={"group" + (isFocused ? " focused" : "")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}>
        <BaseNumberField.Decrement className="decrement"
          name={name}>
          <i className="fas fa-minus fa-sm" />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="input"
          name={name} />
        <BaseNumberField.Increment className="increment"
          name={name}>
          <i className="fas fa-plus fa-sm" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

export default NumberField;
export type {
  NumberFieldProps
};