import app from "../../app";
import request from "supertest";
import { db } from "../../config/db";

//Antes de correr los tests, sincronizamos la base de datos
beforeAll(async () => {
    await db.sync({ force: true }); //Esto borra y vuelve a crear las tablas, ideal para tests
});

afterAll(async () => {
  await db.close();
});

//Test para el endpoint de registro de usuario
describe("POST /api/auth/register", () => {
    test("should register a new user and return the user data", async () => {
        const newUser = {
            name: "User",
            lastname: "Test",
            phone: "3196598574",
            email: "mail@example.com",
            password: "password123",
            confirmPassword: "password123",
        };

        const res = await request(app).post("/api/auth/register").send(newUser);

        //Que espero del test
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data');

        //Que no quiero que me devuelva el test
        expect(res.body.data).not.toHaveProperty('password');
        expect(res.body.data).not.toHaveProperty('confirmPassword');
        expect(res.status).not.toBe(404);
        expect(res.status).not.toBe(400);

    });
});

//Test para email valido
describe("POST /api/auth/register", () => {
    test("should return an error for an invalid email", async () => {
        const invalidUser = {
            name: "User",
            lastname: "Test",
            phone: "3155487857",
            email: "invalid-email",
            password: "password123",
            confirmPassword: "password123",
        };

        const res = await request(app).post("/api/auth/register").send(invalidUser);

        //Que espero que me traiga el test
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0]).toHaveProperty('msg', 'El email no es válido');

        //Que no quiero que me devuelva el test
        expect(res.status).not.toBe(201);
    });
});

//Test para telefono valido
describe("POST /api/auth/register", () => {
    test("should return an error for an invalid phone number", async () => {
        const invalidUser = {
            name: "User",
            lastname: "Test",
            phone: "31996556587",
            email: "mail@example.com",
            password: "password123",
            confirmPassword: "password123",
        };

        const res = await request(app).post("/api/auth/register").send(invalidUser);

        //Que espero que me traiga el test
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');

        //Que no quiero que me devuelva el test
        expect(res.status).not.toBe(201);
    });
});
