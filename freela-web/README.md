# 🌐 FreelaFácil Web

Versão web do aplicativo FreelaFácil, desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Navegação
- **Styled Components** - Estilização
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Backend API rodando (porta 3000)

## ⚙️ Instalação

1. **Clone o repositório** (se ainda não fez)
```bash
git clone <seu-repositorio>
cd freela-web
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🏃 Executando

### Modo Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3001

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
freela-web/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   └── JobCard.tsx
│   ├── pages/           # Páginas da aplicação
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── CreateJobPage.tsx
│   │   ├── JobDetailsPage.tsx
│   │   └── ProfilePage.tsx
│   ├── services/        # Serviços de API
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── job.ts
│   ├── styles/          # Estilos globais
│   │   └── GlobalStyles.ts
│   ├── types/           # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Funcionalidades

### ✅ Implementadas
- Sistema de autenticação (login/registro)
- Listagem de trabalhos
- Busca de trabalhos
- Detalhes do trabalho
- Criação de trabalhos
- Perfil do usuário
- Meus trabalhos
- Contato via WhatsApp
- Rotas protegidas
- Interceptors de autenticação

### 🔄 Próximas Features
- Edição de perfil
- Edição de trabalhos
- Upload de imagens
- Filtros avançados
- Sistema de avaliações
- Notificações

## 🔐 Autenticação

A aplicação usa JWT (JSON Web Tokens) para autenticação:
- Token armazenado no `localStorage`
- Interceptor Axios adiciona token automaticamente
- Redirecionamento automático em caso de token expirado

## 🎨 Estilização

Utiliza **Styled Components** para estilização:
- Componentes estilizados
- Tema de cores centralizado
- Responsividade
- Hover effects e transições

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔗 Integração com Backend

A aplicação se conecta com a API NestJS:
- Base URL configurável via `.env`
- Timeout de 10 segundos
- Tratamento de erros
- Interceptors de request/response

### Endpoints Utilizados

- `POST /auth/login` - Login
- `POST /users` - Registro
- `GET /jobs` - Listar trabalhos
- `GET /jobs/:id` - Detalhes do trabalho
- `POST /jobs` - Criar trabalho
- `GET /jobs/my-jobs` - Trabalhos do usuário
- `PATCH /jobs/:id` - Atualizar trabalho
- `DELETE /jobs/:id` - Deletar trabalho

## 🐛 Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, certifique-se de que o backend está configurado para aceitar requisições da origem do frontend.

### API não conecta
Verifique se:
1. O backend está rodando na porta 3000
2. A variável `VITE_API_BASE_URL` está correta no `.env`
3. Não há firewall bloqueando a conexão

### Build falha
Limpe o cache e reinstale:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Executa linter

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é parte do FreelaFácil.

---

**FreelaFácil Web** - Conectando freelancers de forma simples e eficiente! 🚀
