import supertest from "supertest";
import mongoose, { Types } from 'mongoose';
import server from "../utils/createServer";
import * as UserServie from '../services/Humen.service';

const app = server()

const RegisterInput ={
	"first_name":"khedr",
	"last_name": "suleiman",
	"email": "suls79996@gmail.com",
	"role": "admin",
	"age": 23,
  "password": "suleiman123",
  "passwordConfirmation": "suleiman123",
	"centerId":"64b6b73c3e0b8c4602c1ffbc"
}

const RegisterPayload = {
	"first_name": "khedr",
	"last_name": "suleiman",
	"email": "fofoSd@gmail.com",
	"confirmEmail": false,
	"role": "admin",
	"age": 23,
	"centerId": "64b6b73c3e0b8c4602c1ffbc",
	"_id": expect.any(String),
	"createdAt": expect.any(String),
	"updatedAt": expect.any(String),
	"__v": 0,
	"saveEmail": {
		"HumenId": expect.any(String),
		"token": expect.any(String),
		"_id": expect.any(String),
		"expiresAt": expect.any(String),
		"createdAt": expect.any(String),
		"updatedAt": expect.any(String),
		"__v": 0
	}
}

const createUserPayload = {
  first_name: 'khedr',
  last_name: 'suleiman',
  email: 'suls79996@gmail.com',
  confirmEmail: false,
  role: 'admin',
  age: 23,
  centerId: expect.any(String),
  password: expect.any(String),
  _id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  __v: 0
}

describe("Humen", () => {
    beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/system1");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
    
  describe("Register", () => {
    describe('valid input', () => {
      describe("Create new User", () => {
        it('should return 201 and user information', async () => {
          const newUserMocka = jest
            .spyOn(UserServie, 'CreateUser')
            //@ts-ignore
            .mockReturnValueOnce(createUserPayload);
          
          const { statusCode, body } = await supertest(app)
            .post('/humen/signup')
            .send(RegisterInput)
          
          
        expect(statusCode).toBe(201);

        expect(body).toEqual(RegisterPayload);

        // expect(newUserMocka).toHaveBeenCalledWith(RegisterInput);
        })
      })
    })
      //Create new Token 
    //invalid input
      //E11000 Error
      //not match password
      //find another admin
  })
})