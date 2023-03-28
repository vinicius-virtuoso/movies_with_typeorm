import { z } from 'zod'

export const movieCreateSchema = z.object({
  name: z.string().max(50).nonempty(),
  description: z.string().optional(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
})

export const movieUpdateSchema = z.object({
  name: z.string().max(50).nonempty().optional(),
  description: z.string().optional(),
  duration: z.number().positive().int().optional(),
  price: z.number().positive().int().optional(),
})
