import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import bcrypt from 'bcrypt'
import { Transaction } from 'sequelize'
import { sequelize as database  } from 'commercial-campaigns-db/out/database'

type Input = {
    name?: string,
    email?: string,
    password?: string
}

type Output = {
    id: number
}

export const createSequelizeTransaction = async () => {
    return await database.transaction()
}

export class UpdateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number, input: Input): Promise<Output> {
        const transaction: Transaction = await createSequelizeTransaction()
        try {
            const userById = await this.userRepository.getById(id)

            if(!userById){
                throw new NotFoundError('User not found!')
            }
    
            const { name, email, password} = input
    
            if (name && name.length < 3) {
                throw new NotFoundError('Name must be at least 3 characters long!')
            }
    
            if(email && email.length < 3){
                throw new NotFoundError('Email must be at least 3 characters long!')
            }
    
            if(password && password.length < 6){
                throw new NotFoundError('Password must be at least 6 characters long!')
            }
    
            const hashedPassword = password ? await bcrypt.hash(password, 10) : userById.password
    
            const userUpdate = await this.userRepository.update(id, {
                name,
                email,
                password: hashedPassword
            }, transaction)

            await transaction.commit()
    
            return {
                id: userUpdate.id,
            }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}