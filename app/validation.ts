import { z } from "zod";


// client side validation
export const schema = z.object({
  first: z
    .string()
    .min(1, { message: "First name is required." })
    .max(10, { message: 'first가 10자 이상을 초과할 수 없습니다.' }),
  last: z
    .string()
    .min(1, { message: "Last name is required."})
    .max(5, { message: 'last가 5자 이상을 초과할 수 없습니다.' }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});