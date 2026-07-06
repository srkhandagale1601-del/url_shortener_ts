import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app";

describe<any>("Health API", () => {

    it("should return 200", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.status).toBe(200);

    });

});