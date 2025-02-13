"use client"

import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";

function Provider({children}) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "default_url";
    const convex = new ConvexReactClient(convexUrl);
  return (
    <div>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </div>
  )
}

export default Provider
