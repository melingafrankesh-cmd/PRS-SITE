// ⚠️ À MODIFIER : l'adresse e-mail qui recevra les messages
const EMAIL_PRS = "contact@prs.com";

const form = document.getElementById('contact-form');
const succes = document.getElementById('succes');

// Préremplissage depuis le catalogue (contact.html?produit=...)
const produit = new URLSearchParams(window.location.search).get('produit');
if (produit) {
  document.getElementById('sujet').value = 'Vente';
  document.getElementById('message').value = 'Bonjour, je souhaite un devis pour : ' + produit + '.';
}

// Règles de validation : retourne un message d'erreur, ou '' si le champ est valide
const regles = {
  nom: v => v.trim().length < 2 ? "Entrez votre nom (2 caractères minimum)." : "",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Entrez une adresse e-mail valide.",
  telephone: v => v.trim() === "" || /^[+\d\s().-]{6,}$/.test(v.trim()) ? "" : "Numéro de téléphone invalide.",
  sujet: v => v === "" ? "Choisissez un sujet." : "",
  message: v => v.trim().length < 10 ? "Votre message est trop court (10 caractères minimum)." : ""
};

function verifier(champ) {
  const erreur = regles[champ.name](champ.value);
  const bloc = champ.closest('.field');
  bloc.classList.toggle('invalid', erreur !== "");
  bloc.querySelector('.error').textContent = erreur;
  return erreur === "";
}

const champs = form.querySelectorAll('input, select, textarea');
champs.forEach(c => c.addEventListener('blur', () => verifier(c)));

form.addEventListener('submit', e => {
  e.preventDefault();
  let valide = true;
  champs.forEach(c => { if (!verifier(c)) valide = false; });
  if (!valide) return;

  // Ouvre le logiciel de messagerie avec le message prérempli
  const d = new FormData(form);
  const corps =
    "Nom : " + d.get('nom') + "\n" +
    "E-mail : " + d.get('email') + "\n" +
    "Téléphone : " + (d.get('telephone') || "non renseigné") + "\n\n" +
    d.get('message');

  window.location.href = "mailto:" + EMAIL_PRS +
    "?subject=" + encodeURIComponent("[Site PRS] " + d.get('sujet')) +
    "&body=" + encodeURIComponent(corps);

  succes.style.display = 'block';
  form.reset();
});
