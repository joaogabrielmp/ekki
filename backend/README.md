docker run --name ekki_pg -e POSTGRES_DB=ekki -e POSTGRES_USER=ekki -e POSTGRES_PASSWORD=ekki -p 5432:5432 -d postgres

yarn typeorm migration:run
yarn seed:run
