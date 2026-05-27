import { Link } from "react-router-dom"

import { AppLogo } from "@/components/common/app-logo"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="mx-auto lg:mx-0">
          <AppLogo />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Novo cadastro
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Crie sua conta e comece a anunciar
          </h1>
          <p className="text-sm text-muted-foreground">
            Estrutura preparada para corretores, imobiliárias e operações multi-tenant.
          </p>
        </div>
      </div>
      <SignupForm />
      <p className="text-center text-sm text-muted-foreground lg:text-left">
        <Link to="/" className="font-medium text-foreground hover:underline">
          Voltar para a home
        </Link>
      </p>
    </div>
  )
}

