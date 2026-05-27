import { Link } from "react-router-dom"

import { AppLogo } from "@/components/common/app-logo"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="mx-auto lg:mx-0">
          <AppLogo />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Acesso seguro
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Entre no ImovFacil Marketplace
          </h1>
          <p className="text-sm text-muted-foreground">
            Utilize sua sessão HTTP-only para acessar o dashboard e as operações do tenant.
          </p>
        </div>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground lg:text-left">
        <Link to="/" className="font-medium text-foreground hover:underline">
          Voltar para a home
        </Link>
      </p>
    </div>
  )
}

