import { Resolver, Query } from "type-graphql"


@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    // fake async in this example
    return "Hello world"
  }
}
