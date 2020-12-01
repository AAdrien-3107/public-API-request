const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const openModalButtons = document.querySelectorAll('[data-button-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

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
                populateModal(user);               
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

  // This methode will create cards for each users.
  function populateGallery(data) {
    //i need to create UL and LI to populate my galery.
    const galleryDiv = `
         
          <div id=${data.email} class="card">
              <div class="card-img-container">
                  <img class="card-img" src=${data.picture.large} alt="profile picture">
              </div>
              <div class="card-info-container">
              <button button-modal-target ="#modal">More info</button>
                  <h3 id="name" class="card-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                 <p class="card-text">${data.email}</p>
                   <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
               </div>
          </div>`;

    gallery.insertAdjacentHTML("beforeEnd", galleryDiv);
  }

//This will create the modal and implement the data of the user.
  function populateModal(data){
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    gallery.appendChild(modal);
    
    const modalDiv = `
    <div class="modal-container">
            <div class="modal">
                 <!-- Using '&times;' instead of 'x' so it wont scale up depending of the size of the window. -->
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>&times;</strong></button>
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
            </div>
            <div id="overlay"></div>;`

            modal.insertAdjacentHTML('beforeEnd', modalDiv);
            modal.style.display = 'none';
            


  }

  function openModal(modal){
    if(modal == null)return
    modal.classList.add('active');
    overlay.classList.add('active');
  }


  function closeModal(modal){
    if(modal == null)return
    modal.classList.remove('active');
    overlay.classList.add('active');
  }

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//This eventlistner should close the modal and set the overlay back to normale state.
  document.addEventListener('click', () => {
     const modals = document.querySelectorAll('.modal.active')
     modals.forEach(modal =>{
     closeModal(modal);
   })
  })
  
  //this EL will listnen for the button "More info" and open the modal.
  openModalButtons.forEach(button =>{
    button.addEventListener('click',() =>{
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    })
  })

  //this should close the Modal
  closeModalButtons.forEach(button =>{
    button.addEventListener('click',() =>{
      const modal = button.closest('.modal');
      closeModal(modal);
    })
  })

  // This EL is desperation on trying to findout where i fuckup!hahah
  document.addEventListener('click', () => {
    
    if(Event.currentTarget == "More info"){
      button.addEventListener('click',() =>{
        console.log('im being clicked');
      })
      
    }else{
      console.log(Event.currentTarget);
    }
    
  })
// ------------------------------------------
//  POST DATA
// ------------------------------------------