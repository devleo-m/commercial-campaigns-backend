import { IUserRepository } from '../../repositories/interfaces';

type Output = {
    lines: {
        id: number,
        name: string,
        email: string
    }[],
    total: number
};

export class GetAllUsersUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<Output> {
        try {
            const users = await this.userRepository.getAll({}, [])

            const returnResults: Output['lines'] = []

            for (const user of users) {
                returnResults.push({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            }

            return {
                lines: returnResults,
                total: returnResults.length
            };
        } catch (error) {
            throw error;
        }
    }
}
