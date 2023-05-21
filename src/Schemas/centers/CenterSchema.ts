import { type } from "os";
import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        city: string({
            required_error: "City is required"
        }),
        location: string({
            required_error: "City is required"
        })
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
