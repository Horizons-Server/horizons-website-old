import { z } from 'zod';

export const UpdateEvent = z.object({
  id: z.number(),
  date: z.date(),
  description: z.string().optional(),
  title: z.string(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});

export const CreateEvent = z.object({
  date: z.date(),
  description: z.string().optional(),
  title: z.string(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});

export const EventFormObject = z.object({
  day: z.date(),
  hours: z.number().min(0).max(23),
  minutes: z.number().min(0).max(59),
  title: z.string(),
  description: z.string().optional(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});
