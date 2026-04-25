import { z } from "zod"

const discussionSchema = z.object({
  title: z
    .string()
    .min(10, "Judul harus minimal 10 karakter")
    .max(100, "Judul harus kurang dari 100 karakter"),
  content: z
    .string()
    .min(20, "Konten harus minimal 20 karakter"),
  tags: z.array(z.string()).max(10, {
    message: "Maksimal 10 tag",
  }),
})

type DiscussionFormValues = z.infer<typeof discussionSchema>

export { discussionSchema, type DiscussionFormValues }
