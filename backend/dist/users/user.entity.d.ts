export declare class User {
    id: number;
    username: string;
    password: string;
    hash(): Promise<void>;
}
