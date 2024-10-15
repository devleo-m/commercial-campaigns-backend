import supertest from 'supertest'
import { app } from '../src/app'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const request = supertest(app)

describe('Testes CRUD usuarios', () => {
    let token = ''

    beforeAll(async () => {
        const payload = {
            sub: 1,
            additionalUser: false,
            operatorId: 1
        }

        token = sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }) // Garantindo que JWT_SECRET é string
    })

    test('Deve criar um usuario', async () => {
        const createNewUser = {
            name: 'Teste',
            email: `jest_${Date.now()}@example.com`,
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .send(createNewUser)

        expect(responseCreate.status).toBe(201)
        expect(responseCreate.body.id).toBeDefined()
    })
})
