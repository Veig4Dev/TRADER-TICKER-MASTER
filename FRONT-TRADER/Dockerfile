# Use a imagem base do Node.js
FROM node:latest

# Crie o diretório de trabalho na imagem
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho na imagem
COPY . .

# Construa a aplicação React
RUN npm run build 

# Defina a variável de ambiente NODE_ENV como 'production'
ENV NODE_ENV=production

#port
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "start"]
