import { IUserRepository } from '../interfaces'
import { IUser } from 'commercial-campaigns-db/src/interface'
import { User } from 'commercial-campaigns-db/src/models'

export class UserRepositoryDatabase implements IUserRepository {
    async getById(where: object): Promise<IUser | null> {
        return await User.findOne({
            where: { ...where }
        })
    }

    async getAll(where: object, orderBy: [string, string][]): Promise<IUser[]> {
        return await User.findAll({
            raw: true,
            where: { ...where },
            order: orderBy
        })
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({
            where: { email }
        })
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        return await User.create(userData)
    }

    async update(id: number, userData: Partial<IUser>): Promise<IUser | null> {
        const user = await this.getById({ id })
        if (!user) return null

        await user.update(userData)
        return user
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.getById({ id })
        if (!user) return false

        await user.destroy()
        return true
    }
}