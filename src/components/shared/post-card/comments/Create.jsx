import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { POSTS_COMMENT_QUERY_KEY } from "@/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostComment } from "@/services/posts";

const formSchema = z.object({
  content: z.string().min(1),
});

export const CommentCreate = ({ postId }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [POSTS_COMMENT_QUERY_KEY, postId],
      });
    },
  });

  const onSubmit = (values) => {
    const content = values.content.trim();
    mutate({ postId, content });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex items-center gap-1 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="mt-2"
                  disabled={isPending}
                  placeholder="Type here..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="!mt-0 px-2">
          <CheckIcon variant="ghost" />
        </Button>
      </form>
    </Form>
  );
};
