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
          </DialogTitle>
          <DialogDescription>
            Visualize as informações completas da cobrança
          </DialogDescription>
        </DialogHeader>
        {charge && (
          <div className="space-y-4 mt-2">
            <div>
              <Label>Cliente</Label>
              <p className="font-semibold mt-1">{charge.client}</p>
            </div>
            <div>
              <Label>Descrição</Label>
              <p className="mt-1 text-muted-foreground">{charge.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor</Label>
                <p className="font-semibold mt-1">{charge.value}</p>
              </div>
              <div>
                <Label>Status</Label>
                <span className="mt-1">{getStatusBadge(charge.status)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vencimento</Label>
                <p className="mt-1">{charge.dueDate}</p>
              </div>
              <div>
                <Label>ID</Label>
                <p className="mt-1">#{charge.id}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
