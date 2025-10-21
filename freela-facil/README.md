# FreelaFácil - Backend API

Backend em NestJS para conectar clientes a freelancers.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **PostgreSQL** - Banco de dados (Neon)
- **TypeORM** - ORM para banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **class-validator** - Validação de dados

## 📋 Funcionalidades

### Usuários
- ✅ Cadastro de usuários
- ✅ Login com telefone e senha
- ✅ Autenticação JWT
- ✅ CRUD completo

### Trabalhos
- ✅ Criar trabalho
- ✅ Listar todos os trabalhos
- ✅ Listar trabalhos do usuário
- ✅ Buscar por título/descrição
- ✅ Atualizar trabalho (apenas o dono)
- ✅ Remover trabalho (apenas o dono)

## 🗃️ Estrutura do Banco

### Tabela Users
```sql
- id (UUID, PK)
- nome (VARCHAR)
- endereco (VARCHAR)
- telefone (VARCHAR, UNIQUE)
- email (VARCHAR, opcional)
- senha (VARCHAR, hash)
- data_criacao (TIMESTAMP)
```

### Tabela Jobs
```sql
- id (UUID, PK)
- titulo (VARCHAR)
- valorSugerido (DECIMAL)
- descricao (TEXT)
- data_publicacao (TIMESTAMP)
- usuario_id (UUID, FK)
```

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```bash
# Database
DATABASE_HOST=ep-young-firefly-adll7h29-pooler.c-2.us-east-1.aws.neon.tech
DATABASE_PORT=5432
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=npg_kmGlZ4sShXx7
DATABASE_NAME=neondb

# JWT
JWT_SECRET=freela-facil-super-secret-jwt-key-2024
JWT_EXPIRES_IN=24h

# App
PORT=3000
NODE_ENV=development
```

4. Execute a aplicação:
```bash
npm run start:dev
```

## 📍 Endpoints da API

### Health Check
```
GET /health
```

### Autenticação
```
POST /auth/login
Body: {
  "telefone": "11999999999",
  "senha": "123456"
}
```

### Usuários
```
POST /users - Cadastrar usuário
GET /users - Listar usuários (requer auth)
GET /users/:id - Buscar usuário (requer auth)
PATCH /users/:id - Atualizar usuário (requer auth)
DELETE /users/:id - Remover usuário (requer auth)
```

### Trabalhos
```
POST /jobs - Criar trabalho (requer auth)
GET /jobs - Listar todos os trabalhos
GET /jobs/search?q=termo - Buscar trabalhos
GET /jobs/my-jobs - Meus trabalhos (requer auth)
GET /jobs/:id - Detalhes do trabalho
PATCH /jobs/:id - Atualizar trabalho (requer auth + ser dono)
DELETE /jobs/:id - Remover trabalho (requer auth + ser dono)
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após fazer login, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## 📝 Exemplos de Uso

### 1. Cadastrar Usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "endereco": "Rua das Flores, 123",
    "telefone": "11999999999",
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

### 2. Fazer Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "11999999999",
    "senha": "123456"
  }'
```

### 3. Criar Trabalho
```bash
curl -X POST http://localhost:3000/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "titulo": "Desenvolvimento de Site",
    "valorSugerido": 1500.00,
    "descricao": "Preciso de um site responsivo para minha empresa"
  }'
```

### 4. Listar Trabalhos
```bash
curl http://localhost:3000/jobs
```

### 5. Buscar Trabalhos
```bash
curl "http://localhost:3000/jobs/search?q=desenvolvimento"
```

## 🎯 Status da Aplicação

A aplicação está **rodando com sucesso** em `http://localhost:3000`

- ✅ Banco de dados conectado (Neon PostgreSQL)
- ✅ Tabelas criadas automaticamente
- ✅ SSL configurado
- ✅ Todos os endpoints funcionando
- ✅ Autenticação JWT ativa
- ✅ Validações implementadas

## 🏗️ Arquitetura

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── database/             # Configuração do banco
│   └── database.module.ts
├── modules/
│   ├── users/            # Módulo de usuários
│   │   ├── dto/
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── jobs/             # Módulo de trabalhos
│       ├── dto/
│       ├── job.entity.ts
│       ├── jobs.controller.ts
│       ├── jobs.service.ts
│       └── jobs.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 🔧 Próximos Passos

- [ ] Implementar upload de imagens
- [ ] Sistema de avaliações
- [ ] Chat entre cliente e freelancer
- [ ] Sistema de propostas
- [ ] Filtros avançados
- [ ] Paginação
- [ ] Documentação Swagger/OpenAPI