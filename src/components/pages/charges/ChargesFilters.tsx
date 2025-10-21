import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Search, Filter } from "lucide-react";
import React from "react";

interface ChargesFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
}

export function ChargesFilters({ searchTerm, onSearchTermChange, filterStatus, onFilterStatusChange }: ChargesFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente ou descrição..."
          className="pl-10 rounded-xl"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <Select value={filterStatus} onValueChange={onFilterStatusChange}>
        <SelectTrigger className="w-full md:w-48 rounded-xl">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="paid">Pagos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="overdue">Vencidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
