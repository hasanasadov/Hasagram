import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon } from 'lucide-react';
import { Trash2Icon } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { MODAL_TYPE } from '@/constants';
import { DropdownMenuSub } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/services/posts';
import { POST_QUERY_KEY } from '@/constants/query-keys';
import Spinner from '../spinner';

const PostCardActions = ({ post }) => {
  const { setIsOpen } = useDialog();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] });
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild className='outline-none'>
        <button className="hover:bg-gray-50 rounded-full p-1 text-gray-500 cursor-pointer">
          {
            isPending ?
              <Spinner />
              :
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="17" r="1" />
              </svg>
          }
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {
          setIsOpen(true, MODAL_TYPE.EDIT, post);
        }} className='flex items-center gap-3'>
          <Edit2Icon className='w-4 h-4' />
          <p>Edit</p>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center gap-3'>
        </DropdownMenuItem>
        <DropdownMenuSub >
          <DropdownMenuSubTrigger className='flex items-center gap-3 px-[0.375rem] cursor-pointer hover:outline-0'>
            <Trash2Icon className='w-4 h-4' />
            <p>Delete</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className='bg-white shadow-2xl'>
            <DropdownMenuLabel>Are you sure to delete this post?</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => mutate({ id: post.id })} className='hover:!bg-destructive hover:!text-white'>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              Cancel
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostCardActions;