import mongoose from "mongoose";
import config from "../../config.js";
import chai from "chai";
import supertest from "supertest";
import UserManager from "../persistence/daos/mongodb/managers/user.manager.js";
import { initMongoDB } from "../persistence/daos/mongodb/conexion.js";
import app from "../server.js";


const expect = chai.expect;
const requester =supertest(app)
const manager = new UserManager();
await initMongoDB();

describe("Testing User/Session Router", () => {

  it("Login de usuario", async () => {
    let credentialsMock = {
      email: "carrio@mail.com",
      password: "1234"
    };    
    const response = await requester.post("/users/login/");
    console.log('response==>',response.body)
    //expect(statusCode).to.be.eql(404);
    //expect(typeof body, "object").to.be.ok;
    //expect(body.message).to.be.equal("Not Found");
  });

  /*it("Obtener un error enviando usuario invalido", async () => {
    let credentialsMock = {
      email: "ernesto@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await requester
      .post("users/login")
      .send(credentialsMock);
    expect(statusCode).to.be.eql(401);
    expect(body.status).to.be.eql("error");
    expect(body.error).to.be.eql("User not found");
  });*/
});
