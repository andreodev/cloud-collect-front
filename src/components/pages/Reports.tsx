import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FileText, Download, Send, Eye, Filter } from "lucide-react";
import { toast } from "sonner";

export function Reports() {
  const [filterClient, setFilterClient] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const reports = [
    {
      id: 1,
      type: "Relatório Financeiro",
      period: "Outubro 2025",
      client: "Todos os clientes",
      category: "Geral",
      date: "20/10/2025",
    },
    {
      id: 2,
      type: "Recibo de Pagamento",
      period: "15/10/2025",
      client: "Empresa ABC Ltda",
      category: "Vendas",
      date: "15/10/2025",
    },
    {
      id: 3,
      type: "Relatório de Fluxo de Caixa",
      period: "Setembro 2025",
      client: "Todos os clientes",
      category: "Geral",
      date: "30/09/2025",
    },
    {
      id: 4,
      type: "Recibo de Pagamento",
      period: "10/10/2025",
      client: "Indústria Tech",
      category: "Serviços",
      date: "10/10/2025",
    },
    {
      id: 5,
      type: "Demonstrativo de Receitas",
      period: "3º Trimestre 2025",
      client: "Todos os clientes",
      category: "Vendas",
      date: "01/10/2025",
    },
  ];

  const receiptTemplates = [
    {
      id: 1,
      name: "Recibo Padrão",
      description: "Modelo básico de recibo",
      preview: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Recibo Detalhado",
      description: "Com discriminação de serviços",
      preview: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Recibo Simples",
      description: "Minimalista e direto",
      preview: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    },
  ];

  const handleDownload = (reportName: string) => {
    toast.success(`Download iniciado: ${reportName}`);
  };

  const handleSendWhatsApp = (reportName: string) => {
    toast.success(`${reportName} enviado via WhatsApp`);
  };

  const handleExport = (format: string) => {
    toast.success(`Exportando relatório em formato ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1">Relatórios e Recibos</h2>
          <p className="text-muted-foreground">
            Gerencie e exporte seus documentos
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={() => handleExport("pdf")}
          >
            <FileText className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={() => handleExport("excel")}
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-2xl border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h4>Filtros</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="filter-client">Cliente</Label>
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger id="filter-client" className="mt-1 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os clientes</SelectItem>
                <SelectItem value="empresa-abc">Empresa ABC Ltda</SelectItem>
                <SelectItem value="industria-tech">Indústria Tech</SelectItem>
                <SelectItem value="comercio-xyz">Comércio XYZ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="filter-category">Categoria</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger id="filter-category" className="mt-1 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="vendas">Vendas</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="geral">Geral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="filter-start">Data Início</Label>
            <Input
              id="filter-start"
              type="date"
              className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="filter-end">Data Fim</Label>
            <Input
              id="filter-end"
              type="date"
              className="mt-1 rounded-xl"
            />
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <Card className="p-6 rounded-2xl border-border">
        <h3 className="mb-6">Relatórios Gerados</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-4 text-muted-foreground">Tipo</th>
                <th className="text-left pb-4 text-muted-foreground">Período</th>
                <th className="text-left pb-4 text-muted-foreground">Cliente</th>
                <th className="text-left pb-4 text-muted-foreground">Categoria</th>
                <th className="text-left pb-4 text-muted-foreground">Data</th>
                <th className="text-right pb-4 text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="py-4">{report.type}</td>
                  <td className="py-4 text-muted-foreground">{report.period}</td>
                  <td className="py-4 text-muted-foreground">{report.client}</td>
                  <td className="py-4 text-muted-foreground">{report.category}</td>
                  <td className="py-4 text-muted-foreground">{report.date}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        title="Baixar"
                        onClick={() => handleDownload(report.type)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10"
                        title="Enviar via WhatsApp"
                        onClick={() => handleSendWhatsApp(report.type)}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receipt Templates */}
      <div>
        <h3 className="mb-4">Modelos de Recibo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {receiptTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden rounded-2xl border-border hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-accent flex items-center justify-center">
                <FileText className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h4 className="mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                    Visualizar
                  </Button>
                  <Button size="sm" className="flex-1 rounded-xl">
                    Usar Modelo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* WhatsApp Message Preview */}
      <Card className="p-6 rounded-2xl border-border bg-[#22c55e]/5">
        <h3 className="mb-4">Prévia de Mensagem WhatsApp</h3>
        
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-2xl border border-border max-w-md">
            <p className="mb-2">📄 <strong>Cobrança Pendente</strong></p>
            <p className="text-sm text-muted-foreground mb-3">
              Olá! Este é um lembrete sobre sua fatura no valor de <strong>R$ 5.500,00</strong> com vencimento em <strong>25/10/2025</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Para facilitar o pagamento, acesse o link abaixo:
            </p>
            <Button variant="outline" size="sm" className="rounded-xl w-full mb-3">
              🔗 Acessar Fatura
            </Button>
            <p className="text-xs text-muted-foreground">
              Em caso de dúvidas, estamos à disposição!
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border max-w-md">
            <p className="mb-2">✅ <strong>Confirmação de Pagamento</strong></p>
            <p className="text-sm text-muted-foreground mb-3">
              Pagamento confirmado! Recebemos sua transferência de <strong>R$ 5.500,00</strong> em <strong>20/10/2025</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Seu recibo está disponível para download:
            </p>
            <Button variant="outline" size="sm" className="rounded-xl w-full mb-3">
              📥 Baixar Recibo
            </Button>
            <p className="text-xs text-muted-foreground">
              Obrigado pela preferência!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
