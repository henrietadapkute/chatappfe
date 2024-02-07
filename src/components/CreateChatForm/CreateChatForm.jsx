import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function CreateChatForm({onSuccessfulSubmit}) {
  const navigate = useNavigate()
  const { addChat } = useChat()
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     participants: "",
    },
  });

    const onSubmit = async () => {
        const usernames = form.getValues("participants").split(', ');
        try {
        const usersPromise = usernames.map(async (username) => await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/search/user?username=${username}`))
        const users = await Promise.all(usersPromise)
        // const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/search/user?username=${username}`)
        // const user = response

        // console.log('User found', user)
         if (users.every(user => user)) {
          const userIds = users.map(user => user._id);
          const response = await addChat({participants: userIds})
          form.reset()
          onSuccessfulSubmit()
          navigate(`chats/${response._id}`)
        }
      } catch {

      }
    }

  return (
    <Form className="self-start w-full" {...form}>
    <form className="self-start w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
        control={form.control}
        name="participants"
        render={({ field }) => (
            <FormItem className="p-2">
            <FormLabel>Search for a user</FormLabel>
            <FormControl>
            <Input className="w-4/5" placeholder="username"
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
        <Button className="my-4" type="submit">Create Chat</Button>
    </form>
    </Form>
  )
}