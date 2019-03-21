# Filtering matches test task solution

## Overview

Solution for https://github.com/tamer1an/lab1/blob/master/filtering_matches/ exercise

Docker is used for containerization

Start container with
```
> docker-compose up
```
by default it'll start at DEV mode

another way
```
> chmod a+x *.sh
> ./dev.sh
```
if you'd like to rebuild containers for some reason:
```
> ./fresh.sh
```

## Backend

API built using NodeJS, MongoDB\
Pretty strait forward express server using bodyParser middleware\
Seeding script is inbuilt and run once at first server up\
Reason to use MongoDB - it has nice and quick geospatial **$nearSphere** search

API reports at http://localhost:8081

Routes
```
GET   /         returns API welcome message
POST  /         returns all objects from persons collection
POST  /filter   actual filter route
```
request body could contain:
```
hasphoto, incontact, favourite - true || false
minage, maxage - int
minheight, maxheight - int
minscore, maxscore - float
lng, lat - float
range - int
```

```
POST  /clear    service route, cleans collection / test not written though
```

If db breaks - use **/clean** and **restart** the container for re-seeding

### Testing

I've done some, but enough tests to get understanding of what to test here\
Unit tests cover helper functions, and integration test cover API calls\
More to come to get more coverage

running Tests
```
> ./api_test.sh
```

## Frontend

Client Vue, Vuetify\
No tests yet (
