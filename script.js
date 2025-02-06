document.addEventListener("DOMContentLoaded", function () {
  security();
  redirectrole();
});

document.getElementById("form").addEventListener("submit", function (event) {
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
      "Le mot de passe doit contenir au moins 8 caractères.";
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  // Si les champs ne sont pas valides, on arrête ici
  if (!isValid) return;

  // Vérification des identifiants avec le fichier JSON
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données.");
      }
      return response.json();
    })
    .then((data) => {
      let utilisateurs = [
        ...data.etudiants,
        ...data.professeurs,
        ...data.administrateur,
      ];

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
      const currentPage = window.location.pathname.split('/').pop();
      const targetPage = `${user.role}.html`;
      
      if (currentPage !== targetPage) {
        // Redirection selon le rôle de l'utilisateur
        window.location.href = `/pages/${targetPage}`;
      }
    }
  }
  
