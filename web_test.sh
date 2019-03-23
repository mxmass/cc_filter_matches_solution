docker-compose stop
docker-compose down
cp client/Dockerfile.test client/Dockerfile
cp docker-compose.web_test.yml docker-compose.yml
docker-compose up
