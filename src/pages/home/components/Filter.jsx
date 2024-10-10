import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { ArrowUpFromDotIcon } from "lucide-react";
import { ArrowDownToDotIcon } from "lucide-react";

const sortOptions = [
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "createdAt-asc", label: "Oldest" },
  { value: "createdAt-desc", label: "Newest" },
  { value: "content-asc", label: "Content (A-Z)" },
  { value: "content-desc", label: "Content (Z-A)" },
];

export const PostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "",
    },
  });

  function onSubmit(values) {
    const searchValue = values.search.trim();
    const sortValue = values.sort.trim();
    if (!searchValue) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchValue);
    }
    if (!sortValue) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", sortValue);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-3">
          <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
              <FormItem className="w-32">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sortOptions.map((option, idx) => {
                      const Icon =
                        idx % 2 === 1 ? ArrowDownToDotIcon : ArrowUpFromDotIcon;
                      return (
                        <SelectItem
                          value={option.value}
                          className="cursor-pointer"
                          key={idx}
                        >
                          <div className="flex items-center gap-1">
                            <Icon className="w-4 h-4" /> {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                    
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Write for search post..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Search</Button>
        </form>
      </Form>
    </div>
  );
};
