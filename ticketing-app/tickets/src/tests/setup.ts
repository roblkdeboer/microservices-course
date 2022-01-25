import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

let mongo: any;

// Run before all the tests to connect to the in-memory mongodb
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// Run before each of our tests to reset all the data in the DB
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Run after all tests to spin down the mongo db
afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
  // Build a JWT payload (id, email)
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn the session to JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base 64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string: a cookie with encoded data
  return [`session=${base64}`];
};
