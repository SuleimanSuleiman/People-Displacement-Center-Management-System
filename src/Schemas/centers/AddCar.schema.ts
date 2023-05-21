import { object, string, TypeOf, boolean,optional } from 'zod';

export const AddCarSchema = object({
    body: object({
        carId: string({
            required_error: "car id required",
        }).min(6, 'invalid car id').max(6, 'invalid car id'),

        typeCar: string({
            required_error: "type of car is required",
        }),
        desc: string({
            required_error:"desc is required"
        }),
        active: optional(boolean()),
    })
})


export type AddCarInput = TypeOf<typeof AddCarSchema>