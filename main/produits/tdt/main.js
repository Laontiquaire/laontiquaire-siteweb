document.getElementById('buy-button').addEventListener('click', function () {
    alert("Merci pour votre intérêt ! Vous serez redirigé vers la page de paiement.");
    // Redirection possible ici
    // window.location.href = "/paiement";
});

document.getElementById('back-home-button').addEventListener('click', function () {
    alert("Retour à l'accueil.");
    // Redirection vers la page d'accueil
    window.location.href = "/";
});
