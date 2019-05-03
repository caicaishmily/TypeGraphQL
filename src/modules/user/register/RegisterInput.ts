import { InputType, Field } from "type-graphql"
import { Length, IsEmail } from "class-validator"

import { IsEmailAlreadyExist } from "./customValidations"
import { PasswordMixin } from "../../common/Password"

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string
}
