import { useState } from "react";
import { KPICard } from "../KPICard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { useWhatsappTemplate } from "../../store/whatsappTemplate";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  MoreVertical,
  Send,
  Eye
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { AIWidget } from "../AIWidget";

export function Dashboard() {
  const { template } = useWhatsappTemplate();
  type RecentCharge = {
    id: number;
    client: string;
    value: string;
    status: string;
    date: string;
  };
  const [selectedCharge, setSelectedCharge] = useState<RecentCharge | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const cashFlowData = [
    { month: "Jan", entradas: 45000, saidas: 32000 },
    { month: "Fev", entradas: 52000, saidas: 38000 },
    { month: "Mar", entradas: 48000, saidas: 35000 },
    { month: "Abr", entradas: 61000, saidas: 42000 },
    { month: "Mai", entradas: 55000, saidas: 39000 },
    { month: "Jun", entradas: 67000, saidas: 45000 },
  ];

  const recentCharges = [
    {
      id: 1,
      client: "Empresa ABC Ltda",
      value: "R$ 5.500,00",
      status: "paid",
      date: "15/10/2025",
    },
    {
      id: 2,
      client: "Comércio XYZ",
      value: "R$ 3.200,00",
      status: "pending",
      date: "18/10/2025",
    },
    {
      id: 3,
      client: "Indústria Tech",
      value: "R$ 12.800,00",
      status: "overdue",
      date: "10/10/2025",
    },
    {
      id: 4,
      client: "Serviços Online",
      value: "R$ 2.100,00",
      status: "paid",
      date: "19/10/2025",
    },
    {
      id: 5,
      client: "Varejo Premium",
      value: "R$ 8.900,00",
      status: "pending",
      date: "22/10/2025",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { label: "Pago", className: "bg-[#22c55e]/10 text-[#22c55e]" },
      pending: { label: "Pendente", className: "bg-[#facc15]/10 text-[#facc15]" },
      overdue: { label: "Vencido", className: "bg-[#ef4444]/10 text-[#ef4444]" },
    };
    const variant = variants[status as keyof typeof variants];
    return (
      <Badge className={`${variant.className} rounded-lg`}>
        {variant.label}
      </Badge>
    );
  };

  const handleSendWhatsApp = (charge: RecentCharge) => {
    const phone = "5592991784771";
    let message = template;
    message = message.replace(/{{nome}}/g, charge.client);
    message = message.replace(/{{empresa}}/g, charge.client);
    message = message.replace(/{{valor}}/g, charge.value);
    message = message.replace(/{{vencimento}}/g, charge.date);
    message = message.replace(/{{dias_vencido}}/g, charge.status === "overdue" ? "5 dias" : "0");
    message = message.replace(/{{link_pagamento}}/g, "https://pay.cobrafacil.com/abc123");
    message = message.replace(/{{numero_cobranca}}/g, `#${charge.id}`);
    message = message.replace(/{{empresa_nome}}/g, "Minha Empresa Ltda");
    message = message.replace(/{{empresa_telefone}}/g, "(11) 98765-4321");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-8 items-start">
      <div className="space-y-6">
        {/* AI Alert */}
        <Alert className="border-[#ef4444]/20 bg-[#ef4444]/5 rounded-2xl">
          <Sparkles className="h-5 w-5 text-[#ef4444]" />
          <AlertDescription className="text-[#ef4444] ml-2">
            🔴 Atenção: Seu caixa cairá 25% no próximo mês. Considere antecipar recebíveis ou reduzir despesas.
          </AlertDescription>
        </Alert>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Saldo Atual"
            value="R$ 84.500,00"
            change="+12% vs mês anterior"
            changeType="positive"
            icon={Wallet}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <KPICard
            title="Entradas"
            value="R$ 67.000,00"
            change="+8% este mês"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-[#22c55e]"
            iconBg="bg-[#22c55e]/10"
          />
          <KPICard
            title="Saídas"
            value="R$ 45.000,00"
            change="+3% este mês"
            changeType="negative"
            icon={TrendingDown}
            iconColor="text-[#ef4444]"
            iconBg="bg-[#ef4444]/10"
          />
          <KPICard
            title="Saldo Previsto (IA)"
            value="R$ 92.300,00"
            change="Previsão 30 dias"
            changeType="neutral"
            icon={Sparkles}
            iconColor="text-[#8b5cf6]"
            iconBg="bg-[#8b5cf6]/10"
          />
        </div>

        {/* Cash Flow Chart */}
        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Fluxo de Caixa</h3>
              <p className="text-muted-foreground text-sm">
                Comparativo de entradas e saídas
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
                <span>Entradas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
                <span>Saídas</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="entradas" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Entradas"
                dot={{ fill: '#22c55e', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="saidas" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Saídas"
                dot={{ fill: '#ef4444', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Charges */}
        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Cobranças Recentes</h3>
              <p className="text-muted-foreground text-sm">
                Últimas transações registradas
              </p>
            </div>
            <Button variant="outline" className="rounded-xl">
              Ver todas
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 text-muted-foreground">Cliente</th>
                  <th className="text-left pb-3 text-muted-foreground">Valor</th>
                  <th className="text-left pb-3 text-muted-foreground">Status</th>
                  <th className="text-left pb-3 text-muted-foreground">Data</th>
                  <th className="text-right pb-3 text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentCharges.map((charge) => (
                  <tr key={charge.id} className="border-b border-border last:border-0">
                    <td className="py-4">{charge.client}</td>
                    <td className="py-4">{charge.value}</td>
                    <td className="py-4">{getStatusBadge(charge.status)}</td>
                    <td className="py-4 text-muted-foreground">{charge.date}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="rounded-xl" title="Ver detalhes" onClick={() => { setSelectedCharge(charge); setShowDetailsDialog(true); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-xl" title="Enviar via WhatsApp" onClick={() => handleSendWhatsApp(charge)}>
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-xl" title="Mais opções">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
        {/* Modal de Detalhes da Cobrança */}
        <Dialog open={showDetailsDialog} onOpenChange={(open) => {
          setShowDetailsDialog(open);
          if (!open) setSelectedCharge(null);
        }}>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes da Cobrança</DialogTitle>
              <DialogDescription>Informações completas da cobrança</DialogDescription>
            </DialogHeader>
            {selectedCharge && (
              <div className="space-y-4 mt-2">
                <div>
                  <Label>Cliente</Label>
                  <p className="font-semibold mt-1">{selectedCharge.client}</p>
                </div>
                <div>
                  <Label>Valor</Label>
                  <p className="font-semibold mt-1">{selectedCharge.value}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <span className="mt-1">{getStatusBadge(selectedCharge.status)}</span>
                </div>
                <div>
                  <Label>Data</Label>
                  <p className="mt-1">{selectedCharge.date}</p>
                </div>
                <div>
                  <Label>ID</Label>
                  <p className="mt-1">#{selectedCharge.id}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* AIWidget Sidebar */}
      <div className="mt-8 lg:mt-0">
        <AIWidget />
      </div>
    </div>
  );
}
