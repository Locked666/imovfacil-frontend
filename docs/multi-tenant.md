# Multi-Tenant

O frontend já aplica o contexto de tenant com:

- Store persistida com o `activeOrganizationId`
- Header `x-organization-id` em toda requisição
- Busca inicial de organizações em `GET /api/v1/organizations/`
- Fluxo de troca de organização em `POST /api/v1/organizations/switch`

## Observação

O formato exato do payload de `POST /api/v1/organizations/switch` deve ser validado com o backend. A implementação atual envia `organizationId` no corpo JSON.

