"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useCreateFeedback } from "@/lib/feedback/mutation-hooks"
import { toast } from "sonner"

const feedbackSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.enum(["feature", "bug", "improvement"], {
    required_error: "Please select a category",
  }),
})

type FeedbackFormValues = z.infer<typeof feedbackSchema>

interface FeedbackFormProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function FeedbackForm({ open, onOpenChange, trigger }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(open ?? false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const createFeedbackMutation = useCreateFeedback()

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
    },
  })

  const handleOpenChange = async (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)

    if (newOpen) {
      // Check authentication when dialog opens
      setIsAuthChecked(false)
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null
      setIsAuthenticated(!!user)
      setIsAuthChecked(true)
    } else {
      // Reset form when closing
      form.reset()
    }
  }

  const onSubmit = async (values: FeedbackFormValues) => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user ?? null

    if (!user) {
      toast.error("Please sign in to submit feedback")
      return
    }

    createFeedbackMutation.mutate(
      {
        title: values.title,
        description: values.description,
        category: values.category,
        author_id: user.id,
      },
      {
        onSuccess: () => {
          toast.success("Feedback submitted successfully!")
          form.reset()
          handleOpenChange(false)
        },
        onError: (error) => {
          toast.error(error.message || "Failed to submit feedback")
        },
      }
    )
  }

  const isSubmitting = createFeedbackMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            Share your ideas, report bugs, or suggest improvements for the platform.
          </DialogDescription>
        </DialogHeader>

        {!isAuthChecked ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !isAuthenticated ? (
          <div className="py-4 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You need to be signed in to submit feedback.
            </p>
            <Button asChild>
              <a href="/community/login">Sign In</a>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="A clear, descriptive title for your feedback"
                        maxLength={100}
                        error={!!form.formState.errors.title}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/100 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="improvement">Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type that best describes your feedback
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your feedback in detail. The more context you provide, the better..."
                        className="min-h-[120px]"
                        maxLength={1000}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/1000 characters (minimum 20)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
