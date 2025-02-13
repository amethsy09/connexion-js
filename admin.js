
document.addEventListener("DOMContentLoaded", async function () {
  const ma = document.getElementById("ma");
  ma.textContent = "classe"
  await fetchEtudiants();
  const mi = document.getElementById("mi");
  mi.textContent = "prenom"
   

   document.getElementById('professorsLink').addEventListener('click',async function (e) {
    e.preventDefault();
    ma.textContent = "matieres"
    mi.textContent = "professeurs"
    await fetchProfessors();  // Charger la liste des professeurs
    document.getElementById('pageTitle').innerText = "Liste des professeurs"; // Changer le titre
  });
  document.getElementById('classesLink').addEventListener('click',async function (e) {
    e.preventDefault();
    ma.textContent = "filieres"
    mi.textContent = "niveaux"
    await fetchClasses();  // Charger la liste des professeurs
    document.getElementById('pageTitle').innerText = "Liste des classes"; // Changer le titre
  });

  });	

 // Fonction pour vider le tableau et afficher les étudiants
async function fetchEtudiants() {
  const response = await fetch("/data/data.json");
  const data = await response.json();
  const tbody = document.getElementById("tableBody");
  const pageTitle = document.getElementById("pageTitle");

  tbody.innerHTML = "";
  pageTitle.textContent = "Liste des étudiants";

  data.etudiants.forEach((etudiant) => {
    const row = `
      <tr class="text-left">
        <td class="px-4 py-2 border">${etudiant.nom}</td>
        <td class="px-4 py-2 border">${etudiant.prenom}</td>
        <td class="px-4 py-2 border">${etudiant.classe}</td>
        <td class="px-4 py-2 border">${etudiant.email}</td>
        <td class="px-4 py-2 border">${etudiant.telephone}</td>
        <td class="px-4 py-2 border text-center">⚙️ 🗑️</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Fonction pour afficher les professeurs
async function fetchProfessors() {
  const response = await fetch("/data/data.json");
  const data = await response.json();
  const tbody = document.getElementById("tableBody");
  const pageTitle = document.getElementById("pageTitle");

  tbody.innerHTML = "";
  pageTitle.textContent = "Liste des professeurs";

  data.professeurs.forEach((prof) => {
    const row = `
      <tr class="text-left">
        <td class="px-4 py-2 border">${prof.nom}</td>
        <td class="px-4 py-2 border">${prof.prenom}</td>
        <td class="px-4 py-2 border">${prof.matiere}</td>
        <td class="px-4 py-2 border">${prof.email}</td>
        <td class="px-4 py-2 border">${prof.telephone || "N/A"}</td>
        <td class="px-4 py-2 border text-center">⚙️ 🗑️</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Fonction pour afficher les classes
async function fetchClasses() {
  const response = await fetch("/data/data.json");
  const data = await response.json();
  const tbody = document.getElementById("tableBody");
  const pageTitle = document.getElementById("pageTitle");

  tbody.innerHTML = "";
  pageTitle.textContent = "Liste des classes";

  if (!data.classe) {
    tbody.innerHTML = `<tr><td class="text-center py-4" colspan="6">Aucune classe trouvée</td></tr>`;
    return;
  }

  data.classe.forEach((classe) => {
    const row = `
      <tr class="text-left">
        <td class="px-4 py-2 border">${classe.nom}</td>
        <td class="px-4 py-2 border">${classe.niveau}</td>
        <td class="px-4 py-2 border">${classe.filiere}</td>
        <td class="px-4 py-2 border">N/A</td>
        <td class="px-4 py-2 border">N/A</td>
        <td class="px-4 py-2 border text-center">⚙️ 🗑️</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}
document.getElementById("professorsLink").addEventListener("click", fetchProfessors);
document.getElementById("classesLink").addEventListener("click", fetchClasses);
fetchEtudiants();
