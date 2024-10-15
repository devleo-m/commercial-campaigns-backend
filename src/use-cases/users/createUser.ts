import { IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import bcrypt from 'bcrypt'

type Input = {
    name: string,
    email: string,
    password: string
}

type Output = {
    id: number,
    name: string,
    email: string
}

export class CreateUserUseCase {
    constructor(
        readonly userRepository: IUserRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const { name, email, password } = input

        const emailExists = await this.userRepository.getByEmail(email)

        if (emailExists) {
            throw new NotFoundError('Email already exists!')
        }

        if (password.length < 6) {
            throw new NotFoundError('Password must be at least 6 characters long!')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (name.length < 3) {
            throw new NotFoundError('Name must be at least 3 characters long!')
        }

        const newUser = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    }
}