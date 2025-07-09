import { NotificationsService } from './notifications.service';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        userId: number;
    };
}
export declare class NotificationsController {
    private ns;
    constructor(ns: NotificationsService);
    list(req: AuthenticatedRequest): Promise<import("./notification.entity").Notification[]>;
    toggle(req: AuthenticatedRequest, body: {
        id: number;
        isRead: boolean;
    }): Promise<import("typeorm").UpdateResult>;
}
export {};
