import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { formatArgumentValidationError } from "type-graphql"
import { createConnection } from "typeorm"

import { redis } from "./redis"
import cors from "cors"
import connectRedis from "connect-redis"
import session from "express-session"
import { createSchema } from "./utils/createSchema";

const main = async () => {
  await createConnection()

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  })

  const app = Express()
  const RedisStore = connectRedis(session)

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  )

  app.use(session({
    store: new RedisStore({
      client: redis as any
    }),
    name: "qid",
    secret: "qwertyuiop",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  })
  )

  apolloServer.applyMiddleware({ app })

  app.listen(9527, () => {
    console.log("server started on http://localhost:9527/graphql")
  })
}

main()
