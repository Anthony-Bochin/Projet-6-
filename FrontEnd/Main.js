async function genererWork() {
    // Récupère les données depuis l'API
    const listWorks = await fetch("http://localhost:5678/api/works");
    const reponsAPI = await listWorks.json();
    // Met à jour le nombre d'images dans le localStorage
    

    // Sélectionne le conteneur où les images seront affichées
    const imagesContainer = document.getElementById('images_container');

    // Vide le conteneur d'images avant d'ajouter les nouveaux éléments
    imagesContainer.innerHTML = '';

    // Parcourt et affiche chaque œuvre récupérée depuis l'API
    for (let i = 0; i < reponsAPI.length; i++) {
        const infoWorks = reponsAPI[i];

        // Crée un élément 'figure' pour chaque œuvre
        const figureElement = document.createElement('figure');

        // Crée et configure un élément 'img' pour l'image
        const imageElement = document.createElement('img');
        imageElement.src = infoWorks.imageUrl;
        imageElement.alt = infoWorks.title;

        // Crée un élément 'figcaption' pour le titre
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = infoWorks.title;

        // Ajoute l'image et le titre au 'figure', puis ajoute le 'figure' au conteneur
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        imagesContainer.appendChild(figureElement);
    }
}




// Vérifier si l'utilisateur est déjà connecté
window.onload = function() {
    if (!localStorage.getItem('userToken')) {
        let BannerEdit = document.querySelector('.Edit__banner')
        BannerEdit.remove();
        let LogOut = document.querySelector('.LogOut')
        LogOut.remove();
        let modify = document.querySelector('.Edit__galerie')
        modify.remove();
    } else {
        let Login = document.querySelector('.Login__index');
        Login.remove(); 

        let category = document.querySelector('.Categories');
        category.remove();
    } 
};




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
        else if (categorieId === null) {
            // Traitement spécifique lorsque categorieId est null 
            const figureElement = document.createElement('figure');
            
            const imageElement = document.createElement('img');
            imageElement.src = infoWorks.imageUrl;
            imageElement.alt = infoWorks.title;
            
            const figcaptionElement = document.createElement('figcaption');
            
            figcaptionElement.textContent = infoWorks.title;
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            imagesContainer.appendChild(figureElement);
        }
    }
}

// Ajouter des écouteurs d'événements aux boutons de catégorie
document.querySelector('.btn__Tous').addEventListener('click', function () {
    filtrerParCategorie(null);
});

document.querySelector('.btn__Objets').addEventListener('click', function () {
    filtrerParCategorie(1);
});

document.querySelector('.btn__Appartements').addEventListener('click', function () {
    filtrerParCategorie(2);
});

document.querySelector('.btn__Hotels').addEventListener('click', function () {
    filtrerParCategorie(3); 
});



    const photoUpload = document.getElementById('photoUpload');
    const photoTitle = document.getElementById('photoTitle');
    const photoCategory = document.getElementById('photoCategory');
    const validateButton = document.querySelector('.buton__modal2');

    function updateButtonColor() {
        if (photoUpload.files.length > 0 && photoTitle.value.trim() !== '' && photoCategory.value !== '') {
            validateButton.classList.add('bg__green');
            validateButton.disabled = false ;// Change la couleur en vert
        } else {
            validateButton.disabled = true ;
            validateButton.classList.remove('bg__green'); // Réinitialise à la couleur d'origine
        }
    }

    // Écoute les changements sur les champs
    photoUpload.addEventListener('change', updateButtonColor);
    photoTitle.addEventListener('input', updateButtonColor);
    photoCategory.addEventListener('change', updateButtonColor);





async function sendWork() {
	let title = document.getElementById("photoTitle").value;
	let imageUpload = document.getElementById('photoUpload');
	let category = document.getElementById('photoCategory').value; 
	let userId = localStorage.getItem('userId'); 
	let bearer = localStorage.getItem('userToken'); 
 
	
	let formData = new FormData();
	formData.append("title", title);
	if (imageUpload.files.length > 0) {
			formData.append("image", imageUpload.files[0]);
	}
	formData.append("category", category); 
	formData.append("userId", userId);
 
	try {
			let response = await fetch('http://localhost:5678/api/works', {
					method: 'POST',
					headers: {
							'Authorization': "Bearer " + bearer,
					},
					body: formData,
			});
 
			if (response.ok) { 
					let responseData = await response.json(); 
					console.log(responseData);
					window.location.reload()
			} else {
					
					throw new Error(`Error ${response.status}: ${response.statusText}`);
			}
	} catch (error) {
			alert(error.message);
			console.error('Erreur lors de la requête à l\'API:', error);
	}
}



