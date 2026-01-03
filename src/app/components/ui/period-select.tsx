"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./select";
import { Period } from "./time-picker-utils";

interface TimePeriodSelectProps {
    period: Period;
    setPeriod: (period: Period) => void;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    onLeftFocus?: () => void;
}

export const TimePeriodSelect = React.forwardRef<
    HTMLButtonElement,
    TimePeriodSelectProps
>(({ period, setPeriod, date, setDate, onLeftFocus }, ref) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowLeft") onLeftFocus?.();
    };

    const handleValueChange = (value: Period) => {
        setPeriod(value);
    
        const newDate = date ? new Date(date) : new Date();
        const hours = newDate.getHours();
    
        if (value === "PM" && hours < 12) {
          newDate.setHours(hours + 12);
        } else if (value === "AM" && hours >= 12) {
          newDate.setHours(hours - 12);
        }
    
        setDate(newDate);
      };

    return (
        <Select
            value={period}
            onValueChange={(value: Period) => handleValueChange(value)}
        >
            <SelectTrigger
                ref={ref}
                className="w-16"
                onKeyDown={handleKeyDown}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
        </Select>
    )
});

TimePeriodSelect.displayName = "TimePeriodSelect";
