import { decks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js"; 
import { stringToHex, hexToString, removeColorClasses } from "./colors.js"

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");
const mainContent = document.querySelector(`.page__main-content`)

function createDeckEl(deck) {
    const cloneEl = deckTemplate.content.firstElementChild.cloneNode(true);

    const deckLink = cloneEl.querySelector(".deck__link");
    const deleteButton = cloneEl.querySelector(".deck__delete-btn");

    deckLink.href = `#carousel/${deck.id}`;
    cloneEl.querySelector(".deck__title").textContent = deck.name;
    cloneEl.querySelector(".deck__count").textContent = `${deck.cards.length} Cards`;
    
    removeColorClasses (cloneEl);

    const color = hexToString(deck.color);
    cloneEl.classList.add(`deck_color_${color}`);


    deleteButton.addEventListener("click", () => {
        cloneEl.remove();
    });

    return cloneEl;
}

function renderDeckEl(deck) {
    const deckEl = createDeckEl(deck);
    deckList.prepend(deckEl);
}

decks.forEach((deck) => {
    renderDeckEl(deck);
});

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#notfound");
const aboutSection = document.querySelector("#about");
const sections = [homeSection, carouselSection, notFoundSection, ];

function renderHomeView() {
    sections.forEach(function (section) {
        if (section === homeSection) {
            section.style.display ="block";
        } else {
            section.style.display = "none"
        }
    });
}

function renderNotFoundView() {
    sections.forEach(function (section) {
        if (section === notFoundSection) {
            section.style.display ="flex";
        } else {
            section.style.display = "none"
        }
    });
}

function renderAboutView() {
    sections.forEach(function (section) {
        if (section === aboutSection) {
            section.style.display ="flex";
        } else {
            section.style.display = "none"
        }
    });
}

function router() {
    const hash = window.location.hash.slice(1) || "home";
    mainContent.classList.remove("page__main-content_location_carousel");

    if (hash === "home" || hash === "") {
        renderHomeView();
  } else if (hash.startsWith ("carousel/")) {
    const deckId = hash.split("/")[1];
   const deck = getDeckByID(deckId);
    mainContent.classList.add("page__main-content_location_carousel");
    homeSection.style.display = "none";
    carouselSection.style.display = "flex";
    notFoundSection.style.display = "none";
    renderCarouselView(deck);
    } else if (hash === "about") {
        renderAboutView();
    } else {
        renderNotFoundView();
}
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
