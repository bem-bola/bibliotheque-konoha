# Konoha Ninja Library API

Une API RESTful pour la gestion des rouleaux de jutsu, des ninjas et des emprunts. Cette API permet aux utilisateurs d'emprunter, de réserver des rouleaux de jutsu et de gérer les informations des ninjas.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Utilisation](#utilisation)
- [Documentation](#documentation)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Contributions](#contributions)
- [License](#license)

## Fonctionnalités

- Gestion des ninjas et des rouleaux de jutsu
- Emprunt et réservation de rouleaux de jutsu
- Recommandations de jutsu basées sur l'historique des emprunts
- Authentification des utilisateurs avec JWT
- Documentation de l'API via Swagger

## Technologies utilisées

- Node.js
- Express.js
- MongoDB (avec Mongoose)
- JWT pour l'authentification
- Jest et Supertest pour les tests
- Swagger pour la documentation
- dotenv pour la gestion des variables d'environnement

## Prérequis

Assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)

## Installation

1. **Clonez le dépôt :**

   ```bash
   https://github.com/bem-bola/bibliotheque-konoha.git
   ```
2. **Accédez au dossier du projet  :**
```bash
    cd bibliotheque-konoha 
   ```
3. **Configuration des Variables d'Environnement :**

Créez un fichier `.env` à la racine de votre projet et ajoutez les variables suivantes :
```plaintext

# URI de connexion à MongoDB
MONGODB_URI=

# Port de l'application Express
PORT=

# URL de base de l'API
BASE_URL='http://localhost:PORT/api/v1'

# Limite de temps pour le rate limiting en minutes
MAX_MINUTE=15

# Nombre maximum de requêtes par fenêtre
MAX_REQUETE_PER_WINDOW=100

# Secret utilisé pour signer les JSON Web Tokens (JWT)
JWT_SECRET=
 ```
4. **Installez les dépendances  :**
```bash
    npm install
   ```

5. **Lancer server  :**
```bash
    node server.js
   ```

## Documentation

Une fois server lancé la docu se trouve sous: http://localhost:PORT/api-docs/
 