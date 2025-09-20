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
    spoller.dataset.spoller !== "open"
      ? (spoller.nextElementSibling.hidden = true)
      : spoller.classList.add("active");
  });
  // Filter;
  const filterTitle = document.querySelector(".filter__title");
  if (filterTitle) {
    //window.addEventListener('resize', someFunc);
    const breakPointValue = filterTitle.dataset.spollerMedia;
    const breakPoint = breakPointValue
      ? `(${breakPointValue.split(",")[0]}-width:${
          breakPointValue.split(",")[1]
        }px)`
      : null;
    if (breakPoint) {
      const matchMedia = window.matchMedia(breakPoint);
      matchMedia.addEventListener("change", (e) => {
        const isTrue = e.matches;
        if (isTrue) {
          slideUp(filterTitle.nextElementSibling);
          filterTitle.classList.remove("active");
        } else {
          slideDown(filterTitle.nextElementSibling);
          filterTitle.classList.add("active");
        }
      });
    }
  }
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

// Presentation-card slider
const presentationCardGallery = document.querySelector(
  ".presentation-card__gallery"
);

if (presentationCardGallery) {
  const thumbsSwiper = new Swiper(".presentation-card__thumbs", {
    // loop: true,
    direction: "vertical",

    spaceBetween: 22,
    slidesPerView: 3,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper(".presentation-card__main", {
    loop: true,
    navigation: {
      nextEl: ".presentation-card__arrow--next",
      prevEl: ".presentation-card__arrow--prev",
    },
    speed: 800,
    spaceBetween: 0,
    slidesPerView: 1,

    thumbs: {
      swiper: thumbsSwiper,
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

// noUiSlider
const filterRange = document.querySelector(".price-filter__range");

if (filterRange) {
  const filterRangeFrom = document.querySelector(".price-filter__input--from");
  const filterRangeTo = document.querySelector(".price-filter__input--to");
  noUiSlider.create(filterRange, {
    start: [0, 100],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
    format: wNumb({
      decimals: 3,
      thousand: ".",
      prefix: "$",
    }),
  });

  filterRange.noUiSlider.on("update", function (values, handle) {
    filterRangeFrom.value = values[0];
    filterRangeTo.value = values[1];
  });

  filterRangeFrom;
  addEventListener("change", function () {
    filterRange.noUiSlider.setHandle(0, filterRangeFrom.value);
  });
  filterRangeTo.addEventListener("change", function () {
    filterRange.noUiSlider.setHandle(1, filterRangeTo.value);
  });
}

// Catalog
const catalogItems = document.querySelector(".items-js");
if (catalogItems) {
  loadProducts();
}

async function loadProducts() {
  try {
    const response = await fetch("./json/products.json");
    if (!response.ok) {
      throw new Error("Failed to load products");
    }
    const products = await response.json();
    initProducts(products);
  } catch (error) {
    console.error(error);
    alert("Error loading products!");
  }
}

function initProducts(products) {
  products.forEach((product) => {
    const productHTML = `
    <div class="item-product" id = "${product.id}">
          <a href="#" class="item-product__favorite _icon-favorite"></a>
          <a href="${product.link}" class="item-product__picture-link">
            <img src="${product.image.src}" alt="${product.image.alt}" class="item-product__image">
          </a>
          <div class="item-product__body">
            <div class="item-product__right-wrap">
              <h3 class="item-product__title">
                <a href="${product.link}" class="item-product__link-title">${product.title}</a>
              </h3>
              <div class="item-product__text">
                ${product.brand}
              </div>

            </div>
            <div class="item-product__left-wrap">
              <div class="item-product__price">${product.price}</div>
            </div>
          </div>
        </div>
    `;

    catalogItems.insertAdjacentHTML("beforeend", productHTML);
  });
}
