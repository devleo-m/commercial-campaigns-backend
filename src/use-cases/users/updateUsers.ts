import { IUserRepository } from '../../repositories/interfaces'
import { IUser } from 'commercial-campaigns-db/src/interface'

type Output = {
    user: IUser | null
}

export class UpdateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number, userData: Partial<IUser>): Promise<Output> {
        const user = await this.userRepository.update(id, userData)
        return { user }
    }
}