
document.addEventListener("DOMContentLoaded", async function () {
  const ma = document.getElementById("ma");
  ma.textContent = "classe"
   await fetchStudents();

   document.getElementById('professorsLink').addEventListener('click',async function (e) {
    e.preventDefault();
    ma.textContent = "matieres"
    await fetchProfessors();  // Charger la liste des professeurs
    document.getElementById('pageTitle').innerText = "Liste des professeurs"; // Changer le titre
  });

  });	

  async function fetchStudents() {
    try {
      const response = await fetch("/data/data.json");
  
      // Vérification du statut HTTP AVANT d'analyser la réponse JSON
      if (!response.ok) {
        throw new Error(`Erreur réseau (${response.status}): Impossible de récupérer les données`);
      }
  
      const data = await response.json();
  
      if (!data.etudiants || !Array.isArray(data.etudiants)) {
        throw new Error("Le format des données est incorrect : 'etudiants' est manquant ou n'est pas un tableau.");
      }
  
      const students = data.etudiants;
      console.log("Liste des étudiants :", students);
  
      const studentsList = document.getElementById("students");
      if (!studentsList) {
        console.error("Erreur : L'élément avec l'ID 'students' est introuvable !");
        return;
      }
  
      // Réinitialisation du contenu
      studentsList.innerHTML = "";
  
      students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.classList.add(
          "text-center",
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        ); // Alternance de couleur
  
        row.innerHTML = `
          <td class="px-4 py-2 border">${student.nom || "N/A"}</td>
          <td class="px-4 py-2 border">${student.prenom || "N/A"}</td>
          <td class="px-4 py-2 border">${student.classe || "N/A"}</td>
          <td class="px-4 py-2 border">${student.email || "N/A"}</td>
          <td class="px-4 py-2 border">${student.telephone || "N/A"}</td>
           <td class="px-4 py-2 border">
                    <button onclick="editStudent(${index})" class="text-blue-600 hover:text-blue-800">⚙</button>
                    <button onclick="deleteStudent(${index})" class="text-red-600 hover:text-red-800">🗑</button>
                </td>
        `;
  
        studentsList.appendChild(row);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
  }

// Fonction pour récupérer et afficher les professeurs
async function fetchProfessors() {
  try {
    const response = await fetch("/data/data.json");  // Ajustez le chemin selon votre configuration
    if (!response.ok) throw new Error("Erreur de chargement des professeurs");

    const data = await response.json();
    if (!data.professeurs || !Array.isArray(data.professeurs)) {
      throw new Error("Le format des données est incorrect : 'professeurs' est manquant ou n'est pas un tableau.");
    }
    const professors = data.professeurs;
    const studentsList = document.getElementById("profs");
    if (!studentsList) {
      console.error("Erreur : L'élément avec l'ID 'professeurs' est introuvable !");
      return;
    }

    studentsList.innerHTML = "";  // Réinitialiser le contenu

    professors.forEach((professor, index) => {
      const row = document.createElement("tr");
      row.classList.add(
        "text-center",
        index % 2 === 0 ? "bg-gray-100" : "bg-white"
      );
      professors.forEach(professor => {
        console.log(`Nom: ${professor.nom}, Prénom: ${professor.prenom}, Matière: ${professor.matiere}`);
      });
      
      row.innerHTML = `
        <td class="px-4 py-2 border">${professor.nom || "N/A"}</td>
        <td class="px-4 py-2 border">${professor.prenom || "N/A"}</td>
        <td class="px-4 py-2 border">${professor.matiere || "N/A"}</td>
        <td class="px-4 py-2 border">${professor.email || "N/A"}</td>
        <td class="px-4 py-2 border">${professor.telephone || "N/A"}</td>
        <td class="px-4 py-2 border text-center">
          <button class="text-blue-600 hover:text-blue-800">⚙</button>
          <button class="text-red-600 hover:text-red-800">🗑</button>
        </td>
      `;
      studentsList.appendChild(row);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des professeurs : ", error);
  }
}
