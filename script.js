document.addEventListener("DOMContentLoaded", async function () {
  security();
  redirectrole();
 await fetchStudents();

});	

document.querySelector("#form").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page
  login();
});
function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");

  let isValid = true;

  // Validation de l'email
  if (!validateEmail(emailInput.value)) {
    emailError.textContent = "Veuillez entrer une adresse email valide.";
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    emailError.classList.add("hidden");
  }

  // Validation du mot de passe
  if (passwordInput.value.length < 6) {
    passwordError.textContent =
      "Le mot de passe doit contenir au moins 6 caractères.";
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  // Si les champs ne sont pas valides, on arrête ici
  if (!isValid) return;

  // Vérification des identifiants avec le fichier JSON
  fetch("data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données.");
      }
      
      return response.json();
    })
    .then((data) => {
      // console.log(responseJson);
      let utilisateurs = [
        ...data.etudiants,
        ...data.professeurs,
        ...data.administrateur,
      ];

      console.log(utilisateurs);
      let utilisateur = utilisateurs.find(
        (user) =>
          user.email === emailInput.value &&
          user.motsdepasse === passwordInput.value
      );
      if (utilisateur) {
        localStorage.setItem(
          "utilisateurConnecte",
          JSON.stringify(utilisateur)
        );

        // Redirection selon le rôle de l'utilisateur
        switch (utilisateur.role) {
          case "etudiant":
            window.location.href = "pages/etudiant.html";
            break;
          case "professeur":
            window.location.href = "pages/professeur.html";
            break;
          case "admin":
            window.location.href = "pages/administrateur.html";
            break;
          default:
            alert("Rôle inconnu, impossible de rediriger.");
        }
      } else {
        loginError.textContent = "Email ou mot de passe incorrect !";
        loginError.classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
      loginError.textContent = "Problème de connexion. Veuillez réessayer.";
      loginError.classList.remove("hidden");
    });
}

// Fonction de validation de l'email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// / Fonction de déconnexion
function logout() {
  localStorage.removeItem("utilisateurConnecte");
  window.location.href = "../index.html";
}
function security() {
  const user = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  if (!user) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion, mais évite la redirection en boucle
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
    return;
  }
}
function redirectrole() {
  const user = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  if (user) {
    // Vérifier si l'utilisateur est déjà sur la page appropriée
    const currentPage = window.location.pathname.split("/").pop();
    const targetPage = `${user.role}.html`;
    // if (currentPage !== targetPage) {
    //   // Redirection selon le rôle de l'utilisateur
    //   console.log("Redirection vers :", targetPage);
    //   window.location.href = `/pages/${targetPage}`;
    // }
  }
}
// recuperation des etudiants
// async function fetchStudents() {
//   try {
//     const response = await fetch("/data/data.json"); 
  
//     if (!response.ok) {
//       throw new Error("Erreur réseau lors de la récupération des données");
//     }

//     const data = await response.json();
//     console.log(data);
     
    
//     const students = data.etudiants;
//     console.log(students); 
//     const studentsList = document.getElementById("students");

//     studentsList.innerHTML = "";

//     students.forEach((student, index) => {
//       const row = document.createElement("tr");
//       row.classList.add(
//         "text-center",
//         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//       ); // Alternance de couleur

//       row.innerHTML = `
//         <td class="px-4 py-2 border">${student.nom}</td>
//         <td class="px-4 py-2 border">${student.prenom}</td>
//         <td class="px-4 py-2 border">${student.classe}</td>
//         <td class="px-4 py-2 border">${student.email}</td>
//         <td class="px-4 py-2 border">${student.telephone}</td>
//       `;

//       studentsList.appendChild(row);
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des étudiants:", error);
//   }
// }
