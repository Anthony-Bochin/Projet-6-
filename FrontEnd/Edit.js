const open = document.querySelector('.js-modal');
const close = document.querySelector('.js-modal-close');
const modalContainer = document.querySelector('.modal');
const open2 = document.querySelector('.buton__modal1');
const close2 = document.querySelector('.js-modal-close2');
const back = document.querySelector('.js-modal-back');








async function genererWork() {
    const listWorks = await fetch("http://localhost:5678/api/works");
    const reponsAPI = await listWorks.json();

    const imagesContainer = document.querySelector('.modal__supr--photo');

    for (let i = 0; i < reponsAPI.length; i++) {
        const infoWorks = reponsAPI[i];

        // Créer unune balise HTML div
        const divElement = document.createElement('div');
        divElement.classList.add("photo__modal2")
        // Créer un élément d'image puis on lui indique la source / chemin de l'image
        const imageElement = document.createElement('img');
        imageElement.src = infoWorks.imageUrl;



        // Créer un élément de lien (balise <a>) avec la classe "bouton__delet"
        const linkElement = document.createElement('a');
        linkElement.addEventListener('click', function () {
            SuprPhoto(infoWorks.id);
        });
        linkElement.href = "#";
        linkElement.classList.add("bouton__delet");

        // Créer un élément de span avec la classe fa-stack fa-2x
        const spanElement = document.createElement('span');
        spanElement.classList.add("fa-stack", "fa-2x");

        // Créer un premier élément d'icône solide (fa-square) avec la classe fa-stack-2x et la couleur #000000
        const squareIconElement = document.createElement('i');
        squareIconElement.classList.add("fa-solid", "fa-square", "fa-stack-2x");
        squareIconElement.style.color = "#000000";

        // Créer un deuxième élément d'icône solide (fa-trash-can) avec la classe fa-stack-1x et la couleur #ffffff
        const trashCanIconElement = document.createElement('i');
        trashCanIconElement.classList.add("fa-solid", "fa-trash-can", "fa-stack-1x");
        trashCanIconElement.style.color = "#ffffff";

        // on insère toute les balises les unes arpès les autres dans l'HTML        
        // Insérer les icônes dans le span
        spanElement.appendChild(squareIconElement);
        spanElement.appendChild(trashCanIconElement);
        // Insérer le span dans le lien
        linkElement.appendChild(spanElement);
        divElement.appendChild(linkElement)
        divElement.appendChild(imageElement);
        imagesContainer.appendChild(divElement);

        // appenn on click  la focniton de suppréssion et en paramètre lui mettre infoworks.id 
    }
}

document.addEventListener('DOMContentLoaded', genererWork);



const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementById('modal1');
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('arial-modal', 'true');


};

const closeModal = function (e) {
    e.preventDefault();
    const target2 = document.querySelector('.modal');
    target2.style.display = "none";
    target2.setAttribute('aria-hidden', 'true');
    target2.setAttribute('arial-modal', 'false');
};

open.addEventListener('click', openModal);
close.addEventListener('click', closeModal);

const openModal2 = function (e) {
    e.preventDefault();
    const target3 = document.querySelector('.modal2');
    target3.style.display = null;
    target3.removeAttribute('aria-hidden');
    target3.setAttribute('arial-modal', 'true');


};

const closeModal2 = function (e) {
    e.preventDefault();
    const target4 = document.querySelector('.modal2');
    target4.style.display = "none";
    target4.setAttribute('aria-hidden', 'true');
    target4.setAttribute('arial-modal', 'false');
};

const openAndCloseModal2 = function (e) {
    closeModal(e);
    openModal2(e);
};

open2.addEventListener('click', openAndCloseModal2);
close2.addEventListener('click', closeModal2);

const backModal = function (e) {
    closeModal2(e);
    openModal(e);
};



back.addEventListener('click', backModal)


// Fonction pour se déconnecter
function logout() {
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
}


let Logoutbtn = document.querySelector('.LogOut');
Logoutbtn.addEventListener('click', logout)





document.getElementById('photoPreview').addEventListener('click', function () {
    document.getElementById('photoUpload').click();
});

document.getElementById('photoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('photoPreviewImage');
            img.src = e.target.result;
            img.classList.remove('hidden');
            document.getElementById('photoPlaceholder').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
});




async function SuprPhoto(id) {
    let bearer = localStorage.getItem('userToken');
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + bearer,
        },
    });
    genererWork()    
}





// le fait que la photo soit supprimée utiliser `http://localhost:5678/api/works/${id}`
// requête delete , refaire un appel du get pour avoir les Images et re afficher la modal pour bien afficher 



