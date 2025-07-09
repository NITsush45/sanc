import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CommentsService {
    private comments;
    private notifications;
    constructor(comments: Repository<Comment>, notifications: NotificationsService);
    create(authorId: number, content: string, parentId?: number): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    private mapChildren;
    edit(id: number, authorId: number, content: string): Promise<Comment>;
    delete(id: number, authorId: number): Promise<Comment>;
    restore(id: number, authorId: number): Promise<Comment>;
}
