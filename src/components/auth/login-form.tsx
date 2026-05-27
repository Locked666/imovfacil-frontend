import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const { signIn, error } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues) => signIn(values),
    onSuccess: () => {
      navigate("/dashboard")
    },
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return (
    <Card className="w-full max-w-md border-border/70 shadow-xl">
      <CardHeader>
        <CardTitle>Entrar na sua conta</CardTitle>
        <CardDescription>
          Acesse sua organização e gerencie imóveis, leads e financeiro.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="voce@imovfacil.com" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="••••••••" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button className="w-full" onClick={onSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="animate-spin" /> : null}
          Entrar
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link to="/signup" className="font-medium text-foreground hover:underline">
            Criar agora
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
