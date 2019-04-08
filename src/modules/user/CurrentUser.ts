import { Ctx, Query } from "type-graphql"

import { User } from "../../entity/User"
import { MyContext } from "src/types/MyContext"

export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }

    return User.findOne(ctx.req.session!.userId)
  }
}
