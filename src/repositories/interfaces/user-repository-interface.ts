import { IUser } from 'commercial-campaigns-db/out/interface'

export interface IUserRepository {
    create(userData: Partial<IUser>): Promise<IUser>
    getAll(where: object, orderBy: [string, string][]): Promise<IUser[]>
    getById(where: object): Promise<IUser | null>
    getByEmail(email: string): Promise<IUser | null>
    update(id: number, userData: Partial<IUser>): Promise<IUser | null>
    delete(id: number): Promise<boolean>
}