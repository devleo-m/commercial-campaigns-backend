import { UserRepositoryDatabase } from '../../../repositories/postgres'
import { GetAllUsersUseCase } from '../getAllUsers'

export const makeGetAllUsers = () => {
    const userRepository = new UserRepositoryDatabase()
    return new GetAllUsersUseCase(userRepository)
}