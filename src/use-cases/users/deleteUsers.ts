import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import { Transaction } from 'sequelize'
import { sequelize as database  } from 'commercial-campaigns-db/out/database'

type Output = boolean

export const createSequelizeTransaction = async () => {
    return await database.transaction()
}

export class DeleteUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const transaction: Transaction = await createSequelizeTransaction()
        try {
            const userById = await this.userRepository.getById(id)

            if(!userById){
                throw new NotFoundError('User not found!')
            }
    
            const userDeletedSuccess = await this.userRepository.delete(id, transaction)
            
            await transaction.commit()

            return userDeletedSuccess
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}