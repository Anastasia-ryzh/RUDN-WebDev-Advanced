import { describe, expect, it } from 'vitest';
import { app } from '../app.ts';
import request from 'supertest';
import { title } from 'node:process';

describe("/cards", () => {
    it('GET /cards', async() => {
        const res = await request(app).get('/cards');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);

        for (const card of res.body){
            expect(card.id).toBeDefined();
            expect(card.title).toBeDefined();
            expect(card.isDone).toBeDefined();
            expect(card.isUrgent).toBeDefined();
        }
    });

    it("POST /cards", async () => {
        const res = await request(app)
        .post('/cards')
        .send({title: 'card'});

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            id: '2',
            title: 'card',
            isDone: false,
            isUrgent: false
        })
    })
});