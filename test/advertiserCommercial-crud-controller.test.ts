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
    let advertiserCommercialId: number

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

    test('Deve criar um anunciante', async () => {
        const createNewAdvertiser = {
            name: "Anuncio comercial - zzz",
            color: "blue",
            userId: 2
        }

        const response = await request
            .post('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewAdvertiser);

        expect(response.status).toBe(201);

        advertiserCommercialId = response.body.data.id
        console.log(`Anunciante criado: ${advertiserCommercialId}`)
    });

    test('Deve retornar um erro ao tentar criar um anunciante sem token', async () => {
        const createNewAdvertiser = {
            name: "Anuncio comercial - zzz",
            color: "blue",
            userId: 2
        }

        const response = await request
            .post('/advertiser-commercials')
            .send(createNewAdvertiser);

        expect(response.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar criar um anunciante sem nome', async () => {
        const createNewAdvertiser = {
            color: "blue",
            userId: 2
        }

        const response = await request
            .post('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewAdvertiser);

        expect(response.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar criar um anunciante sem userId', async () => {
        const createNewAdvertiser = {
            name: "Anuncio comercial - zzz",
            color: "blue",
        }

        const response = await request
            .post('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewAdvertiser);

        expect(response.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar criar um anunciante sem cor', async () => {
        const createNewAdvertiser = {
            name: "Anuncio comercial - zzz",
            userId: 2
        }

        const response = await request
            .post('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewAdvertiser);

        expect(response.status).toBe(500);
    });

    test('Deve listar todos os anunciantes', async () => {
        const getAllUsers = await request
            .get('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)

        expect(getAllUsers.status).toBe(200);
    });

    test('Deve retornar um erro ao tentar retornar todos os anunciantes sem token', async () => {
        const getAllUsers = await request
            .get('/advertiser-commercials')

        expect(getAllUsers.status).toBe(500);
    });

    test('Deve retornar um anunciante por id', async () => {
        const getUserById = await request
            .get(`/advertiser-commercials/${advertiserCommercialId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(getUserById.status).toBe(200);
    });

    test('Deve retornar um erro ao tentar retornar um anunciante inexistente com id longo', async () => {
        const getUserById = await request
            .get(`/advertiser-commercials/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(getUserById.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar retornar um anunciante inexistente com id negativo', async () => {
        const getUserById = await request
            .get(`/advertiser-commercials/-1`)
            .set('Authorization', `Bearer ${token}`)

        expect(getUserById.status).toBe(500);
    });

    test('Deve retornar um erro ao tentar retornar um anunciante sem token', async () => {
        const getUserById = await request
            .get(`/advertiser-commercials/${advertiserCommercialId}`)

        expect(getUserById.status).toBe(500);
    });

    test('Deve atualizar um anunciante', async () => {
        const updateAdvertiser = {
            name: "Anuncio comercial - zzz2",
        }

        const responseUpdate = await request
            .patch(`/advertiser-commercials/${advertiserCommercialId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateAdvertiser);

        expect(responseUpdate.status).toBe(200);
    })

    test('Deve retornar um erro ao tentar atualizar um anunciante inexistente', async () => {
        const updateAdvertiser = {
            name: "Anuncio comercial - zzz2",
        }

        const responseUpdate = await request
            .patch(`/advertiser-commercials/99999999`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateAdvertiser);

        expect(responseUpdate.status).toBe(500);
    })

    test('Deve retornar um erro ao tentar atualizar um anunciante sem token', async () => {
        const updateAdvertiser = {
            name: "Anuncio comercial - zzz2",
        }

        const responseUpdate = await request
            .patch(`/advertiser-commercials/${advertiserCommercialId}`)
            .send(updateAdvertiser);

        expect(responseUpdate.status).toBe(500);
    })

    test('Deve retornar um erro ao tentar atualizar um anunciante com nome vazio(menos que 3 caracteres)', async () => {
        const updateAdvertiser = {
            name: 'Te'
        };

        const responseUpdate = await request
            .patch(`/advertiser-commercials/${advertiserCommercialId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateAdvertiser);

        expect(responseUpdate.status).toBe(500);
    })

    test('Deve retornar um erro ao tentar atualizar um anunciante com cor com menos que 3 caracteres', async () => {
        const updateAdvertiser = {
            color: 'te'
        };

        const responseUpdate = await request
            .patch(`/advertiser-commercials/${advertiserCommercialId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateAdvertiser);

        expect(responseUpdate.status).toBe(500);
    })

    test('Deve deletar um anunciante', async () => {
        const responseDelete = await request
            .delete(`/advertiser-commercials/${advertiserCommercialId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toBe(204)
    })

    test('Deve retornar um erro ao tentar deletar um anunciante inexistente', async () => {
        const responseDelete = await request
            .delete(`/advertiser-commercials/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toBe(500);
    })

    test('Deve retornar um erro ao tentar deletar um anunciante sem token', async () => {
        const responseDelete = await request
            .delete(`/advertiser-commercials/${advertiserCommercialId}`)

        expect(responseDelete.status).toBe(500);
    })
})