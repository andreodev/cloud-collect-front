"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Check } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      features: [
        "Até 50 cobranças/mês",
        "1 usuário",
        "Relatórios básicos",
        "Suporte por email"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 97",
      period: "/mês",
      popular: true,
      features: [
        "Cobranças ilimitadas",
        "Até 5 usuários",
        "Insights de IA",
        "WhatsApp integrado",
        "Relatórios avançados",
        "Suporte prioritário"
      ]
    },
    {
      id: "empresarial",
      name: "Empresarial",
      price: "R$ 297",
      period: "/mês",
      features: [
        "Tudo do Pro +",
        "Usuários ilimitados",
        "API personalizada",
        "Gerente de sucesso",
        "SLA garantido",
        "White label"
      ]
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a autenticação real
    // Por enquanto, apenas redireciona
    toast.success("Login realizado com sucesso!");
    router.push("/");
  };

  const handleCreateCompany = async () => {
    // Aqui você faria o cadastro real
    setShowCompanyModal(false);
    toast.success("Conta criada com sucesso!");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563eb]/5 via-background to-[#22c55e]/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 rounded-3xl border-border shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-primary mb-2">Cloud Collect</h1>
          <p className="text-muted-foreground">
            Gestão financeira inteligente para seu negócio
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Criar Conta</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <Button type="submit" className="w-full rounded-xl">
                Entrar
              </Button>

              <button
                type="button"
                className="w-full text-sm text-primary hover:underline"
              >
                Esqueceu sua senha?
              </button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCompanyModal(true); }}>
              <div>
                <Label htmlFor="signup-name">Nome Completo</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="João Silva"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Senha</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <Button type="submit" className="w-full rounded-xl">
                Criar Conta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Company Creation Modal */}
      <Dialog open={showCompanyModal} onOpenChange={setShowCompanyModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>Escolha seu plano</DialogTitle>
            <DialogDescription>
              Selecione o plano ideal para o seu negócio
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-6 rounded-2xl cursor-pointer transition-all relative ${
                  selectedPlan === plan.id
                    ? "border-primary shadow-lg scale-105"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    Mais Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCompanyModal(false)}
              className="flex-1 rounded-xl"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateCompany} className="flex-1 rounded-xl">
              Começar com {plans.find(p => p.id === selectedPlan)?.name}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
