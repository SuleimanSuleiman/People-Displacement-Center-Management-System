import { type } from "os";
import { object, string, TypeOf, number } from 'zod';

const payload = {
    body: object({
        city: string({
            required_error: "City is required"
        }),
        location: string({
            required_error: "City is required"
        }),
        overflow: number({
            required_error: "overflow is required"
        }),
      active: string({
            required_error: "Active  is required"
        }),

    })
}

const params = {
    params: object({
        center_id: string({
            required_error: "CenterId is required"
        })
    })
}

export const createCenterSchema = object({
    ...payload
});

export const deleteCenterSchema = object({
    ...params,
    ...payload
})

export type createCenterInput = TypeOf<typeof createCenterSchema>
export type deleteCenterInput = TypeOf<typeof deleteCenterSchema>
