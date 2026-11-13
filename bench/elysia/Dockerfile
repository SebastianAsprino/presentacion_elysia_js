FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --production
COPY index.ts ./
# Imagen oficial de Bun: ya trae el usuario sin privilegios `bun`.
USER bun
EXPOSE 3000
CMD ["bun", "index.ts"]
