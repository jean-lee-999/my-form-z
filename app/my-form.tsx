'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { schema } from "./formSchema"

export default function MyForm() {
    const form = useForm<z.output<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          first: "",
          last: "",
          email: "",
        },
    });
      
    return (
        <div>
            <form className="space-y-8">
                <input type="text" placeholder="first" {...form.register('first')} />
                <input type="text" placeholder="last" {...form.register('last')} />
                <input type="email" placeholder="email" {...form.register('email')} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}