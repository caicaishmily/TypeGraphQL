import { testConn } from "../../../test/testConn"
import { Connection } from "typeorm"
import { gCall } from "../../../test/gCall"

let conn: Connection
beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(data: $data)
      {
        id
        name
        email
      }
  }
`

describe("Register", () => {
  it("create user", async () => {
    console.log(await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          password: "shmily520",
          email: "davecqx@gmail.com",
          lastName: "yiqin",
          firstName: "zhang"
        }
      }
    }))
  })
})
