# Utiliser une image Node.js officielle
FROM node:20-alpine

# Installer les dépendances système nécessaires pour sharp et autres
RUN apk add --no-cache \
    libc6-compat \
    vips-dev \
    python3 \
    make \
    g++

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port 4321 (port par défaut d'Astro)
EXPOSE 4321

# Commande par défaut pour le développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321"]

