document.getElementById("btn-login").addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    login();
    function login() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
    
        fetch("data.json") // Charge les données JSON
            .then(response => response.json())
            .then(data => {
                let utilisateurs = [...data.etudiants, ...data.professeurs, ...data.administrateur]; 
    
                let utilisateur = utilisateurs.find(user => user.email === email && user.motsdepasse === password);
    
                if (utilisateur) {
                    localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
                    alert("Connexion réussie !");
                    
                    if (utilisateur.role === "etudiant") {
                        window.location.href = "pages/etudiant.html";
                    } else if (utilisateur.role === "professeur") {
                        window.location.href = "pages/professeur.html";
                    } else if (utilisateur.role === "admin") {
                        window.location.href = "pages/admin.html";
                    }
                } else {
                    alert("Email ou mot de passe incorrect !");
                }
            })
            .catch(error => console.error("Erreur de chargement des utilisateurs", error));
    }
    
});
document.addEventListener("DOMContentLoaded", function () {
    let utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    if (!utilisateur) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = "pages/index.htmll";
    }
});
function logout() {
    localStorage.removeItem("utilisateurConnecte");
    // Redirige vers la page de connexion
    window.location.href = "pages/index.htmll"; // Assure-toi que c'est bien la page de connexion
}
