"use client";

import { Input } from "./input";
import { cn } from "./utils";
import * as React from "react";
import { Period } from "./time-picker-utils";

interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: "12hours" | "minutes" | "seconds";
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onLeftFocus?: () => void;
  onRightFocus?: () => void;
  period?: Period;
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    { className, type = "number", picker, date, setDate, onLeftFocus, onRightFocus, period, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState<string>(getPickerValue());

    function getPickerValue() {
        if (!date) return "";
        if (picker === "12hours") {
            const hours = date.getHours();
            if (hours === 0) return "12";
            if (hours > 12) return (hours - 12).toString();
            return hours.toString();
        }
        if (picker === "minutes") return date.getMinutes().toString().padStart(2, '0');
        if (picker === "seconds") return date.getSeconds().toString().padStart(2, '0');
        return "";
    }

    React.useEffect(() => {
        setInputValue(getPickerValue());
    }, [date]);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowRight") onRightFocus?.();
        if (e.key === "ArrowLeft") onLeftFocus?.();
    };
  
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handleBlur = () => {
        const value = parseInt(inputValue);
        if (isNaN(value)) {
            setInputValue(getPickerValue());
            return;
        }

        const newDate = date ? new Date(date) : new Date();

        if (picker === "12hours") {
            let hours = value;
            if (period === "PM" && hours < 12) {
                hours += 12;
            } else if (period === "AM" && hours === 12) {
                hours = 0;
            }
            newDate.setHours(hours);
        } else if (picker === "minutes") {
            newDate.setMinutes(value);
        } else if (picker === "seconds") {
            newDate.setSeconds(value);
        }

        setDate(newDate);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return (
      <Input
        ref={ref}
        type={type}
        className={cn(
          "w-16 text-center text-base",
          className
        )}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput };
