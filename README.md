# 📚 Documentação Completa - FreelaFácil

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Backend API](#backend-api)
4. [Mobile App](#mobile-app)
5. [Configuração](#configuração)
6. [Funcionalidades](#funcionalidades)
7. [Guias Específicos](#guias-específicos)

## 🎯 Visão Geral

O **FreelaFácil** é uma plataforma completa para conectar freelancers com oportunidades de trabalho, desenvolvida com tecnologias modernas e arquitetura escalável.

### Tecnologias Principais
- **Backend:** NestJS + TypeScript + PostgreSQL
- **Frontend:** React Native + Expo + TypeScript
- **Autenticação:** JWT (JSON Web Tokens)
- **Banco de Dados:** PostgreSQL (Neon Cloud)

## 🏗️ Arquitetura

```
FreelaFácil/
├── freela-facil/          # Backend API (NestJS)
│   ├── src/
│   │   ├── auth/          # Autenticação JWT
│   │   ├── database/      # Configuração do banco
│   │   ├── modules/
│   │   │   ├── users/     # Gestão de usuários
│   │   │   └── jobs/      # Gestão de trabalhos
│   │   └── main.ts
│   └── package.json
├── freela-front/          # Mobile App (React Native)
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── navigation/    # Navegação entre telas
│   │   ├── screens/       # Telas da aplicação
│   │   ├── services/      # Serviços de API
│   │   └── types/         # Tipagens TypeScript
│   └── package.json
└── README.md
```

## 🚀 Backend API

### Estrutura Principal
```
src/
├── auth/                 # Sistema de autenticação
├── database/             # Configuração TypeORM
├── modules/
│   ├── users/            # CRUD de usuários
│   └── jobs/             # CRUD de trabalhos + busca
├── app.module.ts
└── main.ts
```

### Endpoints Principais

#### Autenticação
- `POST /auth/login` - Login com telefone e senha
- `GET /auth/profile` - Perfil do usuário autenticado

#### Usuários
- `POST /users` - Cadastro de usuário
- `GET /users` - Listar usuários (auth)
- `GET /users/:id` - Buscar usuário (auth)
- `PATCH /users/:id` - Atualizar usuário (auth)
- `DELETE /users/:id` - Remover usuário (auth)

#### Trabalhos
- `POST /jobs` - Criar trabalho (auth)
- `GET /jobs` - Listar todos os trabalhos
- `GET /jobs/:id` - Detalhes do trabalho
- `GET /jobs/my-jobs` - Trabalhos do usuário (auth)
- `PATCH /jobs/:id` - Atualizar trabalho (auth + owner)
- `DELETE /jobs/:id` - Remover trabalho (auth + owner)

#### Busca Avançada
- `POST /jobs/search/advanced` - Busca com filtros
- `GET /jobs/search/quick` - Busca rápida
- `GET /jobs/categories/popular` - Categorias populares
- `GET /jobs/locations/popular` - Localizações populares
- `GET /jobs/:id/similar` - Trabalhos similares

### Banco de Dados

#### Tabela Users
```sql
id (UUID, PK)
nome (VARCHAR)
endereco (VARCHAR)
telefone (VARCHAR, UNIQUE)
email (VARCHAR, nullable)
senha (VARCHAR, hash bcrypt)
data_criacao (TIMESTAMP)
```

#### Tabela Jobs
```sql
id (UUID, PK)
titulo (VARCHAR)
valorSugerido (DECIMAL)
descricao (TEXT)
data_publicacao (TIMESTAMP)
usuario_id (UUID, FK)
-- Campos da busca avançada:
salario (DECIMAL, nullable)
categoria (VARCHAR, nullable)
localizacao (VARCHAR, nullable)
tipoContrato (VARCHAR, nullable)
experiencia (VARCHAR, nullable)
status (VARCHAR, default: 'ATIVO')
```

## 📱 Mobile App

### Estrutura de Telas
```
Splash → Login/Cadastro → Home → Detalhes/Perfil/Criar
```

### Telas Implementadas
1. **SplashScreen** - Logo e verificação de auth
2. **LoginScreen** - Login com telefone/senha
3. **RegisterScreen** - Cadastro de usuário
4. **HomeScreen** - Listagem de trabalhos
5. **JobDetailsScreen** - Detalhes + contato WhatsApp
6. **CreateJobScreen** - Cadastro de trabalho
7. **ProfileScreen** - Perfil + trabalhos do usuário

### Navegação
- **Stack Navigator** - Navegação principal
- **Tab Navigator** - Abas inferiores (Home, Criar, Perfil)
- **Autenticação** - Redirecionamento automático

### Serviços
- **api.ts** - Configuração Axios + interceptors
- **auth.ts** - Login, cadastro, logout
- **job.ts** - CRUD de trabalhos

## ⚙️ Configuração

### Backend (.env)
```bash
# Database (Neon PostgreSQL)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha
DATABASE_NAME=nome_do_banco

JWT_SECRET=sua-chave-jwt
JWT_EXPIRES_IN=24h

PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```bash
# API Configuration
API_BASE_URL=http://SEU_IP:3000
```

### Execução

#### Backend
```bash
cd freela-facil
npm install
npm run start:dev  # http://localhost:3000
```

#### Frontend
```bash
cd freela-front
npm install
npm start          # Expo Metro Bundler
```

## 🎯 Funcionalidades

### ✅ Implementadas
- Sistema completo de autenticação JWT
- Cadastro e login de usuários
- CRUD completo de trabalhos
- Busca avançada com múltiplos filtros
- Interface mobile responsiva
- Contato direto via WhatsApp
- Perfil do usuário com trabalhos publicados
- Pull-to-refresh nas listagens
- Validação de formulários
- Tratamento de erros

### 🔄 Em Desenvolvimento
- Upload de imagens
- Sistema de avaliações
- Chat entre cliente e freelancer
- Sistema de propostas
- Notificações push
- Filtros geográficos

## 📋 Guias Específicos

### Para Desenvolvedores
- **[Backend README](./freela-facil/README.md)** - Documentação técnica da API
- **[Frontend README](./freela-front/README.md)** - Documentação do app mobile
- **[Busca Avançada](./freela-facil/SEARCH_USAGE.md)** - Guia da funcionalidade de busca

### Para Setup
- **[Configuração](./freela-front/SETUP-INSTRUCTIONS.md)** - Instruções de instalação
- **[Solução de Problemas](./freela-front/ERROR-FIX.md)** - Guia de troubleshooting

### Para Usuários
- **[README Principal](./README.md)** - Visão geral do projeto

## 🔧 Comandos Úteis

### Backend
```bash
npm run start:dev     # Desenvolvimento
npm run build         # Build para produção
npm run test          # Executar testes
npm run migration:run # Executar migrações
```

### Frontend
```bash
npm start            # Iniciar Expo
npm run android      # Executar no Android
npm run ios          # Executar no iOS
expo start --clear   # Limpar cache
```

## 📊 Status do Projeto

- ✅ **Backend API** - Funcionando (porta 3000)
- ✅ **Banco de Dados** - Conectado (Neon PostgreSQL)
- ✅ **Autenticação** - JWT implementado
- ✅ **Mobile App** - Funcionando (Expo SDK 54)
- ✅ **Integração** - Frontend/Backend conectados
- ✅ **Busca Avançada** - Implementada e testada

## 🤝 Contribuição

1. **Fork** o repositório
2. **Crie uma branch** para sua feature
3. **Implemente** as mudanças
4. **Teste** thoroughly
5. **Abra um Pull Request**

## 📞 Suporte

Para dúvidas específicas, consulte:
- Issues do GitHub
- Documentação técnica específica
- Guias de solução de problemas

---

**FreelaFácil** - Conectando freelancers de forma simples e eficiente! 🚀

**Link para expo versão 51**
https://expo.dev/go?sdkVersion=51&platform=android&device=true


<img width="100" height="100" alt="image" src="https://github.com/user-attachments/assets/f8212aa7-0082-42cf-a661-145c370340b2" />
