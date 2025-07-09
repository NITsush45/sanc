import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
export declare class NotificationsService {
    private notes;
    constructor(notes: Repository<Notification>);
    notifyReply(recipientId: number, commentId: number): Promise<Notification>;
    list(recipientId: number): Promise<Notification[]>;
    toggleRec(id: number, recipientId: number, isRead: boolean): Promise<import("typeorm").UpdateResult>;
}
