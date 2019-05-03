import { Resolver, Mutation, Ctx } from "type-graphql"
import { MyContext } from "../../types/MyContext"

@Resolver()

export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err)
          rej(false)
        }

        res(true)
      })
    )
  }
}
