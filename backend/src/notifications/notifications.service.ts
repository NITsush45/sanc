import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private notes: Repository<Notification>) {}

  notifyReply(recipientId: number, commentId: number) {
    const n = this.notes.create({ recipientId, commentId });
    return this.notes.save(n);
  }

  list(recipientId: number) {
    return this.notes.find({ where: { recipientId }, order: { createdAt: 'DESC' } });
  }

  toggleRec(id: number, recipientId: number, isRead: boolean) {
    return this.notes.update({ id, recipientId }, { isRead });
  }
}
