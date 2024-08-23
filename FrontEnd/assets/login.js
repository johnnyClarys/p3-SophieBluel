// Exécution du code JavaScript lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
	// Ajout d'un écouteur d'événement sur la soumission du formulaire de connexion utilisateur
	document.getElementById('user-login-form').addEventListener('submit', function(event) {
		event.preventDefault();
		// Récupération des données du formulaire
		const user = {
			email: document.querySelector('#email').value,
			password: document.querySelector('#password').value,
		};
		// Envoi de la requête pour l'authentification
		fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
				case 503:
					alert("Erreur côté serveur!");
				break;
				case 401:
				case 404:
					alert("Email ou mot de passe incorrect!");
				break;
				case 200:
					console.log("Authentification réussie.");
					return response.json();
				break;
				default:
					alert("Erreur inconnue!");
				break;
			}
		})
		.then(function(data) {
			console.log(data);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userId);
			// Redirection vers 'index.html'
			location.href = 'index.html';
		})
		.catch(function(err) {
			console.log(err);
		});
	});
});
