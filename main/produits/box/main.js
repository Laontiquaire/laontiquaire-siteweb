// Gestion du bouton retour à l'accueil
document.getElementById('back-home-button').addEventListener('click', function () {
    window.location.href = "/produits/";
});

// Gestion du bouton télécharger
document.getElementById('download-button').addEventListener('click', function () {
    // Récupérer le type de box sélectionné
    const boxType = document.getElementById('box-type').value;

    // Récupérer les options cochées
    const options = [];
    document.querySelectorAll('.options input[type="checkbox"]:checked').forEach(option => {
        options.push(option.nextElementSibling.textContent.trim());
    });

    // Créer le contenu du fichier TXT
    const fileContent = `Type de Box : ${boxType}\nOptions sélectionnées :\n- ${options.join('\n- ')}`;

    // Créer un élément Blob pour le fichier
    const blob = new Blob([fileContent], { type: "text/plain" });

    // Générer un lien pour télécharger le fichier
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'box_options.txt';
    link.click();

    // Nettoyer l'URL générée
    URL.revokeObjectURL(link.href);
});
