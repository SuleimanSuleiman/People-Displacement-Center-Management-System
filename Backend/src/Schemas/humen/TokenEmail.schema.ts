import { object, string, TypeOf } from "zod";

export const TokenEmailSchema = object({
    params: object({
        humen_id: string({
            required_error: "humen id is required",
        }),
        token: string({
            required_error: "token is required",
        })
    })
    
});

export type TokenEmailInput= TypeOf<typeof TokenEmailSchema>
