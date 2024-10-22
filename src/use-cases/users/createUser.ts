import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import bcrypt from 'bcrypt'
import { Transaction } from 'sequelize'
import { sequelize as database  } from 'commercial-campaigns-db/out/database'

type Input = {
    name: string,
    email: string,
    password: string
}

type Output = {
    id: number
}

export const createSequelizeTransaction = async () => {
    return await database.transaction()
}

export class CreateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const transaction: Transaction = await createSequelizeTransaction()
        try {
            const { name, email, password } = input

            const emailExists = await this.userRepository.getByEmail(email)

            if (emailExists) {
                throw new NotFoundError('Email already exists!')
            }

            if (password.length < 6) {
                throw new NotFoundError('Password must be at least 6 characters long!')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            if (name.length < 3) {
                throw new NotFoundError('Name must be at least 3 characters long!')
            }

            const newUser = await this.userRepository.create({
                name,
                email,
                password: hashedPassword
            }, transaction)

            await transaction.commit()
            return {
                id: newUser.id
            }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}