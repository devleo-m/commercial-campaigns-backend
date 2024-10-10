import { UserRepositoryDatabase } from '../../../repositories/postgres'
import { UpdateUserUseCase } from '../updateUsers'

export const makeUpdateUser = () => {
    const userRepository = new UserRepositoryDatabase()
    return new UpdateUserUseCase(userRepository)
}