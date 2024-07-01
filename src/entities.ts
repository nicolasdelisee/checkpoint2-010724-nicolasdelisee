import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Country {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  code: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  continentCode: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;
}

@InputType()
export class AddCountryInput {
  @Field()
  code: string;

  @Field()
  continentCode: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}
