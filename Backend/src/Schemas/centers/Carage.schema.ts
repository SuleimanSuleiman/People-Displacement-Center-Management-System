import { object, string, TypeOf } from 'zod';

export const Caragechema = object({
    body: object({
        city: string({
            required_error: "City is required"
        }),
        location: string({
            required_error: "location is required"
        })
    })
})


export type CarageInput = TypeOf<typeof Caragechema>