# Utiliser une image Node.js officielle comme image de base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Recompiler bcrypt pour s'assurer qu'il est compatible avec l'environnement Docker
RUN npm rebuild bcrypt --build-from-source

# Exposer le port sur lequel l'application va tourner
EXPOSE 4000

# Définir la commande pour démarrer l'application
CMD ["node", "src/server.js"]
