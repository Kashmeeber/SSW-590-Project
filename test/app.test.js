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
  test('1: GET / should show homepage', async () => {
    const res = await supertest(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Food Me Please\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>Food Me Please</h1>\r\n' +
    '<main>\r\n' +
    '  <p>This application helps users decide where to eat. There is a quick quiz that takes in their\r\n' +
    '    preferences to determine their ideal restaurant. The user can also search for restaurants by\r\n' +
    '    name and location. There is an interactive chat-bot that can assist users in\r\n' +
    '    various ways.\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError"></p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantResults' method='POST' id="home-form">\r\n` +
    "    <label for='searchLocation'>In what area do you want to search in?</label><br>\r\n" +
    "    <input type='text' name='searchLocation' id='searchLocation'><br><br>\r\n" +
    "    <label for='searchName'>What is the name of the restaurant?</label><br>\r\n" +
    "    <input type='text' name='searchName' id='searchName'><br><br />\r\n" +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br>\r\n' +
    '\r\n' +
    '  <button class="openChat" onclick="openForm()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-home-main" class="main"></div>\r\n' +
    '    <form id="chatbot-home-form" class="popup">\r\n' +
    '      <label for="option1">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    `      <input type="radio" id="option2" name="option" value="option2" />What if I don't know what I want to eat?<br><br>\r\n` +
    '      <button onclick="homepageQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>\r\n' +
    '      <p id="home-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
  test('2: GET /fsaf should give an error', async () => {
    const res = await supertest(app).get('/fsaf');
    expect(res.statusCode).toEqual(404);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 404\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    "    <p class='error'>\r\n" +
    '  Error 404: Webpage Not Found\r\n' +
    '</p>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
  test('3: GET /restaurantQuiz should show restaurants based on quiz results', async () => {
    const res = await supertest(app).get('/restaurantQuiz');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toEqual('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Restaurant Quiz\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError"></p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
  test('4: GET /restaurantDetails/:id should return details about a specific restaurant', async () => {
    const res = await supertest(app).get('/restaurantDetails/gt-0HkY2DC-NscmhOsKOWw');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Restaurant Details\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurant Details\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <div>\r\n' +
    '    <h2>\r\n' +
    '      The Hutton\r\n' +
    '    </h2>\r\n' +
    "      <img alt='The Hutton' src=https://s3-media4.fl.yelpcdn.com/bphoto/xIMlynus3UrXyFa46klYQw/o.jpg />\r\n" +
    '    <br />\r\n' +
    "      <a target='_blank' href=https://www.yelp.com/biz/the-hutton-jersey-city?adjust_creative&#x3D;MPHmS7HJqWu_7kjXKbGPOw&amp;utm_campaign&#x3D;yelp_api_v3&amp;utm_medium&#x3D;api_v3_business_lookup&amp;utm_source&#x3D;MPHmS7HJqWu_7kjXKbGPOw>\r\n" +
    '        Restaurant Information\r\n' +
    '      </a>\r\n' +
    '    <address>\r\n' +
    '      Address:\r\n' +
    '      225 Hutton St, Jersey City, NJ 07307\r\n' +
    '    </address>\r\n' +
    '    <address>\r\n' +
    '      Phone:\r\n' +
    '      (201) 356-9169\r\n' +
    '    </address>\r\n' +
    '    <p>Price: $$</p>\r\n' +
    '    <p>Average rating:\r\n' +
    '      <img alt=The Hutton src=../public/images/regular/regular_4_half.png>\r\n' +
    '    </p>\r\n' +
    '    <p>Currently Open</p>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
  test('5: GET /restaurantDetails/:id should give an error due to an invalid id', async () => {
    const res = await supertest(app).get('/restaurantDetails/gt');
    expect(res.statusCode).toEqual(404);
    // console.log(res);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 404\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    "    <p class='error'>\r\n" +
    '  Error 404: A restaurant with the given id does not exist.\r\n' +
    '</p>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
});

describe('POST Route Endpoints', () => 
{
  test('6: POST /restaurantResults find restaurants based on the given parameters', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchName: "Starbucks",
      searchLocation: "Hoboken"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    "      Here's What We Found...\r\n" +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '    Restaurants Found\r\n' +
    '  </h1>\r\n' +
    '  <h2>\r\n' +
    '    \r\n' +
    '  </h2>\r\n' +
    '  <main>\r\n' +
    '    <ol>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/zkpRCCgdlTiMS0i10t5x6w'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/MwdfVMiP_zkX5BE3TaMCWg'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/SYOQooRo_AsgMQoAZEIWWg'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/IEQsoguinwHzYYBGrmUYXA'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/q4jhCWLkC6WA5ZiN6hWf9w'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/bvOlb-9UI6PakoiJpstX_g'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/NsHtwZBpio1jKfA7CwHZOA'>Starbucks Reserve Roastery</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/doYomiwqLdNoP18iDrnLFg'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/TF18eL-pz9xNCIR0Oz2SQA'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/i6VGmpA_5BF20eb_tdu_qA'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/Xh9s9vtU14P0n3xfGjSVfQ'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/hWNIU-r6lzdYAIs_fyaRkw'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/OwtKf-ePwLX0z46bQ6I60g'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/KErqx85gjvz5vaS4lnmpoQ'>Starbucks Reserve</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/BXkOp7IXVNDC98SxyM002Q'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/D71sZqtfYHHU4-4wygHyHQ'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/0HfEodVz4GmQ53P0oo8OLg'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/wN8ZuLAksABH2FzTOdneRQ'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/uiLtRl-WUXZe9Zzkt01ffA'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '      <li>\r\n' +
    "        <a href='/restaurantDetails/fXOXQQWIbfd01j4YGlUVyg'>Starbucks</a>\r\n" +
    '      </li>\r\n' +
    '    </ol>\r\n' +
    "    <a href='/'>\r\n" +
    '      Make another search\r\n' +
    '    </a>\r\n' +
    '  </main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('7: POST /restaurantResults gives an error due to missing restaurant name', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchLocation: "Hoboken"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>Food Me Please</h1>\r\n' +
    '<main>\r\n' +
    '  <p>This application helps users decide where to eat. There is a quick quiz that takes in their\r\n' +
    '    preferences to determine their ideal restaurant. The user can also search for restaurants by\r\n' +
    '    name and location. There is an interactive chat-bot that can assist users in\r\n' +
    '    various ways.\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing search term.</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantResults' method='POST' id="home-form">\r\n` +
    "    <label for='searchLocation'>In what area do you want to search in?</label><br>\r\n" +
    "    <input type='text' name='searchLocation' id='searchLocation'><br><br>\r\n" +
    "    <label for='searchName'>What is the name of the restaurant?</label><br>\r\n" +
    "    <input type='text' name='searchName' id='searchName'><br><br />\r\n" +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br>\r\n' +
    '\r\n' +
    '  <button class="openChat" onclick="openForm()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-home-main" class="main"></div>\r\n' +
    '    <form id="chatbot-home-form" class="popup">\r\n' +
    '      <label for="option1">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    `      <input type="radio" id="option2" name="option" value="option2" />What if I don't know what I want to eat?<br><br>\r\n` +
    '      <button onclick="homepageQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>\r\n' +
    '      <p id="home-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('8: POST /restaurantResults gives an error due to missing location', async () => {
    const res = await supertest(app).post('/restaurantResults').send({
      searchName: "Starbucks"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>Food Me Please</h1>\r\n' +
    '<main>\r\n' +
    '  <p>This application helps users decide where to eat. There is a quick quiz that takes in their\r\n' +
    '    preferences to determine their ideal restaurant. The user can also search for restaurants by\r\n' +
    '    name and location. There is an interactive chat-bot that can assist users in\r\n' +
    '    various ways.\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing search term.</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantResults' method='POST' id="home-form">\r\n` +
    "    <label for='searchLocation'>In what area do you want to search in?</label><br>\r\n" +
    "    <input type='text' name='searchLocation' id='searchLocation'><br><br>\r\n" +
    "    <label for='searchName'>What is the name of the restaurant?</label><br>\r\n" +
    "    <input type='text' name='searchName' id='searchName'><br><br />\r\n" +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br>\r\n' +
    '\r\n' +
    '  <button class="openChat" onclick="openForm()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-home-main" class="main"></div>\r\n' +
    '    <form id="chatbot-home-form" class="popup">\r\n' +
    '      <label for="option1">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    `      <input type="radio" id="option2" name="option" value="option2" />What if I don't know what I want to eat?<br><br>\r\n` +
    '      <button onclick="homepageQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>\r\n' +
    '      <p id="home-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('9: POST /restaurantQuizResults saves quiz results', async () => {
    const res = await supertest(app).post('/restaurantQuizResults').send({
      cuisine: "Thai",
      price: [1,2],
      location: "Jersey City",
      distance: 5,
      open: "true",
      numOptions: 3,
      sort_by: "best_match"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    "      Here's What We Found...\r\n" +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Quiz Results\r\n' +
    '</h1>\r\n' +
    '<h2>\r\n' +
    '\r\n' +
    '</h2>\r\n' +
    '<main>\r\n' +
    '<ol>\r\n' +
    '    <li>\r\n' +
    "    <a href='/restaurantDetails/gt-0HkY2DC-NscmhOsKOWw'>The Hutton</a>\r\n" +
    '    </li>\r\n' +
    '    <li>\r\n' +
    "    <a href='/restaurantDetails/_hvgCRW8Vw1n3Usr9RPoUg'>Cellar 335</a>\r\n" +
    '    </li>\r\n' +
    '    <li>\r\n' +
    "    <a href='/restaurantDetails/jc_XQPbSCwMHsXLfinXA6A'>Prince &amp; I</a>\r\n" +
    '    </li>\r\n' +
    '</ol>\r\n' +
    "<a href='/'>\r\n" +
    '    Make another search\r\n' +
    '</a>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>');
  });
  test('10: POST /restaurantQuizResults gives an error due to missing cuisine', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('11: POST /restaurantQuizResults gives an error due to missing price', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  // console.log(res);
  test('12: POST /restaurantQuizResults gives an error due to missing location', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('13: POST /restaurantQuizResults gives an error due to missing distance', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('14: POST /restaurantQuizResults gives an error due to missing open', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('15: POST /restaurantQuizResults gives an error due to missing numOptions', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
  test('16: POST /restaurantQuizResults gives an error due to missing sort_by', async () => {
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
    expect(res.text).toBe('<!DOCTYPE html>\r\n' +
    "<html lang='en'>\r\n" +
    '\r\n' +
    '  <head>\r\n' +
    "    <meta charset='utf-8' />\r\n" +
    '    <title>\r\n' +
    '      Error 400\r\n' +
    '    </title>\r\n' +
    "    <link rel='stylesheet' href='../../public/css/main-styles.css' />\r\n" +
    '    <script src="../../public/js/index.js"></script>\r\n' +
    '  </head>\r\n' +
    '\r\n' +
    '  <body>\r\n' +
    '    <tab>\r\n' +
    "      <a href='/' class='tabs'>Home</a>\r\n" +
    "      <a href='/restaurantQuiz' class='tabs'>Quiz</a>\r\n" +
    '    </tab>\r\n' +
    '    <h1>\r\n' +
    '  Restaurants Quiz\r\n' +
    '</h1>\r\n' +
    '<main>\r\n' +
    '  <p>\r\n' +
    "    Trying to find a place to eat and can't decide? Take our quiz and we'll help you find the\r\n" +
    '    perfect place! This quiz takes in your preferences to find the best restaurants near you!\r\n' +
    '  </p>\r\n' +
    '  <p id="serverError">Error 400: Missing inputs given</p>\r\n' +
    '  <div id="error" hidden></div>\r\n' +
    `  <form action='/restaurantQuizResults' method='POST' id="quiz-form">\r\n` +
    "    <label for='cuisine'>What type of food are you in the mood for?</label><br>\r\n" +
    "    <input type='text' name='cuisine' id='cuisine'><br><br>\r\n" +
    '\r\n' +
    "    <label for='price1'>What is your price range?</label><br>\r\n" +
    "    <input type='checkbox' name='price' id='price1' value='1'>$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price2' value='2'>$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price3' value='3'>$$$<br>\r\n" +
    "    <input type='checkbox' name='price' id='price4' value='4'>$$$$<br><br>\r\n" +
    '\r\n' +
    "    <label for='location'>Where are you located?</label><br>\r\n" +
    "    <input type='text' name='location' id='location'><br><br>\r\n" +
    '\r\n' +
    '    <label for="distance">How far are you willing to travel? (in miles)</label><br>\r\n' +
    '    <input type="number" name="distance" id="distance" min="0"><br><br>\r\n' +
    '\r\n' +
    '    <label for="open">Do you want to filter for restaurants that are open now?</label><br>\r\n' +
    '    <select name="open" id="open">\r\n' +
    '      <option value="true" id="yes">Yes</option>\r\n' +
    '      <option value="false" id="no">No</option>\r\n' +
    '    </select><br><br>\r\n' +
    '\r\n' +
    '    <label for="numOptions">How many options do you want to display?</label><br>\r\n' +
    '    <input type="number" name="numOptions" id="numOptions" min="0" max="50"><br><br>\r\n' +
    '\r\n' +
    '    <label for="sort_by">How do you want to sort the results?</label><br>\r\n' +
    '    <select name="sort_by" id="sort_by">\r\n' +
    '      <option value="best_match">Best Match</option>\r\n' +
    '      <option value="rating">Rating</option>\r\n' +
    '      <option value="distance">Distance</option>\r\n' +
    '    </select>\r\n' +
    '    <br><br>\r\n' +
    `    <input type='submit' value='Submit' class = "submitBtn">\r\n` +
    '  </form>\r\n' +
    '  <br />\r\n' +
    '  <button class="openChat" onclick="openForm2()" id="openChat">Questions?</button>\r\n' +
    '  <div id="chatbot-quiz-main" class="main"></div>\r\n' +
    '    <form id="chatbot-quiz-form" class="popup">\r\n' +
    '      <label for="question">Please select your question.</label><br><br>\r\n' +
    '      <input type="radio" id="quiz-option1" name="option" value="option1" />How do I use this page?<br><br>\r\n' +
    '      <input type="radio" id="quiz-option2" name="option" value="option2" />What if I already know what I want to\r\n' +
    '      eat?<br><br>\r\n' +
    '      <button onclick="quizQuestion()" class="btn">Ask</button>\r\n' +
    '      <button type="button" class="btn cancel" onclick="closeForm2()">Close</button>\r\n' +
    '      <p id="quiz-answer"></p>\r\n' +
    '    </form>\r\n' +
    '  </div>\r\n' +
    '</main>\r\n' +
    '  </body>\r\n' +
    '\r\n' +
    '</html>')
  });
});