FROM node:22-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY src ./src
RUN npx tsc

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
# Imagen oficial de Node: ya trae el usuario sin privilegios `node`.
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
