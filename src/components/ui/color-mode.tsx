"use client"

import { ThemeProvider, type ThemeProviderProps } from "next-themes"

export type ColorModeProviderProps = ThemeProviderProps

// Official Chakra snippet scoped to the site's light-only mode.
export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider {...props} attribute="class" disableTransitionOnChange
      defaultTheme="light" forcedTheme="light" enableSystem={false} />
  )
}
