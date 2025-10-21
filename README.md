
# Cloud Collect Front

Este é o frontend do sistema Cloud Collect, desenvolvido com Next.js e TypeScript. O objetivo é fornecer uma interface moderna e responsiva para gestão financeira, incluindo fluxo de caixa, cobranças, relatórios e configurações.

## Principais Tecnologias

- **Next.js**: Framework React para aplicações web modernas.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **ESLint**: Padronização e qualidade de código.
- **PostCSS**: Processamento avançado de CSS.
- **Vercel**: Deploy e hospedagem otimizada para projetos Next.js.

## Estrutura de Pastas

- `src/app`: Rotas e layouts principais da aplicação.
  - `auth`: Tela de login.
  - `dashboard`: Área principal do usuário, com sub-rotas para fluxo de caixa, cobranças, relatórios e configurações.
- `src/components`: Componentes reutilizáveis, incluindo widgets, cards, UI e páginas.
- `src/hooks`: Hooks customizados para autenticação, animações e notificações.
- `src/lib`: Funções utilitárias.
- `src/service`: Serviços de integração com API.
- `src/store`: Gerenciamento de estado global (Redux).
- `public`: Arquivos estáticos e imagens.

## Funcionalidades

- Autenticação de usuários
- Dashboard financeiro com KPIs
- Gestão de fluxo de caixa
- Controle de cobranças
- Relatórios detalhados
- Configurações personalizáveis
- Componentes de UI modernos e responsivos

## Como rodar o projeto

1. Instale as dependências:
	```zsh
	npm install
	```
2. Inicie o servidor de desenvolvimento:
	```zsh
	npm run dev
	```
3. Acesse em `http://localhost:3000`.

## Deploy

O projeto está configurado para deploy automático na Vercel. Basta conectar o repositório e seguir as instruções da plataforma.

## Contribuição

1. Fork este repositório.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Faça suas alterações e commit.
4. Envie um pull request.

## Licença

Este projeto está sob a licença MIT.
