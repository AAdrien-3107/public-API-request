const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .then(data => {
              const users = data.results
              users.forEach((user) => {
                populateGallery(user);
                
             
            })
            
          })
             .catch(error => console.log('Looks like there was a problem!', error))
  };
//Could implement the number of user to display per page.
  fetchData('https://randomuser.me/api/?results=12');
  
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  function populateGallery(data) {
    //i need to create UL and LI to populate my galery.
    const galleryDiv = `
          <div id=${data.email} class="card">
              <div class="card-img-container">
                  <img class="card-img" src=${data.picture.large} alt="profile picture">
              </div>
              <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                 <p class="card-text">${data.email}</p>
                   <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
               </div>
          </div>`;

          gallery.insertAdjacentHTML('beforeEnd', galleryDiv);
  }

  function populateModal(data){
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    gallery.appendChild(modal);
    
    const modalDiv = `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">${data.location.street}, ${data.location.city}, ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${data.dob.date}</p>
                </div>
            </div>`;

            modal.insertAdjacentHTML('beforeEnd', modalDiv);
            modal.style.display = 'none';


  }

  

  


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
//select.addEventListener('change', fetchBreedImage);
//card.addEventListener('click', fetchBreedImage);
//form.addEventListener('submit', postData);

      
  

// ------------------------------------------
//  POST DATA
// ------------------------------------------