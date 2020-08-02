const db_port = process.env.DB_PORT || 5432;

module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": db_port,
    "username": "ekki",
    "password": "ekki",
    "database": "ekki",
    "entities": [
      "./src/modules/**/entities/*.ts",
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "seeds": [
      "./src/shared/infra/typeorm/seeds/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}

