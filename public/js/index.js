function homepageQuestion() {
  let option1 = document.getElementById('option1').checked;
  let option2 = document.getElementById('option2').checked;
  let form = document.getElementById('chatbot-home-form');
  let pTag = document.getElementById('home-answer');
  // let option = document.getElementsByName('option');
  if (form) {
    document.addEventListener('submit', function (event) {
      event.preventDefault();
      let divTag = document.getElementById('main');
      pTag.innerHTML = '';
      if (!option1 && !option2 ) {
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
        // form.reset(), 
        divTag.removeChild(pTag),
        form.reset()
        // ,pTag.innerHTML = ''
        ;
      }, 5000);
    });
  }
}
