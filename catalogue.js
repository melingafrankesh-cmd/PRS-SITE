// Données du catalogue (modifie, ajoute ou supprime des produits ici)
const produits = [
  { nom: "Ordinateur portable 15\"", categorie: "Ordinateurs", etat: "Neuf", icone: "💻", desc: "Processeur récent, 16 Go de RAM, SSD 512 Go." },
  { nom: "Ordinateur portable étudiant", categorie: "Ordinateurs", etat: "Reconditionné", icone: "💻", desc: "Idéal pour la programmation et les cours." },
  { nom: "PC de bureau", categorie: "Ordinateurs", etat: "Neuf", icone: "🖥️", desc: "Unité centrale performante pour le travail et le développement." },
  { nom: "Serveur rack", categorie: "Ordinateurs", etat: "Reconditionné", icone: "🗄️", desc: "Serveur pour PME, stockage et virtualisation." },
  { nom: "Barrette de RAM DDR4", categorie: "Composants", etat: "Neuf", icone: "🧠", desc: "8 ou 16 Go, compatibles PC portables et fixes." },
  { nom: "Disque SSD", categorie: "Composants", etat: "Neuf", icone: "💾", desc: "Démarrage et transferts ultra rapides, 256 Go à 1 To." },
  { nom: "Carte graphique", categorie: "Composants", etat: "Reconditionné", icone: "🎮", desc: "Pour le graphisme, la 3D et le calcul." },
  { nom: "Écran Full HD 24\"", categorie: "Périphériques", etat: "Neuf", icone: "🖵", desc: "Dalle IPS, confortable pour de longues sessions de code." },
  { nom: "Clavier et souris", categorie: "Périphériques", etat: "Neuf", icone: "⌨️", desc: "Ensemble sans fil ergonomique." },
  { nom: "Imprimante multifonction", categorie: "Périphériques", etat: "Neuf", icone: "🖨️", desc: "Impression, scan et copie, Wi-Fi intégré." },
  { nom: "Routeur Wi-Fi 6", categorie: "Réseau", etat: "Neuf", icone: "📡", desc: "Couverture large et connexion stable." },
  { nom: "Switch 8 ports", categorie: "Réseau", etat: "Neuf", icone: "🔌", desc: "Extension de réseau local pour bureau ou salle de TP." }
];

const grille = document.getElementById('grille');
const compteur = document.getElementById('compteur');
const vide = document.getElementById('vide');
const recherche = document.getElementById('recherche');
const boutons = document.querySelectorAll('.filter-btn');

let categorieActive = 'Tous';

function afficher() {
  const terme = recherche.value.trim().toLowerCase();

  const liste = produits.filter(p =>
    (categorieActive === 'Tous' || p.categorie === categorieActive) &&
    (p.nom.toLowerCase().includes(terme) || p.desc.toLowerCase().includes(terme))
  );

  grille.innerHTML = liste.map(p => `
    <article class="card product">
      <div class="thumb">${p.icone}</div>
      <span class="badge ${p.etat === 'Neuf' ? '' : 'reco'}">${p.etat}</span>
      <p class="cat">${p.categorie}</p>
      <h3>${p.nom}</h3>
      <p>${p.desc}</p>
      <a class="btn btn-small" href="contact.html?produit=${encodeURIComponent(p.nom)}">Demander un devis</a>
    </article>
  `).join('');

  compteur.textContent = liste.length + (liste.length > 1 ? ' produits' : ' produit');
  vide.style.display = liste.length === 0 ? 'block' : 'none';
}

boutons.forEach(btn => {
  btn.addEventListener('click', () => {
    boutons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    categorieActive = btn.dataset.cat;
    afficher();
  });
});

recherche.addEventListener('input', afficher);

afficher();
