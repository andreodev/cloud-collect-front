import { Card } from "../../ui/card";
import React from "react";

interface ChargesSummaryProps {
  totalAberto: string;
  totalRecebido: string;
  totalVencido: string;
}

export function ChargesSummary({ totalAberto, totalRecebido, totalVencido }: ChargesSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-6 rounded-2xl border-border">
        <p className="text-muted-foreground mb-2">Total em Aberto</p>
        <h3 className="text-[#facc15]">{totalAberto}</h3>
      </Card>
      <Card className="p-6 rounded-2xl border-border">
        <p className="text-muted-foreground mb-2">Total Recebido</p>
        <h3 className="text-[#22c55e]">{totalRecebido}</h3>
      </Card>
      <Card className="p-6 rounded-2xl border-border">
        <p className="text-muted-foreground mb-2">Total Vencido</p>
        <h3 className="text-[#ef4444]">{totalVencido}</h3>
      </Card>
    </div>
  );
}
