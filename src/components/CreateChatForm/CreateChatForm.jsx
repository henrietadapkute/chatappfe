import { useState } from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import sendRequest from '@/utilities/send-request'
import { useChat } from '@/context/ChatContext'

const formSchema = z.object({
  participants: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function CreateChatForm({}) {
  const { addChat } = useChat()
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     participants: "",
    },
  });

    const onSubmit = async () => {
        const username = form.getValues("participants");
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/search/user?username=${username}`)
        const user = response

        console.log('User found', user)
        if (user) {
          addChat({participants: user._id})
          form.reset()
        }
      }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField 
        control={form.control}
        name="participants"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Search for a user</FormLabel>
            <FormControl>
            <Input placeholder="username"
            {...field}
            />
            </FormControl>
            <FormDescription>
                Enter a username
            </FormDescription>
            <FormMessage>Add this later</FormMessage>
            </FormItem>
        )}
        />
        <Button type="submit">Create Chat</Button>
    </form>
    </Form>
  )
}