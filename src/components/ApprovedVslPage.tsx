"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/Icons";
import { AlertCircle, Trophy } from "lucide-react";
import { ApprovedVSL } from "./ApprovedVsl";

const USER_STORE_KEY = "goDevUser";

export default function ApprovedVslPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // impede cair aqui “direto” sem cadastro
    const raw = localStorage.getItem(USER_STORE_KEY);
    if (!raw) navigate("/cadastro", { replace: true });
  }, [navigate]);

  return (
    <section className="min-h-screen bg-background">
      {/* barra fixa */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center text-sm md:text-base sticky top-0 z-50 shadow">
        <AlertCircle className="inline w-4 h-4 mr-2 -mt-0.5" />
        Assista ao vídeo completo para garantir sua vaga
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* topo minimal */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center">
            <LogoIcon size={60} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-lg font-semibold">
            <div className="h-6 w-6 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <span className="text-foreground">Aprovado</span>
          </div>
        </div>

        {/* VSL */}
        <ApprovedVSL />
      </div>
    </section>
  );
}