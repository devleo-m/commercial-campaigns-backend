import { IUserRepository } from '../../repositories/interfaces'
import { IUser } from 'commercial-campaigns-db/out/interface'

type Output = {
    user: IUser | null
}

export class GetByIdUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const user = await this.userRepository.getById({ id })
        return { user }
    }
}