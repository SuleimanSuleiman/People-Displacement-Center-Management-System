import { TypeOf, object, string } from 'zod';


export const refugeeScehma = object({
    body: object({
        first_name: string({
            required_error: "First Name is required",
        }),
        last_name: string({
        required_error: "Last Name is required",
        }),
        father_name: string({
            required_error: "First Name is required",
        }),
        mother_name: string({
        required_error: "Last Name is required",
        }),
        condtion: string({
            required_error:"condition of refugee required"
        }),
        city: string({
            required_error: "city is requried"
        }),
        vellage: string({
            required_error: "vellage is requried"
        }),
        centerId: string({
        required_error: "Center Id is required"
        })
    })
})

export type refugeeInput = TypeOf<typeof refugeeScehma>;