document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".icon-menu")) {
    document.body.classList.toggle("menu-open");
  }
  if (targetElement.closest("[data-spoller]")) {
    const currentElement = targetElement.closest("[data-spoller]");
    if (!currentElement.nextElementSibling.classList.contains("--sliding")) {
      currentElement.classList.toggle("active");
    }
    slideToggle(currentElement.nextElementSibling);
  }
}

const spollers = document.querySelectorAll("[data-spoller]");

if (spollers.length) {
  spollers.forEach((spoller) => {
    spoller.nextElementSibling.hidden = true;
  });
}

let slideDown = (target, duration = 500) => {
  if (!target.classList.contains("--sliding")) {
    target.classList.add("--sliding");
    target.hidden = false;
    let height = target.offsetHeight;

    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    target.style.overflow = "hidden";
    target.style.height = 0;

    target.offsetHeight;

    target.style.transitionProperty = `height, margin, padding`;
    target.style.transitionDuration = `${duration}ms`;

    target.style.height = `${height}px`;

    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("margin-top");

    setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--sliding");
    }, duration);
  }
};
let slideUp = (target, duration = 500) => {
  if (!target.classList.contains("--sliding")) {
    target.classList.add("--sliding");
    let height = target.offsetHeight;

    target.style.transitionProperty = `height, margin, padding`;
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;

    target.offsetHeight;

    target.style.overflow = "hidden";
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    target.style.height = 0;

    setTimeout(() => {
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("margin-top");

      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("--sliding");

      target.hidden = true;
    }, duration);
  }
};
let slideToggle = (target, duration = 500) => {
  target.hidden ? slideDown(target, duration) : slideUp(target, duration);
};

// Hero slider

const heroSlider = document.querySelector(".hero");
if (heroSlider) {
  new Swiper(".hero", {
    // Optional parameters
    loop: true,
    autoHeight: true,
    speed: 800,
    parallax: true,

    // If we need pagination
    pagination: {
      el: ".hero__pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".hero__arrow--next",
      prevEl: ".hero__arrow--prev",
    },
  });
}

// New slider

const newSlider = document.querySelector(".new");
if (newSlider) {
  new Swiper(".new__slider", {
    // Optional parameters
    loop: true,
    autoHeight: true,
    speed: 800,
    spaceBetween: 38,
    slidesPerView: 4,
    // Navigation arrows
    navigation: {
      nextEl: ".new__arrow--right",
      prevEl: ".new__arrow--left",
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      // when window width is >= 320px
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // when window width is >= 480px
      650: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      // when window width is >= 640px
      991: {
        slidesPerView: 4,
        spaceBetween: 38,
      },
    },
  });
}

// Feedback slider

const feedbackSlider = document.querySelector(".feedback");
if (feedbackSlider) {
  new Swiper(".feedback__slider", {
    // Optional parameters
    loop: true,
    // autoHeight: true,
    speed: 800,
    spaceBetween: 23,
    slidesPerView: 3,
    // If we need pagination
    pagination: {
      el: ".feedback__pagination",
      clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 23,
      },
    },
  });
}

/* rating */
document.addEventListener("DOMContentLoaded", () => {
  const ratings = document.querySelectorAll(".rating");

  ratings.forEach((root) => {
    const group = root.querySelector(".rating__group");
    const inputs = root.querySelectorAll(".rating__input");
    const output = root.querySelector(".rating__value");
    const storageKey = root.dataset.storageKey;
    const initial = Number(root.dataset.initial || 0);

    // 1) Відновити значення з localStorage (пріоритетніше за data-initial)
    let saved = null;
    if (storageKey) {
      try {
        saved = Number(localStorage.getItem(storageKey));
      } catch {
        /* ignore */
      }
    }

    const setValue = (val) => {
      // Позначити потрібний input як checked
      const target = [...inputs].find((i) => Number(i.value) === Number(val));
      if (target) target.checked = true;

      // Оновити output
      if (output) output.value = String(val);

      // Зберегти
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(val));
        } catch {
          /* ignore */
        }
      }

      // Кастомна подія (можеш ловити її зовні)
      root.dispatchEvent(
        new CustomEvent("rating:change", {
          bubbles: true,
          detail: { value: Number(val) },
        })
      );
    };

    // 2) Початкове значення
    const startVal = saved || initial || 0;
    if (startVal) setValue(startVal);
    else if (output) output.value = "0";

    // 3) Слухачі змін
    group.addEventListener("change", (e) => {
      const val = e.target?.value;
      if (val) setValue(val);
    });
  });
});
