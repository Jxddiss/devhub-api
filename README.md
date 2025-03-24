## Project Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

## Database Setup

1. **Installer PostgreSQL**  
   Avoir PostgreSQL dans sa machine [PostgreSQL Downloads](https://www.postgresql.org/download/).

2. **Créer une base de données**  
   Se connecter à PostgreSQL et créez une base de données nommée `dev_hub` :
   ```sql
   CREATE DATABASE dev_hub;
   ```

3. **Configurer les variables d'environnement**  
   Mettre à jour `.env` avec les informations de connexion PostgreSQL :
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=root
   DB_NAME=dev_hub
   ```

4. **Synchroniser la base de données**  
   Sync la bd à chaque changement de Model :
   ```
   npm run sync-db
   ```

5. **Vérifier la connexion**  
   Ce message doit apparaître si ça fonctionne :
   ```
   Database connection established successfully.
   ```

6. **Données initiales (optionnel)**  
   Si on veut ajouter des données initiales, on peut modifier le fichier `sync.ts` pour inclure des insertions dans la bd


## Firebase Setup

1. **Créer un projet Firebase**  

   Aller sur [Firebase Console](https://console.firebase.google.com/) et créer un nouveau projet

2. **Configurer l'application web**  

   Ajoute une application web dans **Firebase** et récupère les informations de configuration Firebase (API Key, Auth Domain, etc.)
   Aussi rajoute l'authentification avec **email & password** et **Google** (Après on va rajouter **GitHub** et **Microsoft**)

3. **Configurer l'authentification google**

   Il faut mettre le client secret dans les whitelist dans la méthode d'authentification Google

   Donc encore sur [Firebase Console](https://console.firebase.google.com/) (Dans ton projet) il faut aller dans **Authentification** -> **Sign-in method** -> **Google** -> **Whitelist client IDs from external projects (optional)** et rajouter ce client id:
   ```
      607899403583-if4ui37ar583m5nvbmi328b76u0d8g1f.apps.googleusercontent.com
   ```
4. **Mettre à jour les variables d'environnement**  

   Ajoutez les informations de configuration Firebase dans le fichier `.env` :
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Ajuster les paramètres de JWT**

   Dans `.env`, met les paramètres JWT.

