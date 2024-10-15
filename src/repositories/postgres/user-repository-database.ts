import { CreateUserDto, IUserRepository, UpdateUserDto } from '../interfaces'
import { IUser } from 'commercial-campaigns-db/src/interface'
import { User } from 'commercial-campaigns-db/src/models'

export class UserRepositoryDatabase implements IUserRepository {
    async getById(id: number): Promise<IUser | null> {
        return await User.findOne({ where: { id } })
    }

    async getAll(where: object, orderBy: any[]): Promise<IUser[]> {
        return await User.findAll({ raw: true, where: { ...where }, order: orderBy })
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ where: { email } })
    }

    async create(user: CreateUserDto): Promise<IUser> {
        return await User.create({ ...user })
    }

    async update(id: number, user: UpdateUserDto): Promise<IUser> {
        const [, [updateUser]] = await User.update(user,
            {
                where: { id },
                returning: true
            }
        )

        return updateUser
    }

    async delete(id: number): Promise<boolean> {
        return !!await User.destroy({ where: { id } })
    }
}