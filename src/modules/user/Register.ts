import { Mutation, Arg, Query, UseMiddleware } from "type-graphql"
import bcrypt from "bcryptjs"

import { User } from "../../entity/User"
import { RegisterInput } from "./register/RegisterInput"
import { isAuth } from "../middleware/isAuth"

export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async hello() {
    return "Hello world"
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword
    }).save()

    return user
  }
}
