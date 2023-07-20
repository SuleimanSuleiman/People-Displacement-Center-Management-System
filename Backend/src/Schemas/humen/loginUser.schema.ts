import { object, string, TypeOf } from 'zod';
export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }),
        password: string({
            required_error: "password is required"
        })
    })
})

export type loginUserInput = TypeOf<typeof loginUserSchema>;