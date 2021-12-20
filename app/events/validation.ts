import { z } from 'zod';

export const UpdateEvent = z.object({
  id: z.number(),
  date: z.date(),
  description: z.string().optional(),
  title: z.string(),
  userId: z.number(),
  postId: z.number(),
});

export const CreateEvent = z.object({
  date: z.date(),
  description: z.string().optional(),
  title: z.string(),
  userId: z.number(),
  postId: z.number(),
});
