import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Search, Filter, Eye, Send, MoreVertical, Download } from "lucide-react";
import { toast } from "sonner";

export function Charges() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChargeDialog, setShowNewChargeDialog] = useState(false);

  const charges = [
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

  const handleCreateCharge = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cobrança criada com sucesso!");
    setShowNewChargeDialog(false);
  };

  const handleSendWhatsApp = (client: string) => {
    toast.success(`Lembrete enviado para ${client} via WhatsApp`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="mb-1">Cobranças</h2>
          <p className="text-muted-foreground">
            Gerencie todas as suas cobranças
          </p>
        </div>

        <Dialog open={showNewChargeDialog} onOpenChange={setShowNewChargeDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl shadow-lg w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Nova Cobrança
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Nova Cobrança</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar uma nova cobrança
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateCharge} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="client">Cliente</Label>
                <Input
                  id="client"
                  placeholder="Nome do cliente"
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    type="text"
                    placeholder="R$ 0,00"
                    className="mt-1 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    className="mt-1 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                <Select>
                  <SelectTrigger className="mt-1 rounded-xl">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="cartao">Cartão</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Descrição da cobrança"
                  className="mt-1 rounded-xl"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewChargeDialog(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 rounded-xl">
                  Criar Cobrança
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-2xl border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou descrição..."
              className="pl-10 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="paid">Pagos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="overdue">Vencidos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Charges Table */}
      <Card className="p-6 rounded-2xl border-border">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-4 text-muted-foreground">Cliente</th>
                <th className="text-left pb-4 text-muted-foreground">Descrição</th>
                <th className="text-left pb-4 text-muted-foreground">Valor</th>
                <th className="text-left pb-4 text-muted-foreground">Status</th>
                <th className="text-left pb-4 text-muted-foreground">Vencimento</th>
                <th className="text-right pb-4 text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharges.map((charge) => (
                <tr key={charge.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="py-4">{charge.client}</td>
                  <td className="py-4 text-muted-foreground">{charge.description}</td>
                  <td className="py-4">{charge.value}</td>
                  <td className="py-4">{getStatusBadge(charge.status)}</td>
                  <td className="py-4 text-muted-foreground">{charge.dueDate}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10"
                        title="Enviar via WhatsApp"
                        onClick={() => handleSendWhatsApp(charge.client)}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl"
                        title="Baixar recibo"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCharges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma cobrança encontrada</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredCharges.map((charge) => (
            <Card key={charge.id} className="p-4 rounded-xl border-border">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{charge.client}</h4>
                    <p className="text-sm text-muted-foreground">{charge.description}</p>
                  </div>
                  {getStatusBadge(charge.status)}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Valor</p>
                    <p className="font-semibold">{charge.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Vencimento</p>
                    <p className="text-sm">{charge.dueDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-xl gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-xl gap-2 text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10"
                    onClick={() => handleSendWhatsApp(charge.client)}
                  >
                    <Send className="w-4 h-4" />
                    Enviar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-xl"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredCharges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma cobrança encontrada</p>
            </div>
          )}
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-2">Total em Aberto</p>
          <h3 className="text-[#facc15]">R$ 29.800,00</h3>
        </Card>
        <Card className="p-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-2">Total Recebido</p>
          <h3 className="text-[#22c55e]">R$ 50.100,00</h3>
        </Card>
        <Card className="p-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-2">Total Vencido</p>
          <h3 className="text-[#ef4444]">R$ 17.000,00</h3>
        </Card>
      </div>
    </div>
  );
}
