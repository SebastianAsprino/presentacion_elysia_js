FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY index.js ./
# Imagen oficial de Node: ya trae el usuario sin privilegios `node`.
USER node
EXPOSE 3000
CMD ["node", "index.js"]
