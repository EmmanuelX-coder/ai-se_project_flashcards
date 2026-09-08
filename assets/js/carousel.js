import { stringToHex, hexToString, removeColorClasses } from "./colors.js"

function renderCarouselView(deck) {
  let currentIndex = 0;
 let showingQuestion = true;


  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");
  const carouselCardText = carouselEl.querySelector(".carousel__card-text");
  const carouselCardEl = carouselEl.querySelector(".carousel__card");
  const carouselTitleCount =  carouselEl.querySelector(".carousel__title");

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    carouselTitleCount.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;

  removeColorClasses(carouselCardEl);

     if (showingQuestion) {
    carouselCardText.textContent = currentCard.question;

    const color = hexToString(deck.color);
    carouselCardEl.classList.add(`card__carousel_color_${color}`);
  } else {
    carouselCardText.textContent = currentCard.answer;
    carouselCardEl.classList.add("card__carousel_color_white");
  }

    updateArrows();
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      showingQuestion = true; 
      currentIndex++;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      showingQuestion = true;
      currentIndex--;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };