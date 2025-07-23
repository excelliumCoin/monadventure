"use client"

import * as React from "react"

// Simple placeholder calendar component that doesn't use external dependencies
// This component is not used in the game but exists to prevent build errors

interface CalendarProps {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  mode?: string;
}

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <div className={`p-3 ${className || ''}`} {...props}>
      <div className="text-center text-gray-500">
        Calendar component placeholder
      </div>
    </div>
  )
}

export { Calendar }
