export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "locadora"
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    seeds: {
      directory: "./src/database/seeds"
    }
  }
};
