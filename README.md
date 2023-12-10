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

To connect to the dev db run: `docker exec -it <cockroachdb_container_id_or_name> ./cockroach sql --insecure`

Alternatively, you can launch a json server dev environment with:

```
yarn server
```

# Deployment

Edit `Dockerrun.aws.json` with `git update-index --no-skip-worktree goaly-api/aws_deploy/Dockerrun.aws.json` and add
your image URL.
