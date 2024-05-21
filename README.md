# Lumi Case

Este é um case para o teste técnico da Lumi Labs

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

Para iniciar, será necessário ter o [Docker](https://docs.docker.com/engine/install/) instalado, e o [Docker Compose](https://docs.docker.com/compose/install/).

Tendo o docker instalado em sua máquina, apenas execute o seguinte no comando na pasta raíz:
`docker compose up`

Todo o processo de instalação e execução será realizado automaticamente pelo Docker.

## Como usar

A API iniciará na porta 5000, enquanto o frontend iniciará na porta 3000.
- API: Acesse a API via http://localhost:5000.
- Frontend: Acesse o frontend via http://localhost:3000.

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