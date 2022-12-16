const express = require("express");
const request = require("supertest");

const { ctrlWrapper } = require('../../helpers')
const signup = require('./register')

app = express();
app.use(express.json());

app.post("/api/signup", ctrlWrapper(signup))

app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({message});
  })

jest.mock('../../models')

describe("test signup controlller", () => {
    let server;

    beforeAll(() => server = app.listen(3000))
    afterAll(() => server.close())

    test("singup new User without subscription", async() => {
        const user = { email : "test@mail.com", password: "123456"}
        const response = await request(app).post("/api/signup").send(user)        
        expect(response.status).toBe(201)
        const body = response.body;
        expect( body instanceof Object).toBe(true)
        expect.objectContaining({
            user: { ...user },
        });
        expect(body.user.subscription).toBe("starter");
    })

    test("singup new User with subscription", async() => {
        const user = { email : "test@mail.com", password: "123456", subscription: "pro"}
        const response = await request(app).post("/api/signup").send(user)
        expect(response.status).toBe(201)
        const body = response.body;
        expect( body instanceof Object).toBe(true)
        expect.objectContaining({
            user: { ...user },
          });
        expect(body.user.subscription).toBe("pro");
    })

    test("singup exist User", async() => {
        const user = { email : "test_3@mail.com", password: "123456"}
        const response = await request(app).post("/api/signup").send(user)
        expect(response.status).toBe(409)
    })
    ;
})