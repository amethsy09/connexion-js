
document.addEventListener("DOMContentLoaded", async function () {
    
    
   await fetchStudents();
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
                    <button onclick="editStudent(${index})" class="text-blue-600 hover:text-blue-800">Éditer</button>
                    <button onclick="deleteStudent(${index})" class="text-red-600 hover:text-red-800">Supprimer</button>
                </td>
        `;
  
        studentsList.appendChild(row);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
  }
  