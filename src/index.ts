import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import "reflect-metadata"
import { buildSchema, Resolver, Query } from "type-graphql"

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    // fake async in this example
    return "Hello world"
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  })

  const apolloServer = new ApolloServer({ schema })

  const app = Express()

  apolloServer.applyMiddleware({ app })

  app.listen(9527, () => {
    console.log("server started on http://localhost:9527")
  })
}

main()
