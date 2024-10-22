import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = {
    id: number,
    name: string,
    email: string
}

export class GetByIdUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const userById = await this.userRepository.getById(id)

        if(!userById){
            throw new NotFoundError('User not found!')
        }

        return {
            id: userById.id,
            name: userById.name,
            email: userById.email
        }
    }
}