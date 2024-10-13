import { IUserRepository } from '../../repositories/interfaces'
import { IUser } from 'commercial-campaigns-db/out/interface'

type Output = {
    success: boolean
    user?: IUser | null
};

export class DeleteUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const user = await this.userRepository.getById({ id })
        const success = await this.userRepository.delete(id)
        return { success, user }
    }
}