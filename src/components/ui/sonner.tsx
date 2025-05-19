"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        className: "!rounded-2xl !border-gray-300",
        classNames: {
          default: "!bg-gray-200",
          title: '!font-semibold !text-neutral-800',
          description: '!text-neutral-700',
          success: '!text-green-500',
          error: '!text-red-500',
          warning: '!text-yellow-500',
          info: '!text-blue-500',
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
