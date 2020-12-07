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
      
    })

    .catch((error) => console.log("Looks like there was a problem!", error));
}
//Could implement the number of user to display per page.
fetchData("https://randomuser.me/api/?results=12");

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
              <button button-modal-target ="#modal">More info</button>
                  <h3 id="name" class="card-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                 <p class="card-text">${data.email}</p>
                   <p class="card-text cap">${data.location.city}, ${data.location.country}</p>
               </div>
          </div>`;

  gallery.insertAdjacentHTML("beforeEnd", galleryDiv);
}

//This will create the modal and implement the data of the user.
function populateModal(data) {
  const modal = document.createElement("div");
  modal.className = "modal-container";

  gallery.appendChild(modal);

  const modalDiv = `<div class="modal" id="${data.email}" >
                 <!-- Using '&times;' instead of 'x' so it wont scale up depending of the size of the window. -->
                <button data-close-button type="button" id="modal-close-btn" class="modal-close-btn"><strong>&times;</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large}">
                    <h3 id="name" class="modal-name cap">${data.name.title} ${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">${data.location.street}, ${data.location.city}, ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${data.dob.date}</p>
              </div>
                 `;

  modal.insertAdjacentHTML("beforeEnd", modalDiv);
  modal.style.display = "none";
}

function reply_click(clicked_id) {
  let consoleClick = console.log(clicked_id);
  return consoleClick;
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//This eventlistner should close the modal and set the overlay back to normale state.

//this EL will listnen for the button "More info" and open the modal.

function openModal(activeModal) {

  const parentModal = activeModal.parentNode;
  console.log("open modal functiong = activemodal = "+ activeModal.id);
  console.log("the parent node of the activeModal is " + activeModal.parentNode);

  if(!document.querySelector('.modal.active')){
    bodyDiv.parentNode.appendChild(overlayDiv);
    bodyDiv.parentNode.insertBefore(
      bodyDiv.parentNode.appendChild(overlayDiv),
      bodyDiv
    );
    if( overlayDiv.style.display === 'none'){
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

function closeModal(activeModal) {
  const modalActivated = document.querySelector('.modal.active');
  
  
  console.log("i am in the close modal " + modalActivated);
 
  if (activeModal == null) return;
  //document.querySelectorAll(`${activeModal.id}`).classList('modal');
  modalActivated.classList.remove("active");
  gallery.previousSibling.style.display = "none";

  modalActivated.parentNode.style.display="none";

  // THIS IS ONLY MISSING TO CLOSE THE MODAL CONTAINER STYLE . DISPLAY = NONE
  //activeModal.style.display = "";
  //parentModal.style.display = "";
 //this.parentModal.classList.remove('overlay');
 //this.parentModal.classList.add('active');

}
function selectMatchModal() {
  
  const modalContainers = document.querySelectorAll(".modal");

  for (i = 0; i <= modalContainers.length; i++) {
    console.log(modalContainers[i]);
    if (modalContainers[i].id === event.target.parentNode.parentNode.id) {
      const activeModal = modalContainers[i];
      console.log(modalContainers[i].id + " Matches this : " + event.target.parentNode.parentNode.id);
    return activeModal;
}
  }
}

function listnerHandler(activeModal) {
  const divCard = document.querySelectorAll(".card");
  const closeModalBtn = document.querySelectorAll(".modal-container");
  
  divCard.forEach((button) => {
    button.addEventListener("click", ()=>{
      selectMatchModal();
      openModal(selectMatchModal());
    }/*() => {
      const modalContainers = document.querySelectorAll(".modal");

      for (i = 0; i <= modalContainers.length; i++) {
        console.log(modalContainers[i]);
        if (modalContainers[i].id === event.target.parentNode.parentNode.id) {
          activeModal = modalContainers[i];
          console.log(
            modalContainers[i].id +
              "Matches this : " +
              event.target.parentNode.parentNode.id
          );
          openModal(activeModal);
        }
      }
    }*/);
  });

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("x is pressed");
      closeModal(selectMatchModal);
    });
  });
}

// ------------------------------------------
//  POST DATA
// ------------------------------------------
//Need to make a function to replace the previous modal if a new one is being open : check
//Need to make sure the modal that has been open is in the midle.
//need to fix the search bar.
// need to fix the error handler on line 140 
// need to add the previous and next user.
//neeed to fix the modal objec object and the date
//