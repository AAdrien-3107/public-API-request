const gallery = document.getElementById("gallery");
const cards = document.getElementsByClassName("card");
const bodyDiv = document.getElementById("gallery");
const overlayDiv = document.createElement("div");
const overlayRemove = document.querySelectorAll('overlay');


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
        const users = data.results;
        users.forEach((user) => {
            populateGallery(user);
            populateModal(user);
        });
        listnerHandler();
        impSearchBar();
      
    })
    .catch((error) => console.log("Looks like there was a problem!", error));
}

//This represent the data that we are trying to retreive.
//Could implement the amount of users to display per page and they nationality or more.
fetchData("https://randomuser.me/api/?results=12&nat=us");

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
  const galleryDiv = `<div id=${data.email} class="card">        
              <div class="card-img-container">
                   <img class="card-img" src=${data.picture.large} alt="profile picture">
              </div>
              <div class="card-info-container">
                    <button button-modal-target ="#modal" id="moreInfo">More info</button>
                    <h3 id="name" class="card-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                    <p class="card-text">${data.email}</p>
                    <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
               </div>
          </div>`;

  gallery.insertAdjacentHTML("beforeEnd", galleryDiv);

}

//This will create the modal and implement the data of the user.
//Previous and mext button will allow the user to either move to the previous user on the page or the next one.
function populateModal(data) {
  const modal = document.createElement("div");
  modal.className = "modal-container";
  const dobRaw = data.dob.date;
  const timestampRegEx = /\T(.*)$/
  const dateRegEx = /^(\d{4})-(\d{2})-(\d{2})*/
  const dobFormatted = dobRaw.replace(timestampRegEx, '').replace(dateRegEx, '$2/$3/$1');

  gallery.appendChild(modal);

  const modalDiv =
             `<div class="modal" id="${data.email}" >
                <!-- Using '&times;' instead of 'x' so it wont scale up depending of the size of the window. -->
                <button data-close-button type="button" id="modal-close-btn" class="modal-close-btn"><strong>&times;</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large}">
                    <h3 id="name" class="modal-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${dobFormatted}</p>
              </div>
              <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>
                 `;

  modal.insertAdjacentHTML("beforeEnd", modalDiv);
  modal.style.display = "none";
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------


//This function opens a modal with a parameter of the only active modal.
//an overlay is being generated to dim the background.
function openModal(activeModal) {

  const parentModal = activeModal.parentNode;
  console.log("open modal functiong = activemodal = "+ activeModal.id);
  console.log("the parent node of the activeModal is " + activeModal.parentNode);

  if(!document.querySelector('.modal.active')){
    gallery.parentNode.appendChild(overlayDiv);
    gallery.parentNode.insertBefore(gallery.parentNode.appendChild(overlayDiv), gallery);
    if(overlayDiv.style.display === 'none'){
      overlayDiv.className='overlay';
      overlayDiv.style.display = "block";
    }else{
      overlayDiv.classList.add("overlay");
    }
    
    if (activeModal == null) return;
      activeModal.classList.add("active");
      parentModal.style.display = "block";
    }else {
      closeModal(document.querySelector('.modal.active'));
      openModal(activeModal);
    }
  
}
//This function close the modal and reset some of the parameters.
function closeModal(activeModal) {
  const modalActivated = document.querySelector('.modal.active');
 
  if (activeModal == null) return;
  modalActivated.classList.remove("active");
  gallery.previousSibling.style.display = "none";
  modalActivated.parentNode.style.display="none";

}

//This function helps the open and close function to open the right card with the id in common.
function selectMatchModal() {
  
  const modalContainers = document.querySelectorAll(".modal");
  //Forloop to go through the list of cards we have and checks which one is semilar to the id of the one being clicked.
  for (i = 0; i <= modalContainers.length; i++) {
    if (modalContainers[i].id === event.target.parentNode.parentNode.id) {
      const activeModal = modalContainers[i];
      console.log(modalContainers[i].id + " Matches this : " + event.target.parentNode.parentNode.id);
    return activeModal;
    }  
  }
}
//This function implement the search bar to the website.
//only working with US Alphabet
function impSearchBar() {
  const searchBarDiv = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
     </form>`;

  const searchDiv = document.querySelector('.search-container');
  searchDiv.insertAdjacentHTML('beforeEnd', searchBarDiv);

  const searchInput = document.getElementById('search-input');

  searchDiv.addEventListener('keyup', (event) => {
    event.preventDefault();
    const input = searchInput.value.toLowerCase();

    for(let i = 0; i < cards.length; i++) {
      const userName = cards[i].id.replace(/-/, ' ').toLowerCase();
      if(userName.includes(input)) {
        cards[i].style.display = '';
      } else if (userName.includes(input) === false) {
        cards[i].style.display = 'none';
      } else {
        cards[i].style.display = '';
      }
    }
  })
}

//This will handle all the event handler for all the button.

function listnerHandler() {
  const divCard = document.querySelectorAll(".card");
  const closeModalBtn = document.querySelectorAll(".modal-close-btn");
  const modalContainerBtn = document.querySelectorAll(".modal-btn-container");
  const userModal = document.querySelectorAll(".modal");

  divCard.forEach((button) => {
    button.addEventListener("click", () => {
      if (event.target.id === "moreInfo") {
        openModal(selectMatchModal());
      }
    });
  });


  closeModalBtn.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(selectMatchModal);
    });
  });

  //Forloop to check all the value in the array and see which one matches and minus one index to get the previous user in the list.
  modalContainerBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (event.target.id === "modal-next") {
        for (i = 0; i <= userModal.length; i++) {
          let modalActivated = document.querySelector(".modal.active").id;
          if (modalActivated === userModal[i].id) {
            if (i === 11) {
              alert(`There are no other user after.`);
            } else {
              let nextUserId = userModal[i += 1];      
              closeModal(userModal);
              openModal(nextUserId);
            }
          } 
        }
      } 
    });
  });

//this does the same as the previous btn EL but adds +1 to the index to get the next user in the list.
  modalContainerBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (event.target.id === "modal-prev") {
        for (i = 0; i <= userModal.length; i++) {
          let modalActivated = document.querySelector(".modal.active").id;
          if (modalActivated === userModal[i].id) {
            if (i === 0) {
              alert(`There are no other user before.`);
            } else {
              let modalContainerBtnId = userModal[i - 1];
              closeModal(userModal);
              openModal(modalContainerBtnId);
            }
          } 
        }
      }
    });
  });
}