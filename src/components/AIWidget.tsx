import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";

export function AIWidget() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      message: "Seu crescimento semanal está em +8%.",
      color: "text-[#22c55e]",
      bg: "bg-[#22c55e]/10"
    },
    {
      type: "danger",
      icon: TrendingDown,
      message: "Seu caixa cairá 25% no próximo mês.",
      color: "text-[#ef4444]",
      bg: "bg-[#ef4444]/10"
    },
    {
      type: "warning",
      icon: AlertCircle,
      message: "Seu cliente X está com 3 cobranças vencidas.",
      color: "text-[#facc15]",
      bg: "bg-[#facc15]/10"
    },
    {
      type: "success",
      icon: TrendingUp,
      message: "Recebimentos previstos para amanhã: R$ 12.500.",
      color: "text-[#22c55e]",
      bg: "bg-[#22c55e]/10"
    }
  ];

  return (
    <aside className="w-full lg:w-80 bg-card lg:border-l border-border p-6 overflow-auto rounded-2xl lg:rounded-none">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3>Insights de IA</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="p-4 rounded-2xl border-border">
              <div className="flex gap-3">
                <div className={`${insight.bg} ${insight.color} p-2 rounded-xl h-fit`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm flex-1">
                  {insight.message}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <h4 className="mb-4">Previsão de Caixa (IA)</h4>
        <Card className="p-4 rounded-2xl border-border">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Próxima semana</span>
              <span className="text-[#22c55e]">+R$ 8.500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Próximo mês</span>
              <span className="text-[#ef4444]">-R$ 15.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Próximo trimestre</span>
              <span className="text-[#22c55e]">+R$ 45.000</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h4 className="mb-4">Ações Recomendadas</h4>
        <div className="space-y-2">
          <Card className="p-3 rounded-xl border-border hover:border-primary transition-colors cursor-pointer">
            <p className="text-sm">Enviar lembrete para 5 clientes com pagamento próximo</p>
          </Card>
          <Card className="p-3 rounded-xl border-border hover:border-primary transition-colors cursor-pointer">
            <p className="text-sm">Renegociar cobranças vencidas</p>
          </Card>
          <Card className="p-3 rounded-xl border-border hover:border-primary transition-colors cursor-pointer">
            <p className="text-sm">Atualizar previsão de despesas</p>
          </Card>
        </div>
      </div>
    </aside>
  );
}
