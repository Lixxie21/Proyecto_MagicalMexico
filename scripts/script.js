console.log("Ingaturroña no sé");

//The first cards on the page (ignore the description)
const cards = [
    {
        name: "Mira",
        image: "images/mira.jpg",
        description: "Más traumas tendrá la prra"
    },
    {
        name: "Rumi",
        image: "images/rumi.jpg",
        description: "Entre más larga la trenza"
    },
    {
        name: "Zoey",
        image: "images/zoey.jpg",
        description: "Oye, Rumi, entonces ya kgaste"
    },
];

const buttonEdit = document.querySelector(".traveler-profile__edit-btn");
const modalEditProfile = document.querySelector("#modal-edit-profile");
const modalImageView = document.querySelector("#modal-image-view");
const ModalNewPlace = document.querySelector("#modal-new-place");
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const travelporfilebio = document.querySelector(".traveler-profile__bio");
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
const travelerProfilName = document.querySelector(".traveler-profile__name");
const placesGalleryList = document.querySelector(".places-gallery__list");
const porfileName = document.querySelector("#porfile-title");
const porfiledescription = document.querySelector("#porfile-description");

//Add new card
const createCard = (card) => {
    const templatePlaceCard =
        document.querySelector("#template-place-card")
            .content.cloneNode(true);

    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

    placeCardImage.src = card.image;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.toggle("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardImage.textContent;
    })
    
    //Deleta card
    const placeCardDeleteButton = templatePlaceCard.querySelector(
        ".place-card__delete-button"
    );

    placeCardDeleteButton.addEventListener("click", (evt) => {
        console.log(evt);
        evt.target.closest(".place-card").remove();
    });

    //Favorite card
    const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    placeCardLikeButton.addEventListener("click", () => {
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    })

    placesGalleryList.appendChild(templatePlaceCard);
}


travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
});

const modalClose = Array.from(document.querySelectorAll(".modal__close"));

console.log("Arreglo de modals: ", modalClose);

modalClose.forEach((modalClose) => {
    try {
        modalClose.addEventListener("click", (evt) => {
            let modal = evt.target.closest(".modal");
            modal.classList.toggle("modal_is-opened");
            //ModalNewPlace.classList.toggle("modal_is-opened");
            console.log(modal);
        });
    } catch (error) {
        console.log('a');
    }
});

const modalforms = Array.from(document.querySelectorAll(".modal__form"));

const validButton = (modalinputs) => {
    return modalinputs.some((InputElement) => {
        return InputElement.validity.valid;
    })
}

modalforms.forEach((modalform) => {
    const modalInputs = modalform.querySelectorAll(".modal__input");
    modalInputs.forEach((modalInput) => {
        modalInput.addEventListener("input", () => {
            const modalerror = modalform.querySelector('#' + modalInput.id + "-error")
            if (!modalInput.validity.valid) {
                modalerror.textContent = 'Error';
                modalerror.classList.add("modal__error_visible");
            } else {
                modalerror.textContent = '';
                modalerror.classList.remove("modal__error_visible");
            }
        })
    });
})

/*

const modalInputs = Array.from(document.querySelectorAll(".modal__input"));
modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
        const modalerror = document.querySelector('#'+modalInput.id+"-error")
        console.log(modalerror, '#'+modalInput.id+"-error");
        if(!modalInput.validity.valid){
            modalerror.textContent = 'Error';
            modalerror.classList.add("modal__error_visible");
        }else{
            modalerror.textContent = '';
            modalerror.classList.remove("modal__error_visible");
        }
    })
});

const modalClose = document.querySelector(".modal__close");

modalClose.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
});
*/

ModalNewPlace.addEventListener("submit", (evt) => {
    const tempCard = {}
    evt.preventDefault();
    const modalForm = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    modalInputs.forEach((modalInput) => {
        console.log(modalInput.value);
        tempCard[modalInput.name] = modalInput.value;
    });
    console.log(tempCard);
    createCard(tempCard);
});

cards.forEach((card) => {
    createCard(card);
});

buttonEdit.addEventListener("click", () => {
    porfileName.value = travelerProfilName.textContent;
    porfiledescription.value = travelporfilebio.textContent;
    modalEditProfile.classList.toggle("modal_is-opened");
});

modalEditProfile.addEventListener('submit', (event) => {
    event.preventDefault()
    travelerProfilName.innerHTML = porfileName.value;
    travelporfilebio.innerHTML = porfiledescription.value;
    modalEditProfile.classList.toggle("modal_is-opened");
});
