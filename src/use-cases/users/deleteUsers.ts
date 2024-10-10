import { IUserRepository } from '../../repositories/interfaces'

type Output = {
    success: boolean
}

export class DeleteUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const success = await this.userRepository.delete(id)
        return { success }
    }
}