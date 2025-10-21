import { Button } from "../../ui/button";
import { Eye, Send, Download, MoreVertical } from "lucide-react";
import React from "react";
import { Charge } from "./ChargeDetailsDialog";

interface ChargesTableProps {
  charges: Charge[];
  getStatusBadge: (status: string) => React.ReactNode;
  onView: (charge: Charge) => void;
  onSendWhatsApp: (client: string, charge?: Charge) => void;
}

export function ChargesTable({ charges, getStatusBadge, onView, onSendWhatsApp }: ChargesTableProps) {
  return (
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
          {charges.map((charge) => (
            <tr key={charge.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
              <td className="py-4">{charge.client}</td>
              <td className="py-4 text-muted-foreground">{charge.description}</td>
              <td className="py-4">{charge.value}</td>
              <td className="py-4">{getStatusBadge(charge.status)}</td>
              <td className="py-4 text-muted-foreground">{charge.dueDate}</td>
              <td className="py-4">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl cursor-pointer" title="Ver detalhes" onClick={() => onView(charge)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl cursor-pointer text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10" title="Enviar via WhatsApp" onClick={() => onSendWhatsApp(charge.client, charge)}>
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl cursor-pointer" title="Baixar recibo">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {charges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma cobrança encontrada</p>
        </div>
      )}
    </div>
  );
}
