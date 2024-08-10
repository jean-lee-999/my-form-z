'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { schema } from "./validation"
import { submitFormAction } from "./actions"
import { useFormState } from "react-dom"
import { useRef } from "react"

type FormSchema = z.output<typeof schema>

export default function MyForm() {
    const [state, formAction] = useFormState(submitFormAction, {
        message:''
    })

    const form = useForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
          first: "",
          last: "",
          email: "",
          ...(state.fields ?? {}) // if fiels exist, override the default values
        },
    });

    const formRef = useRef<HTMLFormElement>(null)
      
    return (
        <div>
            {
                state.issues && (
                    <div className="text-red-500">
                        <ul>
                            {state.issues.map(issue => (<li key={issue}>{issue}</li>))}
                        </ul>
                    </div>
                )
            }
            <form 
                ref={formRef}
                action={formAction} 
                onSubmit={form.handleSubmit(() => {
                    formRef.current?.submit();
                })} 
                className="flex flex-col space-y-8"
            >
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