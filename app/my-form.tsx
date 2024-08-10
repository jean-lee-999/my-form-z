'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { schema } from "./validation"

type FormSchema = z.output<typeof schema>

export default function MyForm() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
          first: "",
          last: "",
          email: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data)
    }
      
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                <div>
                    <input type="text" placeholder="first" {...form.register('first')} />
                    <p>{form.formState.errors.first?.message}</p>
                </div>
                <div>
                    <input type="text" placeholder="last" {...form.register('last')} />
                    <p>{form.formState.errors.last?.message}</p>
                </div>
                <div>
                    <input type="email" placeholder="email" {...form.register('email')} />
                    <p>{form.formState.errors.email?.message}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}