FROM rust:1.88-slim AS build
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/target/release/bench-rocket ./bench-rocket
COPY Rocket.toml ./
RUN useradd --system --no-create-home app
USER app
EXPOSE 3000
CMD ["./bench-rocket"]
