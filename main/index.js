document.addEventListener("DOMContentLoaded", () => {
    // Animation d'apparition pour chaque section
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, 200 * index);
    });
  
    // Ajouter une alerte sur les liens sociaux
    const socialLinks = document.querySelectorAll(".liens-sociaux a");
    socialLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        alert("Vous allez être redirigé vers un lien externe !");
      });
    });
  });
  