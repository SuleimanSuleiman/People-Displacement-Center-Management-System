import { TypeOf, boolean, object, string } from 'zod';


export const helperSchema = object({
    body: object({
        first_name: string({
            required_error: "First Name is required",
        }),
        last_name: string({
        required_error: "Last Name is required",
        }),
        email: string({
            required_error: "First Name is required",
        }).email("Not a valid email"),
        active: string({
            required_error: "active is required",
        }),
        centerId: string({
        required_error: "Center Id is required"
        })
    })
})

export type helperInput = TypeOf<typeof helperSchema>;