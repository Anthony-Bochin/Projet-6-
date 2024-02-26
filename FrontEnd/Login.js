document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérer les valeurs de l'email et du mot de passe
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Construire l'objet JSON pour le corps de la requête
    let requestBody = {
      email: email,
      password: password,
    };

    // Effectuer la requête à l'API
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Not Authorized");
        } else if (response.status === 404) {
          throw new Error("User not found");
        }
      })
      .then((data) => {
        // Stocker le token dans le localStorage
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.userId);

        // Rediriger l'utilisateur vers une autre page
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
        console.error("Erreur lors de la requête à l'API:", error);
      });
  });
