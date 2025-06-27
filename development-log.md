# Development Log - TaskBoard+ API

## Implémentation de la route de rafraîchissement de token JWT

### Étape 1 : Création du fichier de suivi ✅
- Création du fichier `development-log.md` pour documenter les étapes d'implémentation

### Étape 2 : Mise à jour du service d'authentification ✅
- Modification de `auth.service.ts` pour stocker le refreshToken en base de données
- Ajout de la méthode `refresh()` pour valider et générer de nouveaux tokens
- Ajout de la méthode `logout()` pour invalider le refreshToken

### Étape 3 : Mise à jour du contrôleur d'authentification ✅
- Ajout de la route POST `/auth/refresh` dans `auth.controller.ts`
- Ajout de la route POST `/auth/logout` pour invalider le refreshToken
- **Correction** : Fix de l'accès à l'ID utilisateur dans logout (req.user.id au lieu de req.user.sub)

### Étape 4 : Mise à jour du service utilisateur ✅
- Ajout de la méthode `findById()` dans `user.service.ts`
- Ajout de la méthode `updateRefreshToken()` pour gérer le stockage des refreshTokens

### Étape 5 : Migration de base de données ✅
- Synchronisation du schéma Prisma avec la base de données
- Le champ `refreshToken` est maintenant disponible dans la table User

## Guide de test Postman

### Configuration de base
- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`

### 1. Test de l'inscription
**POST** `/auth/register`
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```
**Réponse attendue**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Test du login
**POST** `/auth/login`
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
**Réponse attendue**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Test du refresh token
**POST** `/auth/refresh`
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Réponse attendue**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Test du logout
**POST** `/auth/logout`
**Headers**:
```
Authorization: Bearer <accessToken>
```
**Réponse attendue**:
```json
{
  "message": "Logged out successfully"
}
```

### 5. Test d'erreur avec refresh token invalide
**POST** `/auth/refresh`
```json
{
  "refreshToken": "invalid_token"
}
```
**Réponse attendue**:
```json
{
  "statusCode": 401,
  "message": "Invalid refresh token"
}
```

## Variables d'environnement Postman
Créer des variables dans Postman pour faciliter les tests :
- `baseUrl`: `http://localhost:3000`
- `accessToken`: Token d'accès récupéré lors du login
- `refreshToken`: Token de rafraîchissement récupéré lors du login

## Workflow de test recommandé
1. **Inscription** → Récupérer accessToken et refreshToken
2. **Login** → Récupérer de nouveaux tokens
3. **Refresh** → Utiliser le refreshToken pour obtenir de nouveaux tokens
4. **Logout** → Invalider le refreshToken (nécessite accessToken valide)
5. **Test d'erreur** → Essayer de refresh avec un token invalide

