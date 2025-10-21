import { Button } from "../../ui/button";
import { Eye, Send, Download } from "lucide-react";
import React from "react";
import { Charge } from "./ChargeDetailsDialog";

interface ChargeCardProps {
  charge: Charge;
  getStatusBadge: (status: string) => React.ReactNode;
  onView: (charge: Charge) => void;
  onSendWhatsApp: (client: string, charge?: Charge) => void;
}

export function ChargeCard({ charge, getStatusBadge, onView, onSendWhatsApp }: ChargeCardProps) {
  return (
    <div className="md:hidden space-y-4">
      <div className="p-4 rounded-xl border-border bg-white shadow">
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
            <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-2" onClick={() => onView(charge)}>
              <Eye className="w-4 h-4" />
              Ver
            </Button>
            <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-2 text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10" onClick={() => onSendWhatsApp(charge.client, charge)}>
              <Send className="w-4 h-4" />
              Enviar
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
