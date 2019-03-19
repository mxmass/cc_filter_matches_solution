# Filtering matches test task solution

## Overview

Solution for https://github.com/tamer1an/lab1/blob/master/filtering_matches/ exercise

Docker is used for containerization

Start container with
```
> docker-compose up
```
by default it'll  start at DEV mode

another way
```
> ./api_dev.sh
```
just don't forget to do "chmod a+x <filename>" for shell scripts


## backend

API built using NodeJS, MongoDB
Pretty strait forward express server using bodyParser middleware
Seeding script is inbuilt and run once at first server up
Reason to use MongoDB - it has nice and quick geospatial range search

API reports at http://localhost:8081

Routes
```
GET   /         returns API welcome message
POST  /         returns all objects from persons collection IF request body is empty
POST  /filter   actual filter route
```

```
POST  /clear    service route, cleans collection / test not written though
```

### testing

Since it is very small piece of code i didn't split it to keep everything on one screen
What i could do is to wrap limits testing into a functions and run unit test against it,
but it make very little sense since limits check algorithms are different for all given object props and it's not much of code refactoring we could do here ... 
So testing here is about the API calls themselves

running Tests
```
> ./api_test.sh
```
just don't forget to do "chmod a+x <filename>" for shell scripts

## Frontend

Client Vue, Vuetify
