# Architecture

O frontend segue uma organização por responsabilidade:

- `app`: bootstrap da aplicação, providers e roteamento
- `components`: UI reutilizável, layouts e blocos por domínio
- `pages`: páginas de rota, mantidas finas e compostas por componentes
- `services`: integração com API e adaptadores de infraestrutura
- `stores`: estado global com Zustand
- `hooks`: composição de comportamento compartilhado
- `types`: contratos tipados da camada de domínio

## Princípios

- Apenas frontend, sem criação de backend novo
- Código tipado com TypeScript
- Componentes desacoplados e reutilizáveis
- Layout premium e responsivo
- Fetch API nativa com `credentials: "include"`
- Preparado para multi-tenant e code splitting

