import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function CashFlow() {
  const [period, setPeriod] = useState("month");

  const weekData = [
    { name: "Seg", entradas: 4200, saidas: 3100 },
    { name: "Ter", entradas: 3800, saidas: 2800 },
    { name: "Qua", entradas: 5100, saidas: 3600 },
    { name: "Qui", entradas: 4600, saidas: 3200 },
    { name: "Sex", entradas: 6200, saidas: 4100 },
    { name: "Sáb", entradas: 2800, saidas: 1500 },
    { name: "Dom", entradas: 1900, saidas: 900 },
  ];

  const monthData = [
    { name: "Sem 1", entradas: 15200, saidas: 11200 },
    { name: "Sem 2", entradas: 18500, saidas: 13800 },
    { name: "Sem 3", entradas: 16800, saidas: 12400 },
    { name: "Sem 4", entradas: 21200, saidas: 15600 },
  ];

  const quarterData = [
    { name: "Jan", entradas: 45000, saidas: 32000 },
    { name: "Fev", entradas: 52000, saidas: 38000 },
    { name: "Mar", entradas: 48000, saidas: 35000 },
  ];

  const getData = () => {
    switch (period) {
      case "week":
        return weekData;
      case "quarter":
        return quarterData;
      default:
        return monthData;
    }
  };

  const movements = [
    {
      id: 1,
      type: "entrada",
      category: "Vendas",
      description: "Venda de serviços - Cliente ABC",
      value: "R$ 5.500,00",
      date: "20/10/2025",
    },
    {
      id: 2,
      type: "saida",
      category: "Energia",
      description: "Conta de luz - Outubro",
      value: "R$ 850,00",
      date: "19/10/2025",
    },
    {
      id: 3,
      type: "entrada",
      category: "Vendas",
      description: "Consultoria financeira - Cliente XYZ",
      value: "R$ 3.200,00",
      date: "18/10/2025",
    },
    {
      id: 4,
      type: "saida",
      category: "Serviços",
      description: "Software de gestão - Assinatura",
      value: "R$ 450,00",
      date: "18/10/2025",
    },
    {
      id: 5,
      type: "entrada",
      category: "Vendas",
      description: "Projeto de desenvolvimento",
      value: "R$ 12.800,00",
      date: "17/10/2025",
    },
    {
      id: 6,
      type: "saida",
      category: "Serviços",
      description: "Hospedagem e domínio",
      value: "R$ 120,00",
      date: "15/10/2025",
    },
    {
      id: 7,
      type: "saida",
      category: "Energia",
      description: "Conta de água",
      value: "R$ 180,00",
      date: "14/10/2025",
    },
    {
      id: 8,
      type: "entrada",
      category: "Vendas",
      description: "Venda de produto digital",
      value: "R$ 2.100,00",
      date: "13/10/2025",
    },
  ];

  const categories = [
    { name: "Vendas", entradas: 67000, saidas: 0, color: "#22c55e" },
    { name: "Serviços", entradas: 12500, saidas: 8900, color: "#2563eb" },
    { name: "Energia", entradas: 0, saidas: 2800, color: "#ef4444" },
    { name: "Marketing", entradas: 0, saidas: 5400, color: "#facc15" },
    { name: "Outros", entradas: 3200, saidas: 1900, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1">Fluxo de Caixa</h2>
          <p className="text-muted-foreground">
            Análise detalhada de entradas e saídas
          </p>
        </div>

        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList className="rounded-xl">
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="quarter">Trimestre</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground mb-2">Entradas</p>
              <h2 className="text-[#22c55e]">R$ 67.000,00</h2>
            </div>
            <div className="bg-[#22c55e]/10 p-3 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-[#22c55e]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#22c55e]">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8% vs período anterior</span>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground mb-2">Saídas</p>
              <h2 className="text-[#ef4444]">R$ 45.000,00</h2>
            </div>
            <div className="bg-[#ef4444]/10 p-3 rounded-2xl">
              <TrendingDown className="w-6 h-6 text-[#ef4444]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#ef4444]">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3% vs período anterior</span>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground mb-2">Saldo Líquido</p>
              <h2 className="text-primary">R$ 22.000,00</h2>
            </div>
            <div className="bg-primary/10 p-3 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#22c55e]">
            <ArrowUpRight className="w-4 h-4" />
            <span>+15% vs período anterior</span>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 rounded-2xl border-border">
        <div className="mb-6">
          <h3 className="mb-1">Comparativo Entradas x Saídas</h3>
          <p className="text-muted-foreground text-sm">
            Análise visual do fluxo de caixa
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
              }}
            />
            <Legend />
            <Bar dataKey="entradas" fill="#22c55e" radius={[8, 8, 0, 0]} name="Entradas" />
            <Bar dataKey="saidas" fill="#ef4444" radius={[8, 8, 0, 0]} name="Saídas" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Categories */}
        <Card className="p-6 rounded-2xl border-border">
          <h3 className="mb-6">Por Categoria</h3>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex gap-6 text-sm">
                    {category.entradas > 0 && (
                      <span className="text-[#22c55e]">
                        +R$ {category.entradas.toLocaleString("pt-BR")}
                      </span>
                    )}
                    {category.saidas > 0 && (
                      <span className="text-[#ef4444]">
                        -R$ {category.saidas.toLocaleString("pt-BR")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${((category.entradas + category.saidas) / 800) * 100}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Movements */}
        <Card className="p-6 rounded-2xl border-border">
          <div className="flex items-center justify-between mb-6">
            <h3>Movimentações Recentes</h3>
            <Button variant="outline" className="rounded-xl">
              Ver todas
            </Button>
          </div>

          <div className="space-y-3">
            {movements.slice(0, 6).map((movement) => (
              <div
                key={movement.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
              >
                <div
                  className={`${
                    movement.type === "entrada"
                      ? "bg-[#22c55e]/10 text-[#22c55e]"
                      : "bg-[#ef4444]/10 text-[#ef4444]"
                  } p-2 rounded-xl`}
                >
                  {movement.type === "entrada" ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{movement.description}</p>
                      <p className="text-sm text-muted-foreground">{movement.category}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          movement.type === "entrada" ? "text-[#22c55e]" : "text-[#ef4444]"
                        }
                      >
                        {movement.type === "entrada" ? "+" : "-"}
                        {movement.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{movement.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
