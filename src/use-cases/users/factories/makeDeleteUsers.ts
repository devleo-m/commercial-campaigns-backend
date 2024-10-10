import { UserRepositoryDatabase } from '../../../repositories/postgres'
import { DeleteUserUseCase } from '../deleteUsers'

export const makeDeleteUser = () => {
    const userRepository = new UserRepositoryDatabase()
    return new DeleteUserUseCase(userRepository)
}