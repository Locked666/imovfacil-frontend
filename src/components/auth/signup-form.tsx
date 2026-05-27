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
import { Select } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"

const signupSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
  phone: z.string().optional(),
  role: z.enum(["USER", "BROKER", "AGENCY"]),
})

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const navigate = useNavigate()
  const { signUp, error } = useAuth()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "USER",
    },
  })

  const mutation = useMutation({
    mutationFn: (values: SignupFormValues) => signUp(values),
    onSuccess: () => {
      navigate("/dashboard")
    },
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return (
    <Card className="w-full max-w-md border-border/70 shadow-xl">
      <CardHeader>
        <CardTitle>Criar sua conta</CardTitle>
        <CardDescription>
          Estruture sua operação com suporte a tenant, equipe e anúncios premium.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" placeholder="Seu nome" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signup-email">E-mail</Label>
          <Input id="signup-email" type="email" placeholder="voce@imovfacil.com" {...form.register("email")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="signup-password">Senha</Label>
          <Input id="signup-password" type="password" placeholder="••••••••" {...form.register("password")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" placeholder="(65) 99999-0000" {...form.register("phone")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Tipo de conta</Label>
          <Select id="role" {...form.register("role")}>
            <option value="USER">Usuário</option>
            <option value="BROKER">Corretor</option>
            <option value="AGENCY">Imobiliária</option>
          </Select>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button className="w-full" onClick={onSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="animate-spin" /> : null}
          Criar conta
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Já possui cadastro?{" "}
          <Link to="/login" className="font-medium text-foreground hover:underline">
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
