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

const formSchema = z.object({
  participants: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function CreateChatForm({}) {
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     participants: "",
    },
  });

    const onSubmit = async () => {
    try {
        const username = form.getValues("participants");
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/search/user?username=${username}`)
        const user = response

        console.log('User found', user)
        if (user) {
            const chatResponse = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/create/chat`, 'POST', {
                participants: user._id
            })

            const chatData = chatResponse
            console.log('Chat created', chatData)
            form.reset()
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error(error);
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