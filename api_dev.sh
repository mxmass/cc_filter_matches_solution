docker-compose stop
docker-compose down
cp server/Dockerfile.dev server/Dockerfile
cp docker-compose.dev.yml docker-compose.yml
docker-compose up
