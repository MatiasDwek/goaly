# Goaly

# Frontend

To build the frontend run:

```
yarn build
```

Then you can run it with:

```
yarn start
```

# Backend

To launch the docker compose environment with a dev CockroachDB database first build the services with:

```
yarn build-docker-api
```

Then launch the dev environment with:

```
yarn start-docker-api
```

Alternatively, you can launch a json server dev environment with:

```
yarn server
```
