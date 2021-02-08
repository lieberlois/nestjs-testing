import { Injectable, Scope } from '@nestjs/common';
import { UserService } from './user.service';

// Babel Compiled => no default import
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export default class UserLoaderService {
  constructor(private readonly userService: UserService) {}

  public readonly batchUsers = new DataLoader(async (userIds: number[]) => {
    const users = await this.userService.findByIds(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((userId) => usersMap.get(userId));
  });
}
