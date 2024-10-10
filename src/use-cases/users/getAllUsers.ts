import { IUserRepository } from '../../repositories/interfaces'

type Output = {
    users: {
        id: number
        name: string
    }[],
    total: number
}

export class GetAllUsersUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<Output> {
        const users = await this.userRepository.getAll({}, [])
        const returnResults = users.map(user => ({
            id: user.id,
            name: user.name
        }))

        return {
            users: returnResults,
            total: returnResults.length
        }
    }
}