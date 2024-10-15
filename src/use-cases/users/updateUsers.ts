import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import bcrypt from 'bcrypt'

type Input = {
    name?: string,
    email?: string,
    password?: string
}

type Output = {
    id: number,
    name: string,
    email: string
}

export class UpdateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(id: number, input: Input): Promise<Output> {
        const userById = await this.userRepository.getById(id)

        if(!userById){
            throw new NotFoundError('User not found!')
        }

        const { name, email, password} = input

        if (name && name.length < 3) {
            throw new NotFoundError('Name must be at least 3 characters long!')
        }

        if(email && email.length < 3){
            throw new NotFoundError('Email must be at least 3 characters long!')
        }

        if(password && password.length < 6){
            throw new NotFoundError('Password must be at least 6 characters long!')
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : userById.password

        const userUpdate = await this.userRepository.update(id, {
            name,
            email,
            password: hashedPassword
        })

        return {
            id: userUpdate.id,
            name: userUpdate.name,
            email: userUpdate.email
        }
    }
}