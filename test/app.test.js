import supertest from 'supertest';
import express from 'express';
const app = express();
import router from '../routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

router(app);
app.use('/', router);

describe('GET Route Endpoints', () => 
{
  test('GET / should show homepage', async () => {
    const res = await supertest(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe();
  });
  test('GET /fsaf should give an error', async () => {
    const res = await supertest(app).get('/fsaf');
    expect(res.statusCode).toEqual(404);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe();
  });
  test('GET /restaurantQuiz should show restaurants based on quiz results', async () => {
    const res = await supertest(app).get('/restaurantQuiz');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toEqual();
  });
  test('GET /restaurantDetails/:id should return details about a specific restaurant', async () => {
    const res = await supertest(app).get('/restaurantDetails/gt-0HkY2DC-NscmhOsKOWw');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe();
  });
  test('GET /restaurantDetails/:id should give an error due to an invalid id', async () => {
    const res = await supertest(app).get('/restaurantDetails/gt');
    expect(res.statusCode).toEqual(404);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe();
  });
});

describe('POST Route Endpoints', () => 
{
  test('POST /restaurantResults find restaurants based on the given parameters', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchName: "Starbucks",
      searchLocation: "Hoboken"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantResults gives an error due to missing restaurant name', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchLocation: "Hoboken"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantResults gives an error due to missing location', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchName: "Starbucks"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults saves quiz results', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      open: "true",
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing cuisine', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      open: "true",
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing price', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      location: "Jersey City",
      distance: 5,
      open: "true",
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing location', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      distance: 5,
      open: "true",
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing distance', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      open: "true",
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing open', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      numOptions: 1,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing numOptions', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      open: "true",
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
  test('POST /restaurantQuizResults gives an error due to missing sort_by', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      open: "true",
      numOptions: 1
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    // expect(res.text).toBe()
  });
});