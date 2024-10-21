import supertest from 'supertest';
import { app } from '../src/app';
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserRepositoryDatabase } from '../src/repositories/postgres'

dotenv.config();

const request = supertest(app);

describe('Testes CRUD usuarios', () => {
    let token = '';
    let userRepository;
    let userJestId: number;
    let userJestEmail: string;

    beforeAll(async () => {
        userRepository = new UserRepositoryDatabase();
        
        const payload = {
            sub: 1,
            additionalUser: false,
            operatorId: 1
        };

        token = sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    });

    afterEach(async () => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test('Deve criar um usuario', async () => {
        const createNewUser = {
            name: 'Teste',
            email: `jest_${Date.now()}@example.com`,
            password: '123456'
        };

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(201)
        userJestId = responseCreate.body.data.id
        userJestEmail = responseCreate.body.data.email

        console.log('Response Create:', userJestId)
    });

    test('Deve retornar um erro ao tentar criar um usuario com email ja existente', async () => {
        const createNewUser = {
            name: 'Teste',
            email: userJestEmail,
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar um usuario sem email', async () => {
        const createNewUser = {
            name: 'Teste',
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar um usuario com email invalido', async () => {
        const createNewUser = {
            name: 'Teste',
            email: 'teste',
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })


    test('Deve retornar um erro ao tentar criar um usuario sem nome', async () => {
        const createNewUser = {
            email: `jest_${Date.now()}@example.com`,
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar um usuario sem senha', async () => {
        const createNewUser = {
            name: 'Teste',
            email: `jest_${Date.now()}@example.com`
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('deve retornar erro ao tentar criar um usuario com senha com menos que 6 caracteres', async () => {
        const createNewUser = {
            name: 'Teste',
            email: `jest_${Date.now()}@example.com`,
            password: '12345'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('deve retornar erro ao tentar criar um usuario com nome com menos que 3 caracteres', async () => {
        const createNewUser = {
            name: 'Te',
            email: `jest_${Date.now()}@example.com`,
            password: '123456'
        }

        const responseCreate = await request
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewUser)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar todos os usuarios', async () => {
        const getAllUsers = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        expect(getAllUsers.status).toBe(200)
    });

    test('Deve retornar um erro ao tentar retornar um usuario inexistente com id longo', async () => {
        const getUserById = await request
            .get(`/users/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(getUserById.status).toBe(500)
    });

    test('Deve retornar um usuario', async () => {
        const getUserById = await request
            .get(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(getUserById.status).toBe(200);
    });

    test('Deve retornar um erro ao tentar retornar um usuario sem token', async () => {
        const getUserById = await request
            .get(`/users/${userJestId}`)

        expect(getUserById.status).toBe(500);
    });

    test('Deve atualizar um usuario', async () => {
        const updateUser = {
            name: 'Teste Jest'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        console.log('Response Update:', responseUpdate.body)

        expect(responseUpdate.status).toBe(200);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario inexistente', async () => {
        const updateUser = {
            name: 'Teste Jest'
        };

        const responseUpdate = await request
            .patch(`/users/99999999`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario sem token', async () => {
        const updateUser = {
            name: 'Teste Jest'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario com nome vazio(menos que 3 caracteres)', async () => {
        const updateUser = {
            name: ''
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario com senha com menos que 6 caracteres', async () => {
        const updateUser = {
            password: '12345'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario com nome com menos que 3 caracteres', async () => {
        const updateUser = {
            name: 'Te'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario com email invalido', async () => {
        const updateUser = {
            email: 'teste'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar atualizar um usuario sem token', async () => {
        const updateUser = {
            name: 'Teste Jest'
        };

        const responseUpdate = await request
            .patch(`/users/${userJestId}`)
            .send(updateUser);

        expect(responseUpdate.status).toBe(500);
    });

    test('Deve deletar um usuario', async () => {
        const responseDelete = await request
            .delete(`/users/${userJestId}`)
            .set('Authorization', `Bearer ${token}`)

        console.log('Response Delete:', responseDelete.body)

        expect(responseDelete.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar deletar um usuario inexistente', async () => {
        const responseDelete = await request
            .delete(`/users/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar deletar um usuario com token invalido', async () => {
        const responseDelete = await request
            .delete(`/users/${userJestId}`)
            .set('Authorization', `Bearer 123456`)

        expect(responseDelete.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar deletar um usuario sem token', async () => {
        const responseDelete = await request
            .delete(`/users/${userJestId}`)

        expect(responseDelete.status).toBe(500)
    })
})