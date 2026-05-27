# ImovFacil Marketplace Frontend

Frontend inicial do **ImovFacil Marketplace**, construído com React, TypeScript, Vite, TailwindCSS, shadcn/ui, TanStack Query, Zustand, React Router DOM, React Hook Form, Zod e Mapbox GL JS.

## Objetivo desta base

- Estruturar a homepage split-view com filtros, mapa e listagem lateral
- Preparar autenticação frontend com Better Auth via Fetch API nativa
- Organizar suporte multi-tenant com `x-organization-id`
- Criar dashboards público, tenant e admin com roteamento protegido
- Documentar as pendências de backend identificadas no MVP

## Como executar

1. Instale as dependências.
2. Configure o arquivo `.env`.
3. Inicie o ambiente de desenvolvimento.

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste os valores conforme seu ambiente local.

## Observações importantes

- O frontend usa `credentials: "include"` em todas as chamadas de API.
- A camada de imóveis do MVP inicial usa dados mockados no frontend porque os endpoints de imóveis não foram fornecidos no PRD.
- Os arquivos `page_home.html`, `page_login.html` e `page_singup.html` não estavam presentes no repositório; a implementação visual foi baseada na descrição funcional do PRD.

## Estrutura

- `src/app`: inicialização, providers e router
- `src/components`: UI, layout, mapa, imóveis, filtros, auth e componentes comuns
- `src/pages`: páginas públicas, auth, property, dashboard e admin
- `src/routes`: guards, error boundary e roteamento
- `src/services`: wrapper de fetch e serviços da API
- `src/stores`: estado global com Zustand
- `docs`: arquitetura e pendências

