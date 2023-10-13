# Gestion_inventaire

Gestion d'invetaire est un outil destiné à la gestion des entrée et des sorties des items de la techshop de l'urbanlab
Utilise notion comme base de données

## Installation

### Docker

#### Deploiement

L'app peut etre déployé avec docker compose

```bash
cp .env.example .env # ajuster les variables d'environnement
docker-compose up -d
```

Le front sera disponible sur https://localhost:5173

**:warning:  Attention : il est important d'utiliser le https pour acceder au front car la camera ne fonctionne pas en http**

### Utiliser comme environnement de dev

```bash
cp .env.example .env # ajuster les variables d'environnement
docker-compose up -d
docker cp gestion-inventaire-frontend:/app/node_modules .
```
