/* ============================================
   THARUN RAMINI PORTFOLIO - script.js
   ============================================ */

/* ── 1. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => revealObserver.observe(el));

/* ── 2. SKILL BARS ANIMATION ── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-fill")
          .forEach((bar) => bar.classList.add("animate"));
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);
document
  .querySelectorAll("#skillBars")
  .forEach((el) => barObserver.observe(el));

/* ── 3. HAMBURGER / MOBILE MENU ── */
const ham = document.getElementById("ham");
const menu = document.getElementById("mobileMenu");

ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  menu.classList.toggle("open");
});

function closeMobile() {
  ham.classList.remove("open");
  menu.classList.remove("open");
}

/* ── 4. PHOTO UPLOAD ── */
document.getElementById("photoUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  /* Hero photo */
  document.getElementById("photoPlaceholder").style.display = "none";
  const heroImg = document.getElementById("heroPhoto");
  heroImg.src = url;
  heroImg.style.display = "block";

  /* About section photo */
  const aboutImg = document.getElementById("aboutPhoto");
  aboutImg.src = url;
  aboutImg.style.display = "block";
  document.getElementById("aboutInitials").style.display = "none";
});

/* ── 5. SKILL CATEGORY TABS ── */
document.querySelectorAll(".skill-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    /* Toggle active state */
    document
      .querySelectorAll(".skill-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const cat = tab.dataset.tab;

    /* Filter skill bars */
    document.querySelectorAll(".skill-bar-item").forEach((item) => {
      item.style.display =
        cat === "all" || item.dataset.cat === cat ? "block" : "none";
    });

    /* Filter chip categories */
    document.querySelectorAll(".skill-category-block").forEach((block) => {
      block.style.display =
        cat === "all" || block.dataset.cat === cat || !block.dataset.cat
          ? "block"
          : "none";
    });
  });
});

/* ── 6. TYPED TEXT ANIMATION ── */
const roles = [
  "Django · React · MySQL",
  "Python · NLP · n8n",
  "Full Stack · AI · APIs",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeEffect() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    /* Typing forward */
    typedEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800); /* Pause before deleting */
      return;
    }
  } else {
    /* Deleting */
    typedEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

/* Start typing after a short delay on page load */
setTimeout(typeEffect, 1200);
