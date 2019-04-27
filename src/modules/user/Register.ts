import { Mutation, Arg, Query, UseMiddleware } from "type-graphql"
import bcrypt from "bcryptjs"

import { User } from "../../entity/User"
import { RegisterInput } from "./register/RegisterInput"
import { isAuth } from "../middleware/isAuth"
import { logger } from "../middleware/logger";
import { sendMail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuth, logger)
  async hello() {
    return "Hello world"
  }

  @Mutation(() => User)
  @UseMiddleware(logger)
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

    sendMail(email, await createConfirmationUrl(user.id))

    return user
  }
}
