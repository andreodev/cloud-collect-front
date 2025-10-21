import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Info } from "lucide-react";
import { Badge } from "../../ui/badge";
import React from "react";

export type Charge = {
  id: number;
  client: string;
  value: string;
  status: string;
  dueDate: string;
  description: string;
};

interface ChargeDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  charge: Charge | null;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function ChargeDetailsDialog({ open, onOpenChange, charge, getStatusBadge }: ChargeDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Detalhes da Cobrança
            {charge && (
              <span title={charge.status} className="ml-2">{getStatusBadge(charge.status)}</span>
            )}
          </DialogTitle>
          <DialogDescription>
            Visualize as informações completas da cobrança
          </DialogDescription>
        </DialogHeader>
        {charge && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{charge.client[0]}</span>
              </div>
              <div>
                <Label className="text-xs">Cliente</Label>
                <p className="font-semibold mt-1 text-lg">{charge.client}</p>
              </div>
            </div>
            <div>
              <Label className="text-xs">Descrição</Label>
              <p className="mt-1 text-muted-foreground">{charge.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Valor</Label>
                <p className="font-semibold mt-1 text-[#22c55e] text-lg">{charge.value}</p>
              </div>
              <div>
                <Label className="text-xs">Vencimento</Label>
                <p className="mt-1 text-muted-foreground">{charge.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Status</Label>
              <span className="mt-1" title={charge.status}>{getStatusBadge(charge.status)}</span>
            </div>
            <div>
              <Label className="text-xs">ID da Cobrança</Label>
              <p className="mt-1 text-muted-foreground">#{charge.id}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
