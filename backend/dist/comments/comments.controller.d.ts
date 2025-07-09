import { CommentsService } from './comments.service';
import { Request as ExpressRequest } from 'express';
interface AuthRequest extends ExpressRequest {
    user: {
        userId: number;
    };
}
export declare class CommentsController {
    private cs;
    constructor(cs: CommentsService);
    create(req: AuthRequest, body: {
        content: string;
        parentId?: number;
    }): Promise<import("./comment.entity").Comment>;
    edit(req: AuthRequest, body: {
        id: number;
        content: string;
    }): Promise<import("./comment.entity").Comment>;
    delete(req: AuthRequest, body: {
        id: number;
    }): Promise<import("./comment.entity").Comment>;
    restore(req: AuthRequest, body: {
        id: number;
    }): Promise<import("./comment.entity").Comment>;
    list(): Promise<import("./comment.entity").Comment[]>;
}
export {};
