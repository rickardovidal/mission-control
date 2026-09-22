# Mission Control

Aplicação PERN para acompanhar robots, missões e operadores de uma frota.

## Funcionalidades

- consulta dos robots registados;
- registo de novos robots;
- consulta das missões, do robot atribuído e da respetiva equipa;
- resumo do estado da frota;
- validação dos dados recebidos pela API.

## Tecnologias

- PostgreSQL
- Node.js e Express
- Sequelize
- React e Vite
- Axios
- CSS

## Arquitetura

O backend segue um fluxo simples:

```text
Rota Express -> Controller -> Modelo Sequelize -> PostgreSQL
```

O frontend funciona como a camada de apresentação:

```text
Componente React -> Serviço Axios -> API REST
```

O Sequelize apenas mapeia as tabelas existentes. A estrutura da base de dados é criada através dos scripts SQL e não por `sequelize.sync()`.

## Estrutura

```text
Mission_Control/
├── client/          # Interface React
├── database/        # Schema, dados iniciais e queries
├── docs/database/   # Modelos PowerDesigner
└── server/          # API Express e modelos Sequelize
```

## Base de dados

1. Criar uma base de dados PostgreSQL chamada `mission_control`.
2. Executar `database/schema.sql`.
3. Executar `database/seed.sql`.

O modelo contém cinco tabelas:

- `robots`;
- `operators`;
- `missions`;
- `mission_operators`;
- `mission_logs`.

Um robot pode realizar várias missões. Cada missão tem um robot e pode ter vários operadores através da tabela `mission_operators`.

## Backend

```bash
cd server
npm install
```

Copiar `.env.example` para `.env` e preencher a palavra-passe do PostgreSQL.

```bash
npm run dev
```

A API fica disponível em `http://localhost:3000`.

## Frontend

```bash
cd client
npm install
npm run dev
```

O frontend fica disponível em `http://localhost:5173`.

## Endpoints

| Método | Endereço | Função |
| --- | --- | --- |
| GET | `/api/health` | Verificar a API |
| GET | `/api/robots` | Listar robots |
| GET | `/api/robots/:robotId` | Consultar um robot |
| POST | `/api/robots` | Registar um robot |
| GET | `/api/operators` | Listar operadores |
| GET | `/api/missions` | Listar missões com robot e operadores |

## Testes

```bash
cd server
npm test
```

```bash
cd client
npm test
npm run build
```
