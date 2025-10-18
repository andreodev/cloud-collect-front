'use client';

import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/user-profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="font-sans min-h-screen p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cloud Collect</h1>
          <p className="text-muted-foreground">Sistema de coleta na nuvem</p>
        </header>

        <main className="space-y-6">
          {isAuthenticated ? (
            <>
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md">
                ✅ Você está autenticado!
              </div>
              
              <UserProfile />
            </>
          ) : (
            <>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-md">
                ℹ️ Você não está autenticado
              </div>
              
              <div className="p-6 border rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">Acesse sua conta</h2>
                <p className="text-muted-foreground mb-6">
                  Faça login para acessar o sistema Cloud Collect
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/signin">
                    <Button>Fazer Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline">Criar Conta</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
