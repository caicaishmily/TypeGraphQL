import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity()
export class Girl extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  avatar: string

  @Field()
  @Column()
  age: number

  @Field()
  @Column()
  like: number

  @Field()
  @Column()
  dislike: number
}
