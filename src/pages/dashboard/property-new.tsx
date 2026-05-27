import { SectionPage } from "@/components/common/section-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DashboardPropertyNewPage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="Novo imóvel"
      description="Estrutura base do formulário para cadastro de anúncio, preparada para integração futura com o backend."
    >
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados do anúncio</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Casa com piscina e área gourmet" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="purpose">Tipo</Label>
            <Select id="purpose">
              <option>Venda</option>
              <option>Locação</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select id="category">
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Fazenda</option>
              <option>Terreno</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Preço</Label>
            <Input id="price" type="number" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" placeholder="Cuiabá" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Descreva os diferenciais do imóvel..." />
          </div>
          <div className="md:col-span-2">
            <Button type="button">Salvar rascunho</Button>
          </div>
        </CardContent>
      </Card>
    </SectionPage>
  )
}

