import { InputType, Field, ClassType } from "type-graphql"
import { MinLength } from "class-validator"

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass{
    @Field()
    @MinLength(6)
    password: string
  }
  return PasswordInput
}
