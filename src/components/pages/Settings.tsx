import { useState } from "react";
import { useWhatsappTemplate } from "../../store/whatsappTemplate";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Check, Crown, Users, Building2, Mail, Trash2, MessageSquare, Copy, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const { template, setTemplate } = useWhatsappTemplate();
  const [whatsappMessage, setWhatsappMessage] = useState(template);

  const parameters = [
    { key: "{{nome}}", description: "Nome do cliente", example: "João Silva" },
    { key: "{{empresa}}", description: "Nome da empresa do cliente", example: "ABC Comércio Ltda" },
    { key: "{{valor}}", description: "Valor da cobrança", example: "R$ 1.500,00" },
    { key: "{{vencimento}}", description: "Data de vencimento", example: "25/10/2025" },
    { key: "{{dias_vencido}}", description: "Dias em atraso (se vencido)", example: "5 dias" },
    { key: "{{link_pagamento}}", description: "Link para pagamento", example: "https://pay.com/abc123" },
    { key: "{{numero_cobranca}}", description: "Número da cobrança", example: "#12345" },
    { key: "{{empresa_nome}}", description: "Nome da sua empresa", example: "Minha Empresa Ltda" },
    { key: "{{empresa_telefone}}", description: "Telefone da sua empresa", example: "(11) 98765-4321" },
  ];

  const templates = [
    {
      name: "Cobrança Padrão",
      message: "Olá {{nome}}! 👋\n\nEsta é uma mensagem da {{empresa_nome}}.\n\nIdentificamos um pagamento pendente:\n\n💰 Valor: {{valor}}\n📅 Vencimento: {{vencimento}}\n\n{{link_pagamento}}\n\nQualquer dúvida, estamos à disposição!\n\nAtenciosamente,\n{{empresa_nome}}\n📞 {{empresa_telefone}}"
    },
    {
      name: "Lembrete Amigável",
      message: "Oi {{nome}}! 😊\n\nTudo bem? Passando aqui para lembrar do pagamento:\n\n💰 {{valor}}\n📅 Vence em: {{vencimento}}\n\nVocê pode pagar pelo link:\n{{link_pagamento}}\n\nObrigado!"
    },
    {
      name: "Cobrança Vencida",
      message: "Olá {{nome}},\n\n⚠️ Notamos que seu pagamento está vencido há {{dias_vencido}}.\n\n💰 Valor: {{valor}}\n📅 Vencimento: {{vencimento}}\n\nPara regularizar:\n{{link_pagamento}}\n\nContamos com você!\n\n{{empresa_nome}}"
    },
    {
      name: "Formal",
      message: "Prezado(a) {{nome}},\n\nSeguem os dados para pagamento:\n\nCobrança: {{numero_cobranca}}\nValor: {{valor}}\nVencimento: {{vencimento}}\n\nLink de pagamento:\n{{link_pagamento}}\n\nAtenciosamente,\n{{empresa_nome}}\nTelefone: {{empresa_telefone}}"
    }
  ];

  const getPreviewMessage = () => {
    let preview = whatsappMessage;

    // Replace parameters with example data
    preview = preview.replace(/{{nome}}/g, "João Silva");
    preview = preview.replace(/{{empresa}}/g, "ABC Comércio Ltda");
    preview = preview.replace(/{{valor}}/g, "R$ 1.500,00");
    preview = preview.replace(/{{vencimento}}/g, "25/10/2025");
    preview = preview.replace(/{{dias_vencido}}/g, "5 dias");
    preview = preview.replace(/{{link_pagamento}}/g, "https://pay.cobrafacil.com/abc123");
    preview = preview.replace(/{{numero_cobranca}}/g, "#12345");
    preview = preview.replace(/{{empresa_nome}}/g, "Minha Empresa Ltda");
    preview = preview.replace(/{{empresa_telefone}}/g, "(11) 98765-4321");

    return preview;
  };

  const copyParameter = (param: string) => {
    navigator.clipboard.writeText(param);
    toast.success(`Parâmetro ${param} copiado!`);
  };

  const saveWhatsappMessage = () => {
    setTemplate(whatsappMessage);
    toast.success("Mensagem do WhatsApp salva com sucesso!");
  };

  const sendTestMessage = () => {
    toast.success("Mensagem de teste enviada para seu WhatsApp!");
  };

  const applyTemplate = (templateMessage: string) => {
    setWhatsappMessage(templateMessage);
    setTemplate(templateMessage);
    toast.success("Template aplicado!");
  };

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
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="rounded-xl mb-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 h-auto sm:h-10">
          <TabsTrigger value="whatsapp" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Empresa</span>
            <span className="sm:hidden">Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Usuários</span>
            <span className="sm:hidden">Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="plans" className="gap-2">
            <Crown className="w-4 h-4" />
            <span className="hidden sm:inline">Planos</span>
            <span className="sm:hidden">Planos</span>
          </TabsTrigger>
        </TabsList>

        {/* WhatsApp Tab */}
        <TabsContent value="whatsapp">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Section */}
            <div className="space-y-6">
              {/* Message Editor */}
              <Card className="p-4 sm:p-6 rounded-2xl border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3>Editor de Mensagem</h3>
                  <Badge className="bg-[#25D366]/10 text-[#25D366] rounded-lg">
                    WhatsApp
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="whatsapp-message">Mensagem</Label>
                    <Textarea
                      id="whatsapp-message"
                      value={whatsappMessage}
                      onChange={(e) => setWhatsappMessage(e.target.value)}
                      className="mt-1 rounded-xl min-h-[300px] font-mono text-sm"
                      placeholder="Digite sua mensagem aqui..."
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Use os parâmetros abaixo para personalizar a mensagem
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={saveWhatsappMessage}
                      className="flex-1 rounded-xl gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Salvar Mensagem
                    </Button>
                    <Button
                      onClick={sendTestMessage}
                      variant="outline"
                      className="rounded-xl gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Testar
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Parameters */}
              <Card className="p-4 sm:p-6 rounded-2xl border-border">
                <h3 className="mb-4">Parâmetros Disponíveis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Clique para copiar e cole no editor de mensagem
                </p>

                <div className="grid gap-2">
                  {parameters.map((param) => (
                    <button
                      key={param.key}
                      onClick={() => copyParameter(param.key)}
                      className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm bg-muted px-2 py-0.5 rounded text-primary">
                            {param.key}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {param.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ex: {param.example}
                        </p>
                      </div>
                      <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Templates */}
              <Card className="p-4 sm:p-6 rounded-2xl border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3>Templates Prontos</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Escolha um template para começar
                </p>

                <div className="grid gap-2">
                  {templates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => applyTemplate(template.message)}
                      className="p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <p className="text-sm mb-1">{template.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.message.substring(0, 80)}...
                      </p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="p-4 sm:p-6 rounded-2xl border-border lg:sticky lg:top-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                  <h3>Preview da Mensagem</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Veja como sua mensagem aparecerá no WhatsApp
                </p>

                {/* WhatsApp-style preview */}
                <div className="bg-[#ECE5DD] rounded-2xl p-4 min-h-[400px]">
                  {/* Date indicator */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/90 px-3 py-1 rounded-full text-xs text-muted-foreground shadow-sm">
                      HOJE
                    </div>
                  </div>

                  {/* Message bubble */}
                  <div className="flex justify-end mb-4">
                    <div className="max-w-[85%]">
                      <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-3 shadow-sm">
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {getPreviewMessage()}
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                            <path d="M11.0714 0.5L11.5 0.928571L5.78571 6.64286L5.35714 6.21429L11.0714 0.5Z" fill="#4FC3F7" />
                            <path d="M14.2143 0.5L14.6429 0.928571L5.78571 9.78571L2.5 6.5L2.92857 6.07143L5.78571 8.92857L14.2143 0.5Z" fill="#4FC3F7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info box */}
                  <div className="bg-white/50 rounded-xl p-3 mt-6">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Preview com dados de exemplo</p>
                        <p className="text-xs text-muted-foreground">
                          Na mensagem real, os parâmetros serão substituídos pelos dados do cliente e da cobrança.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Character count */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      {whatsappMessage.length} caracteres • {Math.ceil(whatsappMessage.length / 160)} SMS
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#22c55e]" />
                    </div>
                    <p className="text-muted-foreground">
                      Use emojis para tornar a mensagem mais amigável
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#22c55e]" />
                    </div>
                    <p className="text-muted-foreground">
                      Mantenha a mensagem objetiva e clara
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#22c55e]" />
                    </div>
                    <p className="text-muted-foreground">
                      Sempre inclua o link de pagamento
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company">
          <Card className="p-4 sm:p-6 rounded-2xl border-border">
            <h3 className="mb-6">Informações da Empresa</h3>

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
            <Card className="p-4 sm:p-6 rounded-2xl border-border">
              <h3 className="mb-6">Convidar Novo Usuário</h3>

              <form onSubmit={handleInviteUser} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <Card className="p-4 sm:p-6 rounded-2xl border-border">
              <h3 className="mb-6">Usuários Ativos</h3>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
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
                            className={`rounded-lg ${user.status === "active"
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

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {users.map((user) => (
                  <Card key={user.id} className="p-4 rounded-xl border-border">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1">{user.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Badge
                          className={`rounded-lg ml-2 flex-shrink-0 ${user.status === "active"
                              ? "bg-[#22c55e]/10 text-[#22c55e]"
                              : "bg-[#facc15]/10 text-[#facc15]"
                            }`}
                        >
                          {user.status === "active" ? "Ativo" : "Pendente"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Função</p>
                          <p className="text-sm">{user.role}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans">
          <div className="space-y-6">
            <Card className="p-4 sm:p-6 rounded-2xl border-primary bg-primary/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="bg-primary text-primary-foreground p-3 rounded-2xl">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Plano Atual: Pro</h3>
                  <p className="text-muted-foreground text-sm">
                    Você está aproveitando todos os recursos do plano Pro
                  </p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-muted-foreground text-sm">Próxima cobrança</p>
                  <p>20/11/2025</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`p-6 rounded-2xl relative overflow-hidden transition-all ${plan.current
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

            <Card className="p-4 sm:p-6 rounded-2xl border-border">
              <h3 className="mb-4">Comparativo de Planos</h3>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[600px] px-4 sm:px-0">
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
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}