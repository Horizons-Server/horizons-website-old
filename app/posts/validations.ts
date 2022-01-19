import { z } from 'zod';

export const CreatePost = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().url().optional(),
});

export const UpdatePost = CreatePost.partial().extend({
  id: z.number(),
});
