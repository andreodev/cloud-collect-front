import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Check, Crown, Users, Building2, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      description: "Ideal para começar",
      features: [
        "Até 50 cobranças/mês",
        "1 usuário",
        "Relatórios básicos",
        "Suporte por email",
        "Dashboard simplificado",
      ],
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 97",
      period: "/mês",
      description: "Mais popular",
      popular: true,
      features: [
        "Cobranças ilimitadas",
        "Até 5 usuários",
        "Insights de IA",
        "WhatsApp integrado",
        "Relatórios avançados",
        "Suporte prioritário",
        "API de integração",
        "Personalização de marca",
      ],
      current: true,
    },
    {
      id: "empresarial",
      name: "Empresarial",
      price: "R$ 297",
      period: "/mês",
      description: "Para grandes empresas",
      features: [
        "Tudo do Pro +",
        "Usuários ilimitados",
        "API personalizada",
        "Gerente de sucesso dedicado",
        "SLA garantido 99.9%",
        "White label completo",
        "Treinamento personalizado",
        "Múltiplas empresas",
        "Relatórios customizados",
      ],
      current: false,
    },
  ];

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "Administrador",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "Editor",
      status: "active",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      role: "Visualizador",
      status: "pending",
    },
  ];

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informações da empresa atualizadas!");
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Convite enviado com sucesso!");
  };

  const handleUpgradePlan = (planName: string) => {
    toast.success(`Upgrade para plano ${planName} iniciado!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-1">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="rounded-xl mb-6">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="plans" className="gap-2">
            <Crown className="w-4 h-4" />
            Planos
          </TabsTrigger>
        </TabsList>

        {/* Company Tab */}
        <TabsContent value="company">
          <Card className="p-6 rounded-2xl border-border">
            <h3 className="mb-6">Informações da Empresa</h3>

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    defaultValue="Minha Empresa Ltda"
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    defaultValue="12.345.678/0001-99"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contato@minhaempresa.com"
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    defaultValue="(11) 98765-4321"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  defaultValue="Rua Exemplo, 123 - São Paulo, SP"
                  className="mt-1 rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    defaultValue="São Paulo"
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    defaultValue="SP"
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    defaultValue="01234-567"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="rounded-xl">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <div className="space-y-6">
            <Card className="p-6 rounded-2xl border-border">
              <h3 className="mb-6">Convidar Novo Usuário</h3>

              <form onSubmit={handleInviteUser} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-name">Nome</Label>
                    <Input
                      id="user-name"
                      placeholder="Nome completo"
                      className="mt-1 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="email@exemplo.com"
                      className="mt-1 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="gap-2 rounded-xl">
                    <Mail className="w-4 h-4" />
                    Enviar Convite
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6 rounded-2xl border-border">
              <h3 className="mb-6">Usuários Ativos</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left pb-4 text-muted-foreground">Nome</th>
                      <th className="text-left pb-4 text-muted-foreground">Email</th>
                      <th className="text-left pb-4 text-muted-foreground">Função</th>
                      <th className="text-left pb-4 text-muted-foreground">Status</th>
                      <th className="text-right pb-4 text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-0">
                        <td className="py-4">{user.name}</td>
                        <td className="py-4 text-muted-foreground">{user.email}</td>
                        <td className="py-4 text-muted-foreground">{user.role}</td>
                        <td className="py-4">
                          <Badge
                            className={`rounded-lg ${
                              user.status === "active"
                                ? "bg-[#22c55e]/10 text-[#22c55e]"
                                : "bg-[#facc15]/10 text-[#facc15]"
                            }`}
                          >
                            {user.status === "active" ? "Ativo" : "Pendente"}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans">
          <div className="space-y-6">
            <Card className="p-6 rounded-2xl border-primary bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Plano Atual: Pro</h3>
                  <p className="text-muted-foreground text-sm">
                    Você está aproveitando todos os recursos do plano Pro
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Próxima cobrança</p>
                  <p>20/11/2025</p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`p-6 rounded-2xl relative overflow-hidden transition-all ${
                    plan.current
                      ? "border-primary shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {plan.popular && !plan.current && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-xl text-sm">
                      Mais Popular
                    </div>
                  )}

                  {plan.current && (
                    <div className="absolute top-0 right-0 bg-[#22c55e] text-white px-3 py-1 rounded-bl-xl text-sm">
                      Plano Atual
                    </div>
                  )}

                  <div className="text-center mb-6 pt-4">
                    <h3 className="mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.current ? (
                    <Button variant="outline" className="w-full rounded-xl" disabled>
                      Plano Ativo
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-xl"
                      variant={plan.id === "empresarial" ? "default" : "outline"}
                      onClick={() => handleUpgradePlan(plan.name)}
                    >
                      {plan.id === "free" ? "Fazer Downgrade" : "Fazer Upgrade"}
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            <Card className="p-6 rounded-2xl border-border">
              <h3 className="mb-4">Comparativo de Planos</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left pb-3 text-muted-foreground">Recurso</th>
                      <th className="text-center pb-3 text-muted-foreground">Free</th>
                      <th className="text-center pb-3 text-muted-foreground">Pro</th>
                      <th className="text-center pb-3 text-muted-foreground">Empresarial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3">Cobranças/mês</td>
                      <td className="py-3 text-center text-muted-foreground">50</td>
                      <td className="py-3 text-center text-[#22c55e]">Ilimitado</td>
                      <td className="py-3 text-center text-[#22c55e]">Ilimitado</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">Usuários</td>
                      <td className="py-3 text-center text-muted-foreground">1</td>
                      <td className="py-3 text-center text-muted-foreground">5</td>
                      <td className="py-3 text-center text-[#22c55e]">Ilimitado</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">Insights de IA</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">WhatsApp integrado</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">API personalizada</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3">Gerente de sucesso</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center">-</td>
                      <td className="py-3 text-center"><Check className="w-4 h-4 text-[#22c55e] mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
