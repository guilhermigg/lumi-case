# Lumi Case

Projeto para extração e visualização de dados de faturas de energia.

## Tecnologias
- ExpressJS
- ReactJS
- Docker
- Vitest

## Como executar o projeto

Comece fazendo o clone desse projeto com o git:

```sh
git clone git@github.com:guilhermigg/lumi-case.git
cd lumi-case
```

Antes de tudo, instale os pacotes do backend com `npm` e do frontend com `pnpm`.
```sh
cd lumi-api && npm i && cd ..
cd lumi-frontend && pnpm i && cd ..
```

Para iniciar, será necessário ter o [Docker](https://docs.docker.com/engine/install/) instalado, e o [Docker Compose](https://docs.docker.com/compose/install/).


Para utilizar o banco de dados, será necessário também rodar as migrations:
```sh
# Na pasta raíz, renomeie o arquivo .env.dev para .env
mv lumi-api/.env.dev lumi-api/.env

# Agora rode as migrations 
docker exec -it lumi-api sh -c "npx prisma migrate dev"
```

Tendo o docker instalado em sua máquina, apenas execute o seguinte no comando na pasta raíz:
`docker compose up`

Todo o processo de instalação e execução será realizado automaticamente pelo Docker.

## Como usar

A API iniciará na porta 5000, enquanto o frontend iniciará na porta 3000.
- API: Acesse o healthcheck da API via http://localhost:5000/api/v1/healthcheck.
- Frontend: Acesse o frontend via http://localhost:3000.

Na página inicial, terá a possibilidade de fazer o upload de cada Fatura. Quando finalizado, poderá acessar as páginas de Dashboard e Faturas da aplicação.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:
```
lumi-case/
├── backend/            # Código fonte da API
│   ├── Dockerfile      # Dockerfile para a API
│   └── ...
├── frontend/           # Código fonte do frontend
│   ├── Dockerfile      # Dockerfile para o frontend
│   └── ...
├── docker-compose.yml  # Arquivo de configuração do Docker Compose
└── README.md           # Este arquivo
```
