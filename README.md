# Citas Medicas

This is an API for appointments with the doctor.

## Scripts
```bash
npm run dev
```
This is for test

```bash
npm run build
```
Build the API

```bash
npm start
```
Run build

```bash
docker-compose up -d db
```
This is for database with docker

## Environments
the file's name is .env.local in this is required
```env
DB_HOST=database host
DB_NAME=database name
DB_PASSWORD=database user's password
DB_USER=database user's name
```

## Database
The schema in database is in config db `citas_medicas.sql`

## Documentation API rest
The documentation is in Postman, the export is in config `test.postman_collection.json`