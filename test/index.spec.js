import request from 'supertest'
import app from '../src/app'

describe('Get task', ()=>{
    test('should response with status', async() => { 
        const response = await request(app).get('/ping').send()
        expect(response.statusCode).toBe(200)
    })

    test('should response with an array', async()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array);
    })
})

describe('POST /task', ()=>{
    const newTask = {
        title:'TiTULO PRUEBA',
        description:'Description prueba'
    }
    describe('given title and description', ()=>{
        test('should response with statusCode 200',async()=>{
            const response = await request(app).post('/tasks').send(newTask);
            
            expect(response.statusCode).toBe(200)
        })
        test('Should ahve content-type/json in header',async()=>{
            const response = await request(app).post('/tasks').send(newTask);
            
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
    
        test('should response with task id', async()=>{
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        })
    })

    describe('when title and description is missing', ()=>{
        test('should response with statusCode 400', async()=>{
            const fields = [
                {},
                {title:'titlee'},
                {description:'Desss'}
            ]
            for(const body of fields){
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
})

