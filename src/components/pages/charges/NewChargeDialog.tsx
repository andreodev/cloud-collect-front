import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import React from "react";

interface NewChargeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewChargeDialog({ open, onOpenChange }: NewChargeDialogProps) {
  const handleCreateCharge = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cobrança criada com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Input id="client" placeholder="Nome do cliente" className="mt-1 rounded-xl" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Valor</Label>
              <Input id="value" type="text" placeholder="R$ 0,00" className="mt-1 rounded-xl" required />
            </div>
            <div>
              <Label htmlFor="dueDate">Vencimento</Label>
              <Input id="dueDate" type="date" className="mt-1 rounded-xl" required />
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
            <Input id="description" placeholder="Descrição da cobrança" className="mt-1 rounded-xl" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 rounded-xl">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 rounded-xl">
              Criar Cobrança
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
