import { InputType, Field } from "type-graphql"

import { PasswordInput } from "../../common/Password"

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string
}
