// Gestion du bouton d'achat
document.getElementById('buy-button').addEventListener('click', function () {
    alert("Merci pour votre intérêt ! Vous serez redirigé vers la page de paiement.");
    // Redirection possible ici
    // window.location.href = "/paiement";
});

// Gestion du bouton retour à l'accueil
document.getElementById('back-home-button').addEventListener('click', function () {
    // Redirection vers la page d'accueil
    window.location.href = "/produits/";
});
