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
