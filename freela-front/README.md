# FreelaFácil - React Native Mobile App

Esta é uma aplicação mobile desenvolvida com React Native (Expo) para conectar freelancers com oportunidades de trabalho.

## 🚀 Funcionalidades

- ✅ Tela de Splash com logo e navegação automática
- ✅ Sistema de autenticação completo (Login/Cadastro)
- ✅ Login com telefone e senha
- ✅ Cadastro com nome, endereço, telefone, senha e email opcional
- ✅ Listagem de trabalhos disponíveis com refresh
- ✅ Detalhes completos de trabalhos
- ✅ Botão para contato direto via WhatsApp
- ✅ Cadastro de novos trabalhos
- ✅ Perfil do usuário com informações e trabalhos publicados
- ✅ Sistema de logout seguro

## 🛠 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegação entre telas
- **Styled Components** - Estilização de componentes
- **AsyncStorage** - Armazenamento local para tokens JWT
- **Axios** - Cliente HTTP para consumo de API
- **TypeScript** - Tipagem estática
- **@expo/vector-icons** - Ícones para a interface

## 📱 Fluxo da Aplicação

```
Splash → Login → Home (listagem) → Detalhes → Cadastro → Perfil
```

## 🏗 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── JobCard.tsx     # Card de trabalho na listagem
├── navigation/          # Configuração de navegação
│   ├── AppNavigator.tsx # Navegação principal (Stack)
│   └── TabNavigator.tsx # Navegação por abas
├── screens/            # Telas da aplicação
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── JobDetailsScreen.tsx
│   ├── CreateJobScreen.tsx
│   └── ProfileScreen.tsx
├── services/           # Serviços de API e autenticação
│   ├── api.ts         # Configuração do Axios
│   ├── auth.ts        # Serviços de autenticação
│   └── job.ts         # Serviços de trabalhos
├── types/             # Tipagens TypeScript
│   └── index.ts       # Tipos e interfaces
└── utils/             # Utilitários (se necessário)
```

## 🚦 Como executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Dispositivo Android/iOS ou emulador configurado
- **Expo Go SDK 54** instalado no dispositivo

### Instalação

1. **Clone o repositório (se aplicável)**
```bash
git clone <url-do-repositorio>
cd freela-front
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.example` para `.env`
   ```bash
   cp .env.example .env
   ```
   - Edite o arquivo `.env` e configure a URL da sua API:
   ```
   API_BASE_URL=http://SEU_IP:3000
   ```

4. **Inicie o projeto**
```bash
npm start
# ou
yarn start
# ou
expo start
```

5. **Execute no dispositivo**
   - Use o aplicativo Expo Go no seu celular para escanear o QR Code
   - Ou pressione `a` para Android ou `i` para iOS (com emulador configurado)

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador (web)

## ⚙️ Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz do projeto:

```bash
# API Configuration
API_BASE_URL=http://192.168.0.202:3000
```

### Configuração para diferentes ambientes:

- **Desenvolvimento local**: Use o IP da sua máquina (ex: `http://192.168.0.202:3000`)
- **Emulador Android**: Use `http://10.0.2.2:3000`
- **Emulador iOS**: Use `http://localhost:3000`
- **Produção**: Use a URL do seu servidor (ex: `https://api.freelafacil.com`)

## 🌐 Backend Integration

A aplicação está configurada para consumir uma API NestJS com os seguintes endpoints:

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Cadastro de usuário

### Trabalhos
- `GET /jobs` - Listar todos os trabalhos
- `GET /jobs/:id` - Obter detalhes de um trabalho
- `POST /jobs` - Criar novo trabalho (autenticado)
- `GET /jobs/my-jobs` - Listar trabalhos do usuário (autenticado)
- `DELETE /jobs/:id` - Excluir trabalho (autenticado)

### Autenticação JWT
- Token salvo no AsyncStorage
- Interceptor automático para adicionar token nas requisições
- Renovação automática em caso de expiração

## 📋 Funcionalidades Detalhadas

### Tela de Splash
- Logo da aplicação
- Verificação automática de autenticação
- Redirecionamento inteligente (Login ou Home)

### Sistema de Login/Cadastro
- Validação de campos obrigatórios
- Autenticação com telefone e senha
- Cadastro com campos opcionais (email)
- Feedback visual durante carregamento

### Listagem de Trabalhos
- Pull-to-refresh para atualizar
- Cards com informações principais
- Navegação para detalhes
- Lista vazia com mensagem informativa

### Detalhes do Trabalho
- Informações completas do trabalho
- Dados de contato do autor
- Botão direto para WhatsApp
- Tratamento de erro para WhatsApp não instalado

### Cadastro de Trabalho
- Formulário validado
- Formatação automática de valores
- Feedback de sucesso/erro
- Limpeza automática após sucesso

### Perfil do Usuário
- Informações pessoais
- Lista de trabalhos publicados
- Logout seguro com confirmação
- Avatar baseado na inicial do nome

## 🎨 Design System

### Cores
- **Primária**: #007AFF (azul iOS)
- **Sucesso**: #25D366 (verde WhatsApp)
- **Erro**: #FF3B30 (vermelho)
- **Background**: #f5f5f5 (cinza claro)
- **Cards**: #ffffff (branco)

### Tipografia
- **Títulos**: 24px, bold
- **Subtítulos**: 18px, bold
- **Texto**: 16px, regular
- **Legendas**: 14px, regular

### Componentes
- **Botões**: Bordas arredondadas (8px)
- **Cards**: Sombra sutil e bordas arredondadas
- **Inputs**: Background claro com bordas suaves

## 📱 Assets Necessários

⚠️ **Importante**: Os seguintes arquivos de imagem precisam ser criados:

- `assets/icon.png` - Ícone do app (1024x1024px)
- `assets/splash.png` - Tela de splash
- `assets/adaptive-icon.png` - Ícone adaptativo Android
- `assets/favicon.png` - Favicon para web

## 🔒 Segurança

- Tokens JWT armazenados de forma segura no AsyncStorage
- Interceptadores para renovação automática de token
- Validação de entrada em todos os formulários
- Logout seguro com limpeza completa de dados

## 🚀 Deploy

### Para Production (EAS Build)
```bash
npm install -g eas-cli
eas build --platform all
```

### Para Development (Expo Dev Client)
```bash
expo install expo-dev-client
expo run:android
# ou
expo run:ios
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do GitHub.

---

**FreelaFácil** - Conectando freelancers de forma simples e eficiente! 🚀