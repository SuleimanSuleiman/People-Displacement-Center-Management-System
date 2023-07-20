import supertest from "supertest";
import mongoose from 'mongoose';
import server from "../utils/createServer";

const app = server()

const refugreeInput = {
	"first_name":"hello",
	"last_name": "suleiman",
	"father_name": "qazi",
	"mother_name": "firuz",
	"condtion": "good",
	"city": "safita",
	"vellage": "down town",
	"centerId":"64b6b847debbad465d2454ae"
}

const addRefugeeRes = {
	"success": true,
	"status": 201,
	"message": "add successfully"
}


describe("Refugee", () => {
    beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/system1");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
    
    describe("Refugee", () => {
        
    })
})