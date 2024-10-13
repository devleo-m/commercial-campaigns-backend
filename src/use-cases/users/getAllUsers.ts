import { IUserRepository } from '../../repositories/interfaces'
import { IUser } from 'commercial-campaigns-db/out/interface'

type Output = {
    users: IUser[]
    total: number
};

export class GetAllUsersUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<Output> {
        const users = await this.userRepository.getAll({}, [])
        return {
            users,
            total: users.length
        }
    }
}