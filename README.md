
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=openwar-app_game&metric=bugs)](https://sonarcloud.io/summary/new_code?id=openwar-app_game)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=openwar-app_game&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=openwar-app_game)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=openwar-app_game&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=openwar-app_game)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=openwar-app_game&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=openwar-app_game)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=openwar-app_game&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=openwar-app_game)

## How to develop
Edit the `./devdocker/.env` file to match your userid and groupid. 
This is needed to make sure that the files created by the docker container are owned by you and not by root.
Spin up the development docker by running the following command in `./devdocker/`:
```bash
docker compose up
```

## How to deploy
Like in the devdocker create a docker compose file and spin it up.
```yml
name: openwar_dev_server
services:
  app:
    depends_on:
      database:
        condition: service_healthy
    user: ${UID}:${GID}
    image: ghcr.io/openwar-app/game:dev
    ports:
      - "127.0.0.1:3000:3000"
    env_file:
      - path: ./.database.env
        required: true
      - path: ./.app.env
        required: true

  database_init: #we use this container to fix the permissions of the database volume to make it usable for local user
    image: postgres:16.2-bookworm
    volumes:
      - ./data/pgsql:/var/lib/postgresql/data
    env_file:
      - path: ./.database.env
        required: true
    entrypoint:
      - sh
      - -c
      - |
        chown -R ${UID}:${GID} /var/lib/postgresql/data
  database:
    depends_on:
      - database_init
    user: ${UID}:${GID}
    image: postgres:16.2-bookworm
    env_file:
      - path: ./.database.env
        required: true
    volumes:
        - ./data/pgsql:/var/lib/postgresql/data
    healthcheck:
        test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"]
        interval: 5s
        timeout: 5s
        retries: 5

```

Put a Reverse Proxy in front of the app container to make it accessible from the internet.
