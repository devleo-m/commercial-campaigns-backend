import { IUserRepository } from '../../repositories/interfaces'
import { IUser } from 'commercial-campaigns-db/src/interface'

type Output = {
    user: IUser
}

export class CreateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(userData: Partial<IUser>): Promise<Output> {
        const user = await this.userRepository.create(userData)
        return { user }
    }
}