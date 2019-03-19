docker-compose stop
docker-compose down
cp server/Dockerfile.test server/Dockerfile
cp docker-compose.api_test.yml docker-compose.yml
docker-compose up --abort-on-container-exit --exit-code-from test_runner
