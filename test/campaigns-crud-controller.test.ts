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
    let campaignId: number

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

    test('Deve criar uma campanha', async () => {
        const createNewCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        }

        const responseCreate = await request
            .post('/campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(201)
        console.log(responseCreate.body)
        campaignId = responseCreate.body.data.id;
        expect(campaignId).toBeDefined()
    })

    test('Deve retornar um erro ao tentar criar uma campanha sem nome', async () => {
        const createNewCampaign = {
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        }

        const responseCreate = await request
            .post('/campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma campanha sem userId', async () => {
        const createNewCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
        }

        const responseCreate = await request
            .post('/campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma campanha com userId inexistente', async () => {
        const createNewCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 999
        }

        const responseCreate = await request
            .post('/campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma campanha com endDate menor que startDate', async () => {
        const createNewCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-05-05T00:00:00.000Z",
            endDate: "2025-01-01T00:00:00.000Z",
            userId: 2
        }

        const responseCreate = await request
            .post('/campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma campanha sem token', async () => {
        const createNewCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        }

        const responseCreate = await request
            .post('/campaigns')
            .send(createNewCampaign)

        expect(responseCreate.status).toBe(500)
    })

    test('Deve listar todas as campanhas', async () => {
        const getAllCampaigns = await request
            .get('/campaigns')
            .set('Authorization', `Bearer ${token}`)

        expect(getAllCampaigns.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar retornar todas as campanhas sem token', async () => {
        const getAllCampaigns = await request
            .get('/campaigns')

        expect(getAllCampaigns.status).toBe(500)
    })

    test('Deve retornar uma campanha', async () => {
        const getCampaignById = await request
            .get(`/campaigns/${campaignId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar retornar uma campanha inexistente com id longo', async () => {
        const getCampaignById = await request
            .get('/campaigns/99999999')
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar retornar uma campanha inexistente com id negativo', async () => {
        const getCampaignById = await request
            .get('/campaigns/-1')
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(500)
    })

    test('Deve atualizar uma campanha', async () => {
        const updateCampaign = {
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        }

        const responseUpdate = await request
            .patch(`/campaigns/${campaignId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateCampaign)

        expect(responseUpdate.status).toBe(200)
    })

    test('Deve retornar erro ao atualizar campanha sem nome', async () => {
        const updateCampaign = {
            name: ""     
        }

        const responseUpdate = await request
            .patch(`/campaigns/5`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateCampaign)

        expect(responseUpdate.status).toBe(500)
    })

    test('Deve retornar erro ao atualizar campanha sem userId', async () => {
        const updateCampaign = {
            userId: ""     
        }

        const responseUpdate = await request
            .patch(`/campaigns/5`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateCampaign)

        expect(responseUpdate.status).toBe(500)
    })

    test('Deve deletar uma campanha', async () => {
        const responseDelete = await request
            .delete(`/campaigns/${campaignId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toBe(204)
    })

    test('Deve retornar um erro ao tentar deletar uma campanha inexistente', async () => {
        const responseDelete = await request
            .delete(`/campaigns/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(responseDelete.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar deletar uma campanha sem token', async () => {
        const responseDelete = await request
            .delete(`/campaigns/${campaignId}`)

        expect(responseDelete.status).toBe(500)
    })
})