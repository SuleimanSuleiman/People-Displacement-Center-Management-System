import { number, object, string, TypeOf } from 'zod';


export const NeedHelperSchema = object({
    params: object({
        num: string({
            required_error: "number of helper required",
        }),
        location: string({
            required_error: "location is required"
        })
    })
})

export type NeedHelperInput = TypeOf<typeof NeedHelperSchema>;