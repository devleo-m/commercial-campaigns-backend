export interface IAuthUser {
    id: number
    name: string
    email?: string
}

declare global {
    namespace Express {
        interface Request {
            user?: IAuthUser;
        }
    }
}