import { CreateUserDto, IUserRepository, UpdateUserDto } from '../interfaces'
import { IUser } from 'commercial-campaigns-db/out/interface'
import { User } from 'commercial-campaigns-db/out/models'
import { Transaction } from 'sequelize'

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

    async create(user: CreateUserDto, transaction?: Transaction): Promise<IUser> {
        const transactionOptions = transaction ? { transaction } : {}
        return await User.create({ ...user }, { ...transactionOptions })
    }

    async update(id: number, user: UpdateUserDto, transaction: Transaction): Promise<IUser> {
        const [, [updateUser]] = await User.update(user,
            {
                where: { id },
                returning: true,
                transaction
            }
        )

        return updateUser
    }

    async delete(id: number, transaction: Transaction): Promise<boolean> {
        return !!await User.destroy({ where: { id }, transaction })
    }
}