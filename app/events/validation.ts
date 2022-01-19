import { z } from 'zod';

export const CreateEvent = z.object({
  date: z.date(),
  description: z.string().optional(),
  title: z.string(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});

export const UpdateEvent = CreateEvent.partial().extend({
  id: z.number(),
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
