export declare class Comment {
    id: number;
    parentId?: number;
    parent?: Comment;
    children?: Comment[];
    authorId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt: Date | null;
}
