"use client"

import React from 'react'

interface LogoProps {
  className?: string
}


export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/images/logo.svg"
      alt="Vertex HSE (PVT.) LTD. - Reliable - Robust - Rigorous"
      className={className}
      role="img"
    />
  )
}
