# Backend Pending Adjustments

## 1. Endpoints de imóveis ausentes

- **Problema:** O PRD exige listagem, detalhe, criação e gestão de imóveis, mas o contrato de API fornecido no escopo não inclui endpoints de imóveis.
- **Motivo:** O frontend precisa consumir a fonte real de dados para sair do mock inicial.
- **Solução recomendada:** Expor endpoints REST para listagem, detalhe, criação, atualização, exclusão e busca de imóveis.
- **Impacto técnico:** A camada `property.service.ts` e o dashboard de imóveis serão conectados a dados reais.
- **Prioridade:** Alta

## 2. Contrato de troca de organização

- **Problema:** O endpoint `POST /api/v1/organizations/switch` foi informado, mas o payload e a forma de resposta não foram especificados.
- **Motivo:** O frontend precisa saber o formato exato do corpo e do retorno para sincronizar o tenant ativo com segurança.
- **Solução recomendada:** Documentar o payload oficial e a resposta esperada do switch.
- **Impacto técnico:** Evita divergência entre frontend e backend no fluxo multi-tenant.
- **Prioridade:** Alta

## 3. Lead, financeiro e admin sem contratos públicos

- **Problema:** O PRD lista módulos de leads, financeiro, usuários, planos e métricas, mas não há endpoints definidos para a primeira entrega.
- **Motivo:** Sem contrato, o frontend só pode exibir a estrutura e não os dados reais.
- **Solução recomendada:** Definir endpoints para cada domínio administrativo e publicar os schemas de resposta.
- **Impacto técnico:** Permite substituir os placeholders por tabelas, gráficos e formulários conectados.
- **Prioridade:** Média

## 4. Resposta de sessão do Better Auth

- **Problema:** O frontend assume que `GET /api/v1/auth/session` e `GET /api/v1/users/me` conseguem reconstruir o estado autenticado após login.
- **Motivo:** A camada de refresh depende dessa leitura pós-cookie.
- **Solução recomendada:** Validar e documentar o shape final das respostas da sessão e do usuário atual.
- **Impacto técnico:** Evita inconsistências no bootstrap de autenticação.
- **Prioridade:** Média

