import { Omit } from "lodash";
import { date, number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    first_name: string({
      required_error: "First Name is required",
    }),
    last_name: string({
      required_error: "Last Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),

    role: string({
        required_error: "role is required"
    }),
    age: number({
        required_error: "A is required"
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),

    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    centerId: string({
      required_error: "Center Id is required"
    })
  })
    .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",  
    path: ["passwordConfirmation"],
    }),
  
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
