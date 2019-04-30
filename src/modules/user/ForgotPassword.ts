import { Mutation, Arg } from "type-graphql"
import { User } from "src/entity/User"
import { v4 } from "uuid"
import { redis } from "src/redis";
import { sendMail } from "../utils/sendEmail";

export class ForgotPasswordResolver {

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email }})

    if(!user) {
      return true
    }
    const token = v4()

    await redis.set(token, user.id, "ex", 60 * 60 * 24)

    await sendMail(
      email,
      `http://localhost:3000/user/confirm/${token}`
    )

    return true

  }
}
