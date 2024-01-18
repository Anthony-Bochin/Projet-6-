





async function genererWork() {
    const listWorks = await fetch("http://localhost:5678/api/works");
    const reponsAPI = await listWorks.json();

    const imagesContainer = document.getElementById('images_container');
  
    for (let i = 0; i < reponsAPI.length; i++) {
        const infoWorks = reponsAPI[i];
  
        // Créer unune balise HTML figure
        const figureElement = document.createElement('figure');
  
        // Créer un élément d'image puis on lui indique la source / chemin de l'image
        const imageElement = document.createElement('img');
        imageElement.src = infoWorks.imageUrl;
        imageElement.alt = infoWorks.title;
  
        // Créer une balise HTML figcaption
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = infoWorks.title;
  
        // on insère toute les balises les unes arpès les autres dans l'HTML
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        imagesContainer.appendChild(figureElement);
    }
}

// Appeler la fonction après le chargement du DOM
document.addEventListener('DOMContentLoaded', genererWork);







// Fonction pour filtrer les images en fonction de la catégorie
async function filtrerParCategorie(categorieId) {

    const listWorks = await fetch("http://localhost:5678/api/works");
    const reponsAPI = await listWorks.json();
    

    const imagesContainer = document.getElementById('images_container');
    imagesContainer.innerHTML = ''; // Effacer le contenu actuel du conteneur d'images

    for (let i = 0; i < reponsAPI.length; i++) {
        const infoWorks = reponsAPI[i];

        if (infoWorks.category.id === categorieId) {
            // Créer une balise HTML figure
            const figureElement = document.createElement('figure');

            // Créer un élément d'image puis on lui indique la source / chemin de l'image
            const imageElement = document.createElement('img');
            imageElement.src = infoWorks.imageUrl;
            imageElement.alt = infoWorks.title;

            // Créer une balise HTML figcaption
            const figcaptionElement = document.createElement('figcaption');
            figcaptionElement.textContent = infoWorks.title;

            // on insère toutes les balises les unes après les autres dans l'HTML
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            imagesContainer.appendChild(figureElement);
        }
    }
}

// Ajouter des écouteurs d'événements aux boutons de catégorie
document.querySelector('.btn__Tous').addEventListener('click', function () {
    filtrerParCategorie(null); // Afficher toutes les catégories
});

document.querySelector('.btn__Objets').addEventListener('click', function () {
    filtrerParCategorie(1); // Afficher la catégorie "Objets"
});

document.querySelector('.btn__Appartements').addEventListener('click', function () {
    filtrerParCategorie(2); // Afficher la catégorie "Appartements"
});

document.querySelector('.btn__Hôtels & restaurants').addEventListener('click', function () {
    filtrerParCategorie(3); // Afficher la catégorie "Hôtels & restaurants"
});