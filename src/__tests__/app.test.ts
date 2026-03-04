import request  from "supertest";
import app from "../app";

describe("GET /api", () => {
  test('should return a JSON response with msg "Desde API"', async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ msg: "Desde API" });    
  })
})