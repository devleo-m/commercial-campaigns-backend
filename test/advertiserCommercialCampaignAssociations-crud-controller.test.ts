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
    })

    test('Deve criar uma associação de anunciante e campanha', async () => {
        const createNewCampaign = {
            campaignId: 9,
            commercialId: 9,
            startDate: "2025-01-01",
            endDate: "2025-05-05"
        }

        const response = await request
            .post('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)
            .send(createNewCampaign)

        expect(response.status).toBe(200)
    })

    test('Deve listar todas as associações de anunciante e campanha', async () => {
        const getAllCampaigns = await request
            .get('/advertiser-commercials-campaigns')
            .set('Authorization', `Bearer ${token}`)

        expect(getAllCampaigns.status).toBe(200)
    })

})
