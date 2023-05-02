function homepageQuestion() {
  let option1 = document.getElementById('option1');
  let option2 = document.getElementById('option2');
  let form = document.getElementById('form');
  let pTag = document.createElement('p');
  let option = document.getElementsByName('option');
  if (form) {
    document.addEventListener('submit', function (event) {
      event.preventDefault();
      let divTag = document.getElementById('main');
      pTag.innerHTML = '';
      let optionValue = null;
      console.log(optionValue);
      if (optionValue === null) {
        pTag.innerHTML = 'Please select one option';
      } else if (optionValue !== null) {
        if (optionValue === 'option1') {
          pTag.innerHTML =
            'To use the homepage, type in both the restaurant and location. The results will be displayed matching your request.';
        } else if (optionValue === 'option2') {
          pTag.innerHTML =
            'If you do not know where you want to eat, take our quiz to determine the best restaurant for you!';
        }
      }
      divTag.appendChild(pTag);
      setTimeout(function () {
        pTag.remove(), form.reset();
      }, 3000);
    });
  }
}
