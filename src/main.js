const mobileNav =  document.querySelector('.mobile-nav');
const toggleBtn =  document.querySelector('.menu');
const imageDisabler = document.querySelector('.main-img');

const shortenBtn = document.querySelector(".url-shorten__btn");
const formInput = document.getElementById('input');
// eslint-disable-next-line no-unused-vars
const copyBtn = document.querySelector('.url-copy__btn');
const List = document.querySelector('.list')
const errorHandling = document.querySelector('.error-msg')


// Hamburgermenu
toggleBtn.addEventListener("click", function() {
  mobileNav.classList.toggle('open');
  imageDisabler.classList.toggle('close');
});


// API 
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
      const urlList = document.createElement('ul');  
      urlList.className = "url-list"; 
      urlList.innerHTML = `
      <li class="url-links">
        <div class="paste-link">${formInput.value}</div>
        <div class="shorten-link" id="copyText">${"https://rel.ink/" + responseData.hashid}</div>
        <button type="button" onclick="copyUrl()" class="url-copy__btn shared-btn">Copy</button>
      </li>`
      List.appendChild(urlList);
      errorHandling.innerHTML = ""
      formInput.value = "";
      formInput.style.border = "none";
      formInput.classList.remove('wrong-input')
    })
    .catch(err => { 
      if(formInput.value === ""){
        errorHandling.innerHTML = `
        <p class="error-handle">Please add a link</p>`
      }else{
        console.log(err);
      }
      formInput.style.border = "2px solid hsl(0, 87%, 67%)";
      formInput.classList.add('wrong-input')
      formInput.value = "";
    });
};

shortenBtn.addEventListener("click", event => {
  event.preventDefault();

  const post = {
    "url": formInput.value
  }
  sendData(post);
  
})

// eslint-disable-next-line no-unused-vars
function copyUrl() {
  try{
    const range = document.createRange();
    range.selectNode(document.getElementById("copyText"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    console.log('done');
  }
  catch(err){
    console.log(err);
  }
}