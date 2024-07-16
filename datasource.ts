const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: process.env.DATABASE_USER||"postgres",
  password:  process.env.DATABASE_PASSWORD||"zNeVWoZVjkVPFGjylJLJaTWVPBAVVxmA",
  database: process.env.DATABASE_NAME||"railway",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}