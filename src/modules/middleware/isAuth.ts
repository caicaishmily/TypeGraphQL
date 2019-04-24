import { MiddlewareFn } from "type-graphql"
import { MyContext } from "src/types/MyContext"

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if(!context.req.session!.userId) {
    throw new Error("No authenticatied")
  }

  return next()
}
