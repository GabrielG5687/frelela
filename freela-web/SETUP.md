# 🚀 Guia de Setup - FreelaFácil Web

## Passo a Passo para Rodar o Projeto

### 1. Certifique-se que o Backend está Rodando

Antes de iniciar o frontend web, o backend precisa estar ativo:

```bash
cd freela-facil
npm run start:dev
```

O backend deve estar rodando em: http://localhost:3000

### 2. Instale as Dependências

```bash
cd freela-web
npm install
```

### 3. Configure o Ambiente

O arquivo `.env` já está configurado com:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Se o backend estiver em outra porta ou servidor, ajuste conforme necessário.

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3001

### 5. Acesse a Aplicação

Abra seu navegador e acesse: http://localhost:3001

## 🎯 Primeiro Acesso

### Criar uma Conta

1. Clique em "Não tem conta? Cadastre-se"
2. Preencha os dados:
   - Nome completo
   - Email
   - Telefone
   - Endereço
   - Senha
3. Clique em "Cadastrar"

### Fazer Login

1. Use o email e senha cadastrados
2. Clique em "Entrar"

## 📱 Funcionalidades Disponíveis

### Home (Trabalhos)
- Visualize todos os trabalhos disponíveis
- Use a barra de busca para filtrar
- Clique em um card para ver detalhes

### Criar Trabalho
- Clique em "Criar Trabalho" no menu
- Preencha título, descrição e valor
- Clique em "Criar Trabalho"

### Perfil
- Visualize seus dados
- Veja seus trabalhos publicados
- Edite seu perfil (em breve)

### Detalhes do Trabalho
- Veja informações completas
- Dados do contratante
- Botão para contato via WhatsApp

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
```

### Build
```bash
npm run build        # Cria build de produção
npm run preview      # Preview da build
```

### Linting
```bash
npm run lint         # Verifica código
```

## 🐛 Problemas Comuns

### Erro: "Network Error"
**Causa:** Backend não está rodando ou URL incorreta
**Solução:** 
1. Verifique se o backend está ativo em http://localhost:3000
2. Confirme a variável VITE_API_BASE_URL no .env

### Erro: "Cannot GET /"
**Causa:** Servidor não iniciou corretamente
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erro de CORS
**Causa:** Backend não está configurado para aceitar requisições do frontend
**Solução:** Verifique as configurações de CORS no backend (main.ts)

### Página em branco
**Causa:** Erro de JavaScript no console
**Solução:**
1. Abra o DevTools (F12)
2. Verifique o console para erros
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

## 🌐 Acessando de Outros Dispositivos

Para acessar de outros dispositivos na mesma rede:

1. Descubra seu IP local:
```bash
# Linux/Mac
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Acesse de outro dispositivo:
```
http://SEU_IP:3001
```

3. Atualize o .env se necessário:
```env
VITE_API_BASE_URL=http://SEU_IP:3000
```

## 📊 Estrutura de Navegação

```
Login/Registro (público)
    ↓
Home (privado)
    ├── Criar Trabalho
    ├── Detalhes do Trabalho
    └── Perfil
        └── Meus Trabalhos
```

## 🔐 Segurança

- Tokens JWT armazenados no localStorage
- Rotas protegidas com PrivateRoute
- Redirecionamento automático ao expirar token
- Interceptors para adicionar token automaticamente

## 💡 Dicas

1. **Desenvolvimento:** Use React DevTools para debug
2. **Performance:** Build de produção é otimizada e minificada
3. **Hot Reload:** Mudanças no código recarregam automaticamente
4. **TypeScript:** Aproveite a tipagem para evitar erros

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do terminal
3. Consulte o README.md
4. Verifique se o backend está funcionando

---

Pronto! Agora você tem a versão web do FreelaFácil rodando! 🎉
