import { InputType, Field } from "type-graphql"

import { PasswordMixin } from "../../common/Password"

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string
}
