/* ==========================================================================
   1. BOUTONS "VOIR PLUS"
   ========================================================================== */

document.querySelectorAll(".btn-voir-plus").forEach(function (bouton) {
  const cible = document.getElementById(bouton.getAttribute("aria-controls"));
  if (!cible) return;

  bouton.addEventListener("click", function () {
    const estOuvert = bouton.getAttribute("aria-expanded") === "true";

    bouton.setAttribute("aria-expanded", String(!estOuvert));
    cible.hidden = estOuvert;
    bouton.textContent = estOuvert ? "Voir plus" : "Voir moins";
  });
});

/* ==========================================================================
   2. FORMULAIRE DE CONTACT
   ========================================================================== */

const formulaire = document.querySelector(".contact-form");

if (formulaire) {
  const statut = formulaire.querySelector(".form-status");

  formulaire.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formulaire.checkValidity()) {
      formulaire.reportValidity();
      return;
    }

    const message = formulaire.querySelector("#message");
    if (message.value.trim() === "") {
      statut.textContent = "Merci d'écrire un message.";
      message.focus();
      return;
    }

    fetch(formulaire.action, {
      method: "POST",
      body: new FormData(formulaire),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          statut.textContent = "Merci ! Votre message a bien été envoyé.";
          formulaire.reset();
        } else {
          statut.textContent = "Une erreur est survenue, réessayez.";
        }
      })
      .catch(function () {
        statut.textContent = "Une erreur est survenue, réessayez.";
      });
  });
}

/* ==========================================================================
   3. MARQUEE : duplication automatique du contenu
   ========================================================================== */

window.addEventListener("load", function () {
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    const conteneur = track.parentElement;
    const originaux = Array.from(track.children);
    const largeurSet = track.scrollWidth;

    const copies = Math.max(1, Math.ceil(conteneur.offsetWidth / largeurSet));

    function cloner(elements) {
      elements.forEach(function (li) {
        const clone = li.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    for (let i = 1; i < copies; i++) cloner(originaux);
    cloner(Array.from(track.children));
  });
});

/* ==========================================================================
   4. FADE-IN AU SCROLL
   ========================================================================== */

const elementsAnimes = document.querySelectorAll(
  ".hero-top, .hero-bottom, section h2, section h3:first-of-type, " +
  ".apropos-text, .apropos-img, .projet-card, .timeline-item, " +
  ".contact-info, .contact-form, .pre-contact-buttons"
);

elementsAnimes.forEach(function (el) {
  el.classList.add("reveal");
});

document.querySelectorAll(".timeline-item").forEach(function (item, i) {
  item.style.setProperty("--delay", i * 0.15 + "s");
});

const imgApropos = document.querySelector(".apropos-img");
if (imgApropos) imgApropos.style.setProperty("--delay", "0.2s");

const observateur = new IntersectionObserver(
  function (entrees, obs) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add("is-visible");
        obs.unobserve(entree.target);
      }
    });
  },
  { threshold: 0.15 }
);

elementsAnimes.forEach(function (el) {
  observateur.observe(el);
});

/* ==========================================================================
   5. MENU BURGER MOBILE
   ========================================================================== */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const estOuvert = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!estOuvert));
    navMenu.classList.toggle("is-open");
  });

  navMenu.querySelectorAll("a").forEach(function (lien) {
    lien.addEventListener("click", function () {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}