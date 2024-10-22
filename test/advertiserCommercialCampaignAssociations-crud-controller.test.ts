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
    let advertiserCommercialAssociationId: number
    let campaignId;
    let commercialId;

    beforeAll(async () => {
        userRepository = new UserRepositoryDatabase();
        
        const payload = {
            sub: 1,
            additionalUser: false,
            operatorId: 1
        };

        token = sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        const campaignResponse = await request
        .post('/campaigns')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        });

        campaignId = campaignResponse.body.data.id;

        const commercialResponse = await request
            .post('/advertiser-commercials')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Anuncio comercial - zzz",
                color: "blue",
                userId: 2
            });

        commercialId = commercialResponse.body.data.id;
    });

    afterEach(async () => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    afterAll(async () => {
        await request.delete(`/campaigns/${campaignId}`).set('Authorization', `Bearer ${token}`);
        await request.delete(`/advertiser-commercials/${commercialId}`).set('Authorization', `Bearer ${token}`);
    });

    test('Deve criar uma associação de anunciante e campanha', async () => {

        const campaignResponse = await request.post('/campaigns').set('Authorization', `Bearer ${token}`).send({
            name: "Fulano de tal2",
            startDate: "2025-01-01T00:00:00.000Z",
            endDate: "2025-05-05T00:00:00.000Z",
            userId: 2
        });
        const commercialResponse = await request.post('/advertiser-commercials').set('Authorization', `Bearer ${token}`).send({
            name: "Anuncio comercial - zzz",
            color: "blue",
            userId: 2
        });
    
        const createNewCampaign = {
            campaignId: campaignResponse.body.data.id,
            commercialId: commercialResponse.body.data.id,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(201)

        advertiserCommercialAssociationId = response.body.data.id
        console.log(`Associacao criada: ${advertiserCommercialAssociationId}`)
    })

    test('Deve retornar um erro ao tentar criar uma associação de anunciante e campanha com endDate menor que startDate', async () => {
        const createNewCampaign = {
            campaignId: 7,
            commercialId: 9,
            startDate: "2025-08-01",
            endDate: "2025-07-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma associação de anunciante e campanha com campaignId inexistente', async () => {
        const createNewCampaign = {
            campaignId: 999,
            commercialId: 9,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma associação de anunciante e campanha com commercialId inexistente', async () => {
        const createNewCampaign = {
            campaignId: 7,
            commercialId: 999,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma associação de anunciante e campanha sem token', async () => {
        const createNewCampaign = {
            campaignId: 7,
            commercialId: 9,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar criar uma associação de anunciante e campanha duplicada', async () => {
        const createNewCampaign = {
            campaignId: 7,
            commercialId: 9,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar erro ao tentar criar associacao com token invalido', async () => {
        const createNewCampaign = {
            campaignId: 7,
            commercialId: 9,
            startDate: "2025-07-01",
            endDate: "2025-08-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer 123456`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve listar todas as associações de anunciante e campanha', async () => {
        const getAllCampaigns = await request
            .get('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)

        expect(getAllCampaigns.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar retornar todas as associações de anunciante e campanha sem token', async () => {
        const getAllCampaigns = await request
            .get('/advertiser-commercials-campaigns')

        expect(getAllCampaigns.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar retornar todas as associações de anunciante e campanha com token invalido', async () => {
        const getAllCampaigns = await request
            .get('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer 123456`)

        expect(getAllCampaigns.status).toBe(500)
    })

    test('Deve listar uma associacao por id', async () => {
        const getCampaignById = await request
            .get(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar listar uma associacao por id sem token', async () => {
        const getCampaignById = await request
            .get(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)

        expect(getCampaignById.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar retornar uma associacao por id inexistente', async () => {
        const getCampaignById = await request
            .get(`/advertiser-commercials-campaigns/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar retornar uma associacao por id negativo', async () => {
        const getCampaignById = await request
            .get(`/advertiser-commercials-campaigns/-1`)
            .set('Authorization', `Bearer ${token}`)

        expect(getCampaignById.status).toBe(500)
    })

    test('Deve atualizar uma associacao', async () => { //preciso ajudar esse bug ao atualizar
        const updateCampaign = {
            startDate: "2026-07-01",
            endDate: "2026-08-01"
        }

        const response = await request
            .patch(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateCampaign)

        expect(response.status).toBe(200)
    })

    test('Deve retornar um erro ao tentar atualizar uma associacao sem token', async () => {
        const updateCampaign = {
            startDate: "2026-07-01",
            endDate: "2026-08-01"
        }

        const response = await request
            .patch(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .send(updateCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar atualizar uma associacao com token invalido', async () => {
        const updateCampaign = {
            startDate: "2026-07-01",
            endDate: "2026-08-01"
        }

        const response = await request
            .patch(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .set('Authorization', `Bearer 123456`)
            .send(updateCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar atualizar uma associacao inexistente', async () => {
        const updateCampaign = {
            startDate: "2026-07-01",
            endDate: "2026-08-01"
        }

        const response = await request
            .patch(`/advertiser-commercials-campaigns/99999999`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve retornar erro ao adicionar uma associacao com endDate menor que startDate', async () => {
        const createNewCampaign = {
            startDate: "2026-07-01",
            endDate: "2026-06-01"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(500)
    })

    test('Deve deletar uma associacao', async () => {
        const response = await request
            .delete(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)
    })

    test('Deve retornar um erro ao tentar deletar uma associacao inexistente', async () => {
        const response = await request
            .delete(`/advertiser-commercials-campaigns/99999999`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar deletar uma associacao sem token', async () => {
        const response = await request
            .delete(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)

        expect(response.status).toBe(500)
    })

    test('Deve retornar um erro ao tentar deletar uma associacao com token invalido', async () => {
        const response = await request
            .delete(`/advertiser-commercials-campaigns/${advertiserCommercialAssociationId}`)
            .set('Authorization', `Bearer 123456`)

        expect(response.status).toBe(500)
    })
})
