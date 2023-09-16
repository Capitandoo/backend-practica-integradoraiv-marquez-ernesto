import app from "../server.js";
import request from "supertest";
import { fakerES as faker } from "@faker-js/faker";
import mongoose from "mongoose";
import config from "../../config.js";
import UserManager from "../persistence/daos/mongodb/managers/user.manager.js";


const doc = {
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  code: faker.string.alphanumeric(5),
  price: faker.number.int(10000),
  status: faker.datatype.boolean(),
  stock: faker.number.int(100),
  category: faker.commerce.department(),
  thumbnails: [faker.image.url()],
};

const userData = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.exampleEmail(),
  password: "password123",
  age: faker.number.int(100),
};

//const userManager = new UserManager();
await mongoose.connect(config.MONGO_URL);

describe("Testing Integral Del Proyecto", () => {
  /*describe("TEST DE PRODUCTOS", () => {
    let authCookie;

    beforeEach(async () => {
      const authResponse = await request(app).post("/users/login").send({
        email: "carrio@mail.com",
        password: "1234",
      });
      authCookie = authResponse.headers["set-cookie"][0];
    }, 10000);

    test("[POST] /products | Crear un producto", async () => {
      const response = await request(app)
        .post("/products")
        .set("Cookie", [authCookie])
        .send(doc);

      const responseBody = response.body;
      const statusCode = response.statusCode;

      const expected = {
        title: doc.title,
        description: doc.description,
        code: doc.code,
        price: doc.price,
        status: doc.status,
        stock: doc.stock,
        category: doc.category,
        thumbnails: doc.thumbnails,
      };

      expect(responseBody).toMatchObject(expected);
      expect(response.statusCode).toBe(200);
      expect(statusCode).not.toBe(404);
    });

    test("[GET] /products | Obtener todos los productos", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("payload");
      expect(Array.isArray(response.body.payload)).toBe(true);
    });

    test("[GET] /products/:id | Obtener producto por su ID", async () => {
      const prodId = "64f7b818106d8b7c4b15c8e0";
      const response = await request(app).get(`/products/${prodId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("_id", prodId);
    });
  });

  describe("TEST DE CARRITOS", () => {
    let authCookie;

    beforeEach(async () => {
      const authResponse = await request(app).post("/users/login").send({
        email: "carrio@mail.com",
        password: "1234",
      });
      authCookie = authResponse.headers["set-cookie"][0];
    }, 10000);

    test("[GET] /cart/ | Obtener todos los carritos", async () => {
      const response = await request(app).get("/cart");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test("[GET] /cart/:id | Obtener carrito por su ID", async () => {
      const cartId = "64c03f0b035f5664ebd87bb9";

      const response = await request(app).get(`/cart/${cartId}`);

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty("_id", cartId);
    });

    test("[POST] /cart/ | Crear un carrito", async () => {
      const response = await request(app)
        .post("/cart/")
        .send({ products: [] });

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty("message", "Carrito creado");
    });
  });*/

  describe("TEST DE SESSIONS", () => {
    /*let authCookie;

    beforeEach(async () => {
      const authResponse = await request(app).post("/users/login").send({
        email: "carrio@mail.com",
        password: "1234",
      }, 10000);
      authCookie = authResponse.headers["set-cookie"][0];
      console.log('Response==>',authResponse)
      console.log('cookie==>',authCookie)
    });*/

    test("[POST] /users/login/ | Loguear un usuario", async () => {
      const userCredentials = {
        email: "carrio@mail.com",
        password: "1234",
      };

      const response = await request(app)
        .post("/users/login")
        .send(userCredentials);
        console.log('body==>',response.body)

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("msg", "Login OK");
    },10000);

    test("[POST] /users/register | Registrar un usuario", async () => {
      const response = await request(app)
        .post("/users/register")
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("msg", "Register OK");
    });

    test("[GET] /users/current/ | Obtener datos del usuario logueado", async () => {
      const response = await request(app)
        .get("/users/current")
        .set("Cookie", [authCookie]);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual({
        "Usuario Actual": {
          Nombre: "Analia",
          Apellido: "Garavano",
          Rol: "premium",
        },
      });
    });
  });
});
