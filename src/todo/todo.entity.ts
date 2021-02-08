import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Todo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => Int)
  @Column()
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.todos)
  author: User;
}
