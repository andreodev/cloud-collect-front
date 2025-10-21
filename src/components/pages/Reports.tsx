import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
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
import Image from "next/image";

export function Reports() {
  const pendingMessage = `Olá! Este é um lembrete sobre sua fatura no valor de R$ 5.500,00 com vencimento em 25/10/2025.\n\nPara facilitar o pagamento, acesse o link abaixo:\nhttps://pay.cobrafacil.com/abc123\n\nEm caso de dúvidas, estamos à disposição!`;
  const paidMessage = `Pagamento confirmado! Recebemos sua transferência de R$ 5.500,00 em 20/10/2025.\n\nSeu recibo está disponível para download:\nhttps://pay.cobrafacil.com/recibo123\n\nObrigado pela preferência!`;

  const handleCopy = (msg: string) => {
    navigator.clipboard.writeText(msg);
    toast.success("Mensagem copiada!");
  };
  const handleSimulateSend = (msg: string) => {
    toast.success("Simulação de envio pelo WhatsApp!");
  };
  const handleDownloadReceipt = () => {
    toast.success("Recibo baixado!");
  };
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templatePreview, setTemplatePreview] = useState<string>("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
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

  type Report = {
    id: number;
    type: string;
    period: string;
    client: string;
    category: string;
    date: string;
  };

  const handleSendWhatsApp = (report: Report) => {
  const phone = "5592991784771";
  const message = `Olá!\n\nSegue em anexo o relatório "${report.type}" referente ao período ${report.period}, para o cliente: ${report.client}.\n\nCategoria: ${report.category}\nData de geração: ${report.date}\n\nPara visualizar ou baixar o documento, acesse o sistema ou solicite o envio do arquivo em PDF.\n\nCaso tenha dúvidas ou precise de suporte, estamos à disposição pelo WhatsApp ou e-mail.\n\nAtenciosamente,\nEquipe Cloud Collect`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  toast.success(`${report.type} enviado via WhatsApp`);
  };

  const handleExport = (format: string) => {
    toast.success(`Exportando relatório em formato ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="mb-1">Relatórios e Recibos</h2>
          <p className="text-muted-foreground">
            Gerencie e exporte seus documentos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="gap-2 rounded-xl w-full sm:w-auto"
            onClick={() => handleExport("pdf")}
          >
            <FileText className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button
            variant="outline"
            className="gap-2 rounded-xl w-full sm:w-auto"
            onClick={() => handleExport("excel")}
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </Button>
        </div>
      </div>
      {/* Filters */}
      <Card className="p-4 sm:p-6 rounded-2xl border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h4>Filtros</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <Card className="p-4 sm:p-6 rounded-2xl border-border">
        <h3 className="mb-6">Relatórios Gerados</h3>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
                        className="rounded-xl cursor-pointer"
                        title="Visualizar"
                        onClick={() => { setSelectedReport(report); setShowDetailsDialog(true); }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl cursor-pointer"
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
                        onClick={() => handleSendWhatsApp(report)}
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
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-4 rounded-xl border-border">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">{report.type}</h4>
                  <p className="text-sm text-muted-foreground">{report.period}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                    <p className="truncate">{report.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Categoria</p>
                    <p>{report.category}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Data</p>
                    <p>{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl gap-2"
                    onClick={() => { setSelectedReport(report); setShowDetailsDialog(true); }}
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl gap-2"
                    onClick={() => handleDownload(report.type)}
                  >
                    <Download className="w-4 h-4" />
                    Baixar
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10"
                    onClick={() => handleSendWhatsApp(report)}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
      {/* Receipt Templates */}
      <div>
        <h3 className="mb-4">Modelos de Recibo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {receiptTemplates.map((template) => (
            <Card
              key={template.id}
              className={`overflow-hidden rounded-2xl border-border hover:shadow-lg transition-shadow cursor-pointer ${selectedTemplate === template.id ? 'border-2 border-primary shadow-lg' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="aspect-[4/3] bg-accent flex items-center justify-center relative">
                <Image
                  src={template.preview}
                  alt={template.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full rounded-t-2xl"
                  style={{ maxHeight: 180 }}
                  onClick={e => { e.stopPropagation(); setTemplatePreview(template.preview); setShowTemplateModal(true); }}
                />
                {selectedTemplate === template.id && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-xl shadow">Selecionado</span>
                )}
              </div>
              <div className="p-4">
                <h4 className="mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                    onClick={e => { e.stopPropagation(); setTemplatePreview(template.preview); setShowTemplateModal(true); }}
                  >Visualizar</Button>
                  <Button
                    size="sm"
                    className={`flex-1 rounded-xl ${selectedTemplate === template.id ? 'bg-primary text-white' : ''}`}
                    onClick={e => { e.stopPropagation(); setSelectedTemplate(template.id); toast.success("Modelo aplicado!"); }}
                  >Usar Modelo</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
          <DialogContent className="rounded-2xl max-w-lg">
            <DialogHeader>
              <DialogTitle>Visualização do Modelo</DialogTitle>
              <DialogDescription>Veja o modelo de recibo em tamanho ampliado</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <Image src={templatePreview} alt="Preview do modelo" width={400} height={300} className="rounded-xl max-h-96" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Modal de Detalhes do Relatório */}
      <Dialog open={showDetailsDialog} onOpenChange={(open) => {
        setShowDetailsDialog(open);
        if (!open) setSelectedReport(null);
      }}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Detalhes do Relatório
            </DialogTitle>
            <DialogDescription className="mb-2">Informações completas do relatório</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-base">{selectedReport.type}</span>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Período</Label>
                  <p className="mt-1 text-sm">{selectedReport.period}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Cliente</Label>
                  <p className="mt-1 text-sm">{selectedReport.client}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Categoria</Label>
                  <p className="mt-1 text-sm">{selectedReport.category}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Data</Label>
                  <p className="mt-1 text-sm">{selectedReport.date}</p>
                </div>
                <div className="col-span-2 flex items-center gap-2 mt-2">
                  <span className="bg-accent px-2 py-1 rounded text-xs text-muted-foreground">ID</span>
                  <span className="font-mono text-sm">#{selectedReport.id}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* WhatsApp Message Preview */}
      <Card className="p-4 sm:p-6 rounded-2xl border-border bg-[#22c55e]/5">
        <h3 className="mb-4">Prévia de Mensagem WhatsApp</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Cobrança Pendente */}
          <div className="bg-card p-4 rounded-2xl border border-border flex flex-col justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-lg">
                <span className="animate-bounce">📄</span> <strong>Cobrança Pendente</strong>
              </p>
              <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                {pendingMessage}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="rounded-xl flex-1" onClick={() => handleCopy(pendingMessage)}>
                Copiar Mensagem
              </Button>
              <Button size="sm" className="rounded-xl flex-1 bg-[#22c55e]/80 text-white" onClick={() => handleSimulateSend(pendingMessage)}>
                Simular Envio
              </Button>
            </div>
          </div>
          {/* Confirmação de Pagamento */}
          <div className="bg-card p-4 rounded-2xl border border-border flex flex-col justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-lg">
                <span className="animate-pulse">✅</span> <strong>Confirmação de Pagamento</strong>
              </p>
              <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                {paidMessage}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="rounded-xl flex-1" onClick={() => handleCopy(paidMessage)}>
                Copiar Mensagem
              </Button>
              <Button size="sm" className="rounded-xl flex-1 bg-[#22c55e]/80 text-white" onClick={() => handleSimulateSend(paidMessage)}>
                Simular Envio
              </Button>
              <Button size="sm" className="rounded-xl flex-1 bg-[#6366f1]/80 text-white" onClick={handleDownloadReceipt}>
                📥 Baixar Recibo
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
