import { number, object, string, TypeOf } from 'zod';


export const LeaveHelperSchema = object({
    params: object({
        first_name: string({
            required_error: "First Name is required",
        }),
        last_name: string({
        required_error: "Last Name is required",
        }),
        email: string({
            required_error: "First Name is required",
        }).email("Not a valid email"),
    })
})



export type LeaveHelperInput = TypeOf<typeof LeaveHelperSchema>;