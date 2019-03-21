docker-compose stop
docker-compose down
cp client/Dockerfile.dev client/Dockerfile
cp server/Dockerfile.dev server/Dockerfile
cp docker-compose.dev.yml docker-compose.yml
docker-compose up --build
