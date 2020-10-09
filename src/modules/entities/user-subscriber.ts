import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): Promise<any> | void {
    if (event.entity.password) {
      event.entity.password = bcrypt.hashSync(event.entity.password, 10);
    }
  }
}
