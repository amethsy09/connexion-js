document.getElementById("btn-login").addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    login();
});

function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errormsg = document.getElementById("error");

    // Validation des champs
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "" || password === "") {
        errormsg.textContent = "Veuillez remplir les champs email et mot de passe.";
        errormsg.classList.remove("hidden");
        return;
    }

    if (!emailPattern.test(email)) {
        errormsg.textContent = "Veuillez entrer un email valide.";
        errormsg.classList.remove("hidden");
        return;
    }

    if (password.length < 6) {
        errormsg.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
        errormsg.classList.remove("hidden");
        return;
    }

    errormsg.classList.add("hidden"); // Cache le message d'erreur si tout est valide

    // Vérification des identifiants
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des données.");
            }
            return response.json();
        })
        .then(data => {
            // Vérifie si la structure du JSON est correcte
            if (!data.etudiants || !data.professeurs || !data.administrateur) {
                throw new Error("Format du fichier JSON invalide.");
            }

            let utilisateurs = [...data.etudiants, ...data.professeurs, ...data.administrateur];

            let utilisateur = utilisateurs.find(user => user.email === email && user.motsdepasse === password);

            if (utilisateur) {
                localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));

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
                errormsg.textContent = "Email ou mot de passe incorrect !";
                errormsg.classList.remove("hidden");
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
            errormsg.textContent = "Problème de connexion. Veuillez réessayer.";
            errormsg.classList.remove("hidden");
        });
}

// Vérification de la connexion au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    let utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    // Vérifie si l'utilisateur est connecté, sauf sur la page de connexion
    if (!utilisateur && window.location.pathname !== "/index.html") {
        window.location.href = "index.html";
    }
});

// Fonction de déconnexion
function logout() {
    localStorage.removeItem("utilisateurConnecte");
    window.location.href = "../index.html"; // Redirige vers la page de connexion
}
