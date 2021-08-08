const hiddenMenu = document.querySelector(".hidden-menu-container");
const hiddenMenuLinks = document.querySelector(".hidden-menu");

const menuIcon = document.querySelector(".nav-icon");
const menuCloseIcon = document.querySelector(".menu-close-icon");
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");

const sections = document.querySelectorAll(".section");
const navLi = document.querySelectorAll(".nav-links");

const getStartedBtn = document.querySelectorAll(".get-started-btn");

const toTopBtn = document.querySelector(".to-top-btn");

const countsNum = document.querySelectorAll(".counts-num");

const futureTabsNav = document.querySelector(".future-tabs-nav");
const futureTabsBtn = document.querySelectorAll(".future-tabs-btn");
const futureTabsText = document.querySelectorAll(".future-tabs-texts");

const faqQuestionContent = document.querySelectorAll(".faq-texts-content");
const faqQuestion = document.querySelectorAll(".faq-question");
const faqAnswers = document.querySelectorAll(".faq-answer");

const portfolioBoxs = document.querySelectorAll(".portfolio-box");
const portfolioLinks = document.querySelectorAll(".portfolio-link");

// !  hidden menu

const openHidden = function (el) {
  el.classList.remove("hidden");
};
const closeHidden = function (el) {
  el.classList.add("hidden");
};

menuIcon.addEventListener("click", function () {
  openHidden(hiddenMenu);
});
menuCloseIcon.addEventListener("click", function () {
  closeHidden(hiddenMenu);
});

// ! menu links activating on scroll

window.addEventListener("scroll", () => {
  let current;
  let end;
  sections.forEach((section) => {
    const sectionHeight = section.clientHeight;
    const sectionTop = section.offsetTop;
    const sectionBottom = section.offsetBottom;

    end = section.offsetBottom;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    const href = li.getAttribute("href");
    li.classList.remove("active");
    if (li.href.includes(current)) {
      li.classList.add("active");
    }
  });
});

// !  observers
// * menu  background
const whiteMenu = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navbar.classList.add("white");
  } else {
    navbar.classList.remove("white");
  }
};
const menuObserver = new IntersectionObserver(whiteMenu, {
  root: null,
  threshold: 0,
  rootMargin: "-195px",
});
menuObserver.observe(document.querySelector(".header-tittle"));

// * to top

const toTopActive = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
};
const toTopObserver = new IntersectionObserver(toTopActive, {
  root: null,
  threshold: 0,
  rootMargin: "-195px",
});
toTopObserver.observe(document.querySelector(".header-tittle"));

// * counts box number

for (const num of countsNum) {
  const numData = Number(num.dataset.num);
  let startNum = (num.textContent = numData - 50);
  if (startNum < 0) startNum = 0;
  const numPlusFunc = function () {
    if (startNum !== numData) {
      startNum += 1;
      num.textContent = startNum;
    }
  };

  const numPlusActivate = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      const setNumPlus = setInterval(numPlusFunc, 50);
    }
  };
  const toTopObserver = new IntersectionObserver(numPlusActivate, {
    root: null,
    threshold: 0,
    rootMargin: "100px",
  });
  toTopObserver.observe(document.querySelector(".counts"));
}

// ! scroll into veuw

// * menu

navMenu.addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
});

// * hidden menu

hiddenMenuLinks.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".nav-links");
  if (!clicked) return;
  hiddenMenu.classList.add("hidden");
  const id = clicked.getAttribute("href");
  document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
});

// * get started

for (const btn of getStartedBtn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
  });
}

// * to top

toTopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#header").scrollIntoView({ behavior: "smooth" });
});

// ! future tabs

futureTabsNav.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".future-tabs-btn");
  if (!clicked) return;
  futureTabsBtn.forEach((t) => t.classList.remove("future-tabs-btn-active"));
  futureTabsText.forEach((c) => c.classList.remove("future-tabs-active"));
  clicked.classList.add("future-tabs-btn-active");
  document
    .querySelector(`.future-tabs-texts-${clicked.dataset.tab}`)
    .classList.add("future-tabs-active");
});

// ! faq questinon open

faqQuestionContent.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".faq-question");
    const faqAnswer = clicked.nextElementSibling;
    if (!clicked) return;
    faqAnswers.forEach((item) => {
      item.classList.add("hidden-answer");
    });
    faqQuestion.forEach((item) => {
      item.classList.remove("faq-question-active");
    });
    clicked.classList.add("faq-question-active");
    faqAnswer.classList.remove("hidden-answer");
  });
});

// ! portfolio sorting

portfolioLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".portfolio-link");
    if (!clicked) return;
    document
      .querySelectorAll(".portfolio-link")
      .forEach((item) => item.classList.remove("active"));
    console.log(clicked);
    clicked.classList.add("active");
    portfolioBoxs.forEach((item) => {
      if (item.dataset.type.includes(link.textContent)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ! testimonal slider

new Swiper(".testimonals-slider-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1,
  breakpoints: {
    // when window width is >= 991px
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  loop: true,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  speed: 1000,
});

// ! our counts slider

new Swiper(".our-clients-slider-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 6,
      // spaceBetween: 20
    },
    480: {
      slidesPerView: 4,
      // spaceBetween: 20
    },
  
    // when window width is >= 991px
    320: {
      slidesPerView: 3,
      // spaceBetween: 20
    },
  },
  loop: true,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  speed: 1000,
});
