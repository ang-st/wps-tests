## Test Wordline / DIGYCODE 

### setup 

clone this repo and create `.env` file with proper `POS_SERVER_ROOT`, `UUID`, `KEY` values

### build docker image 
```
docker build -t wps-test

```

### run test
```
docker run wps-test

```

### reference client 

[simple api implementation ](src/ips_client.js)


