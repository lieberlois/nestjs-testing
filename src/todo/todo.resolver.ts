import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import UserLoaderService from '../user/user-loader.service';
import { User } from '../user/user.entity';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    // private readonly userService: UserService,
    private readonly userLoaderService: UserLoaderService,
  ) {}

  @ResolveField('author', () => User)
  async author(@Parent() todo: Todo) {
    // N+1 Problem
    // return this.userService.findOne(todo.authorId)
    return this.userLoaderService.batchUsers.load(todo.authorId);
  }

  @Query(() => [Todo])
  todos() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true })
  todo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('text', { type: () => String }) text: string,
    @Args('authorId', { type: () => Int }) authorId: number,
  ) {
    return await this.todoService.create(text, authorId);
  }
}
