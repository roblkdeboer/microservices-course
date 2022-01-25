import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided ID does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: '31dsadas',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: '31dsadas',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const firstSend = {
    title: 'firstSend',
    price: 1,
  };
  const secondSend = {
    title: 'secondSend',
    price: 2,
  };
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(firstSend);
  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send(secondSend)
    .expect(401);

  expect(updateResponse.body).not.toMatchObject(secondSend);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const firstSend = {
    title: 'Title',
    price: 1,
  };

  const secondSend = {
    title: '',
    price: 1,
  };

  const thirdSend = {
    title: 'Title',
    price: -1,
  };
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send(firstSend);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send(secondSend)
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send(thirdSend)
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  const firstSend = {
    title: 'Title',
    price: 1,
  };

  const secondSend = {
    title: 'New Title',
    price: 10,
  };

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send(firstSend);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send(secondSend)
    .expect(200);

  const ticketResponse = await request(app).get(
    `/api/tickets/${response.body.id}`
  );

  expect(ticketResponse.body.title).toEqual(secondSend.title);
  expect(ticketResponse.body.price).toEqual(secondSend.price);
});
