import { z } from 'zod';

export const CreatePost = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().url().optional(),
});

export const UpdatePost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string().url().optional(),
});
