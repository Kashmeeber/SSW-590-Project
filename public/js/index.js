let homeForm = document.getElementById('home-form');
let quizForm = document.getElementById('quiz-form');
let error = document.getElementById('error');
let serverError = document.getElementById('serverError');

function errorCheck(name, location) {
  name = name.trim();
  location = location.trim();
  if (name === '' && location === '') {
    throw 'Please enter a restaurant name and location';
  }
  if (name === '') {
    throw 'Please enter a restaurant name';
  }
  if (location === '') {
    throw 'Please enter a location';
  }
  if (typeof name !== 'string') {
    throw 'Restaurant name must be a string';
  }
  if (typeof location !== 'string') {
    throw 'Location must be a string';
  }
  return;
}

function errorCheck2(cuisine, price1, price2, price3, price4, location, distance, numOptions) {
  cuisine = cuisine.trim();
  location = location.trim();
  distance = distance.trim();
  numOptions = numOptions.trim();
  if (cuisine === '') {
    throw 'Please enter a cuisine';
  }
  if (location === '') {
    throw 'Please enter a location';
  }
  if (distance === '') {
    throw 'Please enter a distance';
  }
  if (numOptions === '') {
    throw 'Please enter the number of options';
  }
  if (typeof cuisine !== 'string') {
    throw 'Cuisine must be a string';
  }
  if (typeof location !== 'string') {
    throw 'Location must be a string';
  }
  if (typeof distance !== 'string') {
    throw 'Distance must be a string';
  }
  if (typeof numOptions !== 'string') {
    throw 'Number of options must be a string';
  }
  if (isNaN(distance)) {
    throw 'Distance must be a number';
  }
  if (isNaN(numOptions)) {
    throw 'Number of options must be a number';
  }
  if (distance < 0) {
    throw 'Distance must be a positive number';
  }
  if (numOptions < 0) {
    throw 'Number of options must be a positive number';
  }
  if (numOptions > 50) {
    throw 'Number of options must be less than 50';
  }
  if (price1 === false && price2 === false && price3 === false && price4 === false) {
    throw 'Please select at least one price';
  }
  return;
}

if (homeForm) {
  homeForm.addEventListener('submit', function (event) {
    try {
      serverError.innerHTML = '';
      error.hidden = true;
      error.innerHTML = '';
      let location = document.getElementById('searchLocation');
      let restaurant = document.getElementById('searchName');
      errorCheck(restaurant.value, location.value);
    } catch (e) {
      event.preventDefault();
      serverError.innerHTML = '';
      error.hidden = false;
      error.innerHTML = e;
    }
  });
}

if (quizForm) {
  quizForm.addEventListener('submit', function (event) {
    try {
      serverError.innerHTML = '';
      error.hidden = true;
      error.innerHTML = '';
      let cuisine = document.getElementById('cuisine');
      let price1 = document.getElementById('price1');
      let price2 = document.getElementById('price2');
      let price3 = document.getElementById('price3');
      let price4 = document.getElementById('price4');
      let location = document.getElementById('location');
      let distance = document.getElementById('distance');
      let numOptions = document.getElementById('numOptions');
      errorCheck2(
        cuisine.value,
        price1.checked,
        price2.checked,
        price3.checked,
        price4.checked,
        location.value,
        distance.value,
        numOptions.value
      );
    } catch (e) {
      event.preventDefault();
      serverError.innerHTML = '';
      error.hidden = false;
      error.innerHTML = e;
    }
  });
}

function homepageQuestion() {
  let option1 = document.getElementById('option1').checked;
  let option2 = document.getElementById('option2').checked;
  let form = document.getElementById('chatbot-home-form');
  let pTag = document.getElementById('home-answer');
  // let option = document.getElementsByName('option');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let divTag = document.getElementsByClassName('main');
      pTag.innerHTML = '';
      if (!option1 && !option2) {
        pTag.innerHTML = 'Please select one option';
      } else if (option1) {
        pTag.innerHTML =
          'To use the homepage, type in both the restaurant and location. The results will be displayed matching your request.';
      } else if (option2) {
        pTag.innerHTML =
          'If you do not know where you want to eat, take our quiz to determine the best restaurant for you!';
      }
      divTag.appendChild(pTag);

      setTimeout(function () {
        divTag.removeChild(pTag), form.reset();
      }, 5000);
    });
  }
}

function quizQuestion() {
  let quizoption1 = document.getElementById('quiz-option1').checked;
  let quizoption2 = document.getElementById('quiz-option2').checked;
  let form = document.getElementById('chatbot-quiz-form');
  let pTag = document.getElementById('quiz-answer');
  // let option = document.getElementsByName('option');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let divTag = document.getElementsByClassName('main');
      pTag.innerHTML = '';
      if (!quizoption1 && !quizoption2) {
        pTag.innerHTML = 'Please select one option';
      } else if (quizoption1) {
        pTag.innerHTML =
          'To use the quiz page, fill in all of the fields and click submit. The results will be displayed matching your request.';
      } else if (quizoption2) {
        pTag.innerHTML =
          'If you already know where you want to eat, return to our homepage and type in the restaurant and location. The results will show you the best options matching your request.';
      }
      divTag.appendChild(pTag);

      setTimeout(function () {
        // form.reset(),
        divTag.removeChild(pTag), form.reset();
        // ,pTag.innerHTML = ''
      }, 5000);
    });
  }
}

function openForm() {
  document.getElementById("chatbot-home-form").style.display = "block";
  document.getElementById("chatbot-home-form").style.visibility = "visible";
  document.getElementById("openChat").style.display = "none";
}

function closeForm() {
    document.getElementById("chatbot-home-form").style.display = "none";
    document.getElementById("openChat").style.display = "block";
}   

function openForm2() {
  document.getElementById("chatbot-quiz-form").style.display = "block";
  document.getElementById("chatbot-quiz-form").style.visibility = "visible";
  document.getElementById("openChat").style.display = "none";
}

function closeForm2() {
    document.getElementById("chatbot-quiz-form").style.display = "none";
    document.getElementById("openChat").style.display = "block";
} 