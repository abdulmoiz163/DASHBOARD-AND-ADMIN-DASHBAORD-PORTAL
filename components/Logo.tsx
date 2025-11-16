"use client"

import React from 'react'

interface LogoProps {
  className?: string
}

// Simple vector version of the Vertex HSE logo using shapes and text.
// Colors inherit from CSS via currentColor so you can control it with text classes.
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 100"
      role="img"
      aria-label="Vertex HSE"
      className={className}
    >
      <title>Vertex HSE</title>
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        {/* Checkmark */}
        <path d="M12 52 L32 72 L62 28" />
      </g>
      {/* Brand text */}
      <g fill="currentColor">
        <text x="72" y="54" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="36">VERTEX</text>
        <text x="72" y="84" fontFamily="Inter, Arial, sans-serif" fontWeight="600" fontSize="16">HSE (PVT.) LTD.</text>
      </g>
      {/* Simple decorative leaf to the right */}
      <g fill="currentColor">
        <path d="M310 58 C320 48, 330 48, 334 58 C330 66, 320 66, 310 58 Z" />
        <rect x="307" y="58" width="3" height="14" rx="1.5" />
      </g>
    </svg>
  )
}