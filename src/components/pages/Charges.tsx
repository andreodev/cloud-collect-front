import { useState } from "react";
import { useWhatsappTemplate } from "../../store/whatsappTemplate";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { ChargesTable } from "./charges/ChargesTable";
import { ChargeCard } from "./charges/ChargeCard";
import { ChargesFilters } from "./charges/ChargesFilters";
import { ChargesSummary } from "./charges/ChargesSummary";
import { NewChargeDialog } from "./charges/NewChargeDialog";
import { ChargeDetailsDialog, Charge } from "./charges/ChargeDetailsDialog";




export function Charges() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChargeDialog, setShowNewChargeDialog] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const charges: Charge[] = [
    {
      id: 1,
      client: "Empresa ABC Ltda",
      value: "R$ 5.500,00",
      status: "paid",
      dueDate: "15/10/2025",
      description: "Consultoria - Outubro",
    },
    {
      id: 2,
      client: "Comércio XYZ",
      value: "R$ 3.200,00",
      status: "pending",
      dueDate: "18/10/2025",
      description: "Serviço de manutenção",
    },
    {
      id: 3,
      client: "Indústria Tech",
      value: "R$ 12.800,00",
      status: "overdue",
      dueDate: "10/10/2025",
      description: "Desenvolvimento de software",
    },
    {
      id: 4,
      client: "Serviços Online",
      value: "R$ 2.100,00",
      status: "paid",
      dueDate: "19/10/2025",
      description: "Assinatura mensal",
    },
    {
      id: 5,
      client: "Varejo Premium",
      value: "R$ 8.900,00",
      status: "pending",
      dueDate: "22/10/2025",
      description: "Projeto de design",
    },
    {
      id: 6,
      client: "Consultoria Global",
      value: "R$ 15.500,00",
      status: "pending",
      dueDate: "25/10/2025",
      description: "Auditoria financeira",
    },
    {
      id: 7,
      client: "Tech Startup",
      value: "R$ 4.200,00",
      status: "overdue",
      dueDate: "08/10/2025",
      description: "Hospedagem e domínio",
    },
    {
      id: 8,
      client: "Indústria Master",
      value: "R$ 22.000,00",
      status: "paid",
      dueDate: "12/10/2025",
      description: "Equipamentos industriais",
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

  const filteredCharges = charges.filter((charge) => {
    const matchesStatus = filterStatus === "all" || charge.status === filterStatus;
    const matchesSearch = charge.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const { template } = useWhatsappTemplate();
  const handleSendWhatsApp = (client: string, charge?: Charge) => {
    const phone = "5592991784771";
    let message = template;
    if (charge) {
      message = message.replace(/{{nome}}/g, client);
      message = message.replace(/{{empresa}}/g, charge.client);
      message = message.replace(/{{valor}}/g, charge.value);
      message = message.replace(/{{vencimento}}/g, charge.dueDate);
      message = message.replace(/{{dias_vencido}}/g, charge.status === "overdue" ? "5 dias" : "0");
      message = message.replace(/{{link_pagamento}}/g, "https://pay.cobrafacil.com/abc123");
      message = message.replace(/{{numero_cobranca}}/g, `#${charge.id}`);
      message = message.replace(/{{empresa_nome}}/g, "Minha Empresa Ltda");
      message = message.replace(/{{empresa_telefone}}/g, "(11) 98765-4321");
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    toast.success(`Lembrete enviado para ${client} via WhatsApp (simulado)`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="mb-1">Cobranças</h2>
          <p className="text-muted-foreground">Gerencie todas as suas cobranças</p>
        </div>
        <NewChargeDialog open={showNewChargeDialog} onOpenChange={setShowNewChargeDialog} />
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-2xl border-border">
        <ChargesFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
        />
      </Card>

      {/* Charges Table & Mobile Cards */}
      <Card className="p-6 rounded-2xl border-border">
        <ChargesTable
          charges={filteredCharges}
          getStatusBadge={getStatusBadge}
          onView={(charge) => { setSelectedCharge(charge); setShowDetailsDialog(true); }}
          onSendWhatsApp={(client, charge) => handleSendWhatsApp(client, charge)}
        />
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredCharges.map((charge) => (
            <ChargeCard
              key={charge.id}
              charge={charge}
              getStatusBadge={getStatusBadge}
              onView={(charge) => { setSelectedCharge(charge); setShowDetailsDialog(true); }}
              onSendWhatsApp={(client) => handleSendWhatsApp(client, charge)}
            />
          ))}
          {filteredCharges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma cobrança encontrada</p>
            </div>
          )}
        </div>
        <ChargeDetailsDialog
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          charge={selectedCharge}
          getStatusBadge={getStatusBadge}
        />
      </Card>

      {/* Summary */}
      <ChargesSummary
        totalAberto="R$ 29.800,00"
        totalRecebido="R$ 50.100,00"
        totalVencido="R$ 17.000,00"
      />
    </div>
  );
}
