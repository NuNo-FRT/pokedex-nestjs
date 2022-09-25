<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.example.env__ y renombrar la copa a __.env__
6. LLenar las variables de entonrno definidas en el __.env__
7. Recargar base de datos por un seed
```
http://localhost:3000/api/v2/seed
```
## Stack usado
* MongoDB
* Nest

## Crear Build de Produccion
1. Crear el archivo __.env.prod__ 
2. Completar las variables de entorno de produccion
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
