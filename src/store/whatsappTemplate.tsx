"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WhatsappTemplateContextProps {
  template: string;
  setTemplate: (template: string) => void;
}

const WhatsappTemplateContext = createContext<WhatsappTemplateContextProps | undefined>(undefined);

export function WhatsappTemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useState<string>(
    "Olá {{nome}}! 👋\n\nEsta é uma mensagem da {{empresa_nome}}.\n\nIdentificamos um pagamento pendente:\n\n💰 Valor: {{valor}}\n📅 Vencimento: {{vencimento}}\n\n{{link_pagamento}}\n\nQualquer dúvida, estamos à disposição!\n\nAtenciosamente,\n{{empresa_nome}}\n📞 {{empresa_telefone}}"
  );

  return (
    <WhatsappTemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </WhatsappTemplateContext.Provider>
  );
}

export function useWhatsappTemplate() {
  const context = useContext(WhatsappTemplateContext);
  if (!context) {
    throw new Error("useWhatsappTemplate deve ser usado dentro de WhatsappTemplateProvider");
  }
  return context;
}
