import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app";

describe <any>("URL API",() =>{
    describe("POST Urls",()=>{
        it("should create a short code for URL.",async() =>{
            const response = await request(app)
                .post("/urls")
                .send({
                originalUrl: "https://google.com",
            });

            console.log("Status:", response.status);
            console.log("Body:", response.body);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);

        });

        it("should reject missing originalUrl", async () => {

            const response = await request(app)
            .post("/urls")
            .send({});

            expect(response.status).toBe(400);

        });

        it("should reject invalid URL", async () => {

            const response = await request(app)
            .post("/urls")
            .send({
            originalUrl: "abcd"
            });

            expect(response.status).toBe(400);

        });
    });
    describe("GET /urls/:shortCode", () => {

        it("should redirect to original URL", async () => {

            // First create one
            const createResponse = await request(app)
                .post("/urls")
                .send({
                    originalUrl: "https://google.com"
                });

            const shortCode =
                createResponse.body.data.shortCode;

            const response = await request(app)
                .get(`/urls/${shortCode}`);

            expect(response.status).toBe(302);

        });

        it("should return 404 for invalid shortCode", async () => {
            const response = await request(app)
            .get("/urls/abcdef");
            expect(response.status).toBe(404);
        });
    });

    describe("GET /urls/:shortCode/stats", () => {

        it("should return stats", async () => {

            const createResponse = await request(app)
                .post("/urls")
                .send({
                    originalUrl: "https://google.com"
                });

            const shortCode =
                createResponse.body.data.shortCode;

            const response = await request(app)
                .get(`/urls/${shortCode}/stats`);

            expect(response.status).toBe(200);

            expect(response.body.success).toBe(true);

        });

    });

}); 

describe<any>("Rate Limiter", () => {
    it("should return 429", async () => {
        for (let i = 0; i < 100; i++) {
            await request(app).get("/health");
        }
        const response =
            await request(app).get("/health");
        expect(response.status).toBe(429);
    });
});