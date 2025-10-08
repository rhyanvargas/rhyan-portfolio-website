import { portfolioConfig, type PortfolioConfig } from "@/config/portfolio"
import { portfolioSchema } from "@/schemas/portfolio"
import { z } from "zod"

export type { PortfolioConfig }

/**
 * Get the validated portfolio configuration
 * @returns Validated portfolio configuration
 * @throws {z.ZodError} If the configuration is invalid
 */
export function getPortfolioConfig(): PortfolioConfig {
  try {
    // Validate the configuration against the schema
    return portfolioSchema.parse(portfolioConfig)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Portfolio configuration validation failed:', error.errors)
      throw new Error(`Invalid portfolio configuration: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`)
    }
    throw error
  }
}

/**
 * Get the portfolio configuration without validation (for development/debugging)
 * @returns Raw portfolio configuration
 */
export function getPortfolioConfigUnsafe(): PortfolioConfig {
  return portfolioConfig
}

/**
 * Validate portfolio configuration and return validation result
 * @returns Validation result with success status and data or errors
 */
export function validatePortfolioConfig(): { success: true; data: PortfolioConfig } | { success: false; errors: z.ZodError } {
  const result = portfolioSchema.safeParse(portfolioConfig)

  if (result.success) {
    return { success: true, data: result.data }
  } else {
    return { success: false, errors: result.error }
  }
}
