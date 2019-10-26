import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { createConnection } from "typeorm"
import { createServer } from 'http'

import cors from "cors"
import { createSchema } from "./utils/createSchema"

import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

const main = async () => {
  await createConnection()

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    subscriptions: {
      path: "/subscriptions"
    },
    context: ({ req, res }: any) => ({ req, res })
  })

  const app = Express()

  app.use(cors())

  apolloServer.applyMiddleware({ app })

  app.listen(9527, () => {
    console.log("server started on http://localhost:9527/graphql")
  })

  const server = createServer(app)

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server,
      path: "/subscriptions",
    }
  );
}

main()
