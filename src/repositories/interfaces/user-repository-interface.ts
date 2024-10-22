import { IUser } from 'commercial-campaigns-db/out/interface'
import { Transaction } from 'sequelize'

export interface CreateUserDto {
    name: string
    email: string
    password: string
}

export interface UpdateUserDto{
    name?: string
    email?: string
    password?: string
}

export interface IUserRepository {
    create(userData: CreateUserDto, transaction?: Transaction): Promise<IUser>
    getAll(where: object, orderBy: any[]): Promise<IUser[]>
    getById(id: number): Promise<IUser | null>
    getByEmail(email: string): Promise<IUser | null>
    update(id: number, userData: UpdateUserDto, transaction?: Transaction): Promise<IUser>
    delete(id: number, transaction?: Transaction): Promise<boolean>
}