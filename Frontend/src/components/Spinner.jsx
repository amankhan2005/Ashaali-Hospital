// src/components/Spinner.jsx
import React from "react";

export default function Spinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        aria-label="Loading"
        className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"
      />
      {label ? <p className="text-sm text-gray-600">{label}</p> : null}
    </div>
  );
}
