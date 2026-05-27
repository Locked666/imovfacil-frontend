# Auth

## Endpoints usados

- `POST /api/v1/auth/sign-in/email`
- `POST /api/v1/auth/sign-up/email`
- `GET /api/v1/auth/session`
- `GET /api/v1/users/me`

## Comportamento

- Cookies HTTP-only
- `credentials: "include"` em todas as requisições
- Refresh de sessão no carregamento do app
- Store global para sessão e usuário
- Guards protegidos para áreas privadas e admin

