# Use a imagem oficial do Nginx a partir do Docker Hub
FROM nginx

# Copie o arquivo de configuração customizado para o contêiner
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80 do contêiner
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
