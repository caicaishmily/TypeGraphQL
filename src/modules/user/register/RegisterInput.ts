import { InputType, Field } from "type-graphql"

// import { MaxLength, Length } from "class-validator"

@InputType()
export class RegisterInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}
