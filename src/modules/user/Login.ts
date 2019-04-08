import { Mutation, Arg, Ctx } from "type-graphql"
import bcrypt from "bcryptjs"

import { User } from "../../entity/User"
import { MyContext } from "src/types/MyContext"

export class LoginResolver {

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })

    if (!user) { return null }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) { return null }
    ctx.req.session!.userId = user.id
    return user
  }
}
