const mobileNav =  document.querySelector('.mobile-nav');
const toggleBtn =  document.querySelector('.menu');
const imageDisabler = document.querySelector('.main-img');

const shortenBtn = document.querySelector(".url-shorten__btn");
const formInput = document.getElementById('input');
const pasteLink = document.querySelector('.paste-link');
const shortenLink = document.querySelector('.shorten-link');
const copyBtn = document.querySelector('.url-copy__btn');


// Hamburgermenu
toggleBtn.addEventListener("click", function() {
  mobileNav.classList.toggle('open');
  imageDisabler.classList.toggle('close');
});


const linksUrl = 'https://rel.ink/api/links/';


const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const sendData = (post) => {
  sendHttpRequest('POST', linksUrl, post
    ).then(responseData => {
      console.log(responseData.hashid);
      shortenLink.textContent = "https://rel.ink/" + responseData.hashid;
      pasteLink.textContent = formInput.value;
      formInput.style.border = "none";
      formInput.classList.remove('wrong-input')
    })
    .catch(err => {
      console.log(err);
      formInput.style.border = "2px solid hsl(0, 87%, 67%)";
      formInput.classList.add('wrong-input')
    });
};

shortenBtn.addEventListener('click', event => {
  event.preventDefault();

  const post = {
    "url": formInput.value
  }

  sendData(post);

})

