import { Query, Mutation, Arg, Subscription, PubSub, PubSubEngine, Root } from "type-graphql"

import { Girl } from "../../entity/Girl"

export class GirlsResolver {
  @Query(() => [Girl])
  async girls(): Promise<Girl[]> {
    return await Girl.find()
  }

  @Mutation(() => Girl, {nullable: true})
  async like(
    @Arg("id") id: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Girl | null> {
    const girl = await Girl.findOne({ where: {id} })

    if (!girl) { return null}

    girl.like = await girl.like + 1

    girl.save()

    await pubSub.publish("LIKE", {girl})

    return girl
  }

  @Subscription({ topics: "LIKE" })
  likeSubscription(@Root() girl: Girl): Girl {
    return girl
  }
}
