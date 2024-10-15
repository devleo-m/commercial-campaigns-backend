import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = boolean

export class DeleteUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const userById = await this.userRepository.getById(id)

        if(!userById){
            throw new NotFoundError('User not found!')
        }

        const userDeletedSuccess = await this.userRepository.delete(id)

        return userDeletedSuccess
    }
}