const gallery = document.getElementById("gallery");
const cards = document.getElementsByClassName("card");
const openModalButtons = document.querySelectorAll("[button-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const bodyDiv = document.getElementById("gallery");
const overlayDiv = document.createElement("div");

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
  const galleryDiv =         
          `<div id=${data.email} class="card">        
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
  //modal.id = `${data.email}`;
  
  gallery.appendChild(modal);

  const modalDiv = 
              `<div class="modal" id="${data.email}" onclick="reply_click(this.id)">
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


function reply_click(clicked_id)
{
    return console.log(clicked_id);
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//This eventlistner should close the modal and set the overlay back to normale state.

//this EL will listnen for the button "More info" and open the modal.

function openModal(modal) {
 
  const parentModal = modal.parentNode;

    bodyDiv.parentNode.appendChild(overlayDiv);
    bodyDiv.parentNode.insertBefore(bodyDiv.parentNode.appendChild(overlayDiv),bodyDiv);
    
    overlayDiv.classList.add("overlay");

    if (modal == null) return;
      modal.classList.add("active");
      parentModal.style.display = "";

}

function closeModal(modal) {
  console.log("i am in the close modal ");
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.add("active");
  modal.style.display = "none";
}
function selectMatchModal(){
  const modalContainers = document.querySelectorAll(".modal-container");
  for(ru = 0;ru<= modalContainers.length; ru++){
    console.log(modalContainers[ru]);
  }


}
function listnerHandler() {
  const divCard = document.querySelectorAll(".card");
  const modal = document.querySelector("div.modal");
  const closeModalBtn = document.querySelectorAll('.modal.active');
  const modalActive = divCard.firstChild;
  selectMatchModal();

  divCard.forEach((button) => {
    button.addEventListener("onclick", () => {
    
     
    });
  });
  //console.log(modalActive.firstChild.nodeName);
  //need to get the modal.active and to just remove the active
  closeModalBtn.forEach((button) => {
    button.addEventListener("click", () =>{
      
      console.log("x is pressed");
      closeModal(modal);
    })
  });
}

// ------------------------------------------
//  POST DATA
// ------------------------------------------
