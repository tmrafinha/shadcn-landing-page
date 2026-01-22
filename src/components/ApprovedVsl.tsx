"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Timer as TimerIcon, Play } from "lucide-react";

const REQUIRED_PERCENT = 98;

// ✅ sem controles do Vimeo (sem barra)
// ✅ sem autoplay (pausado por padrão)
// ✅ playsinline iPhone-friendly
const VIMEO_SRC =
  "https://player.vimeo.com/video/1155686997" +
  "?autoplay=0" + // <- pausado por padrão
  "&muted=0" + // <- vamos controlar no clique
  "&playsinline=1" +
  "&badge=0" +
  "&autopause=0" +
  "&controls=0" + // <- sem barra/controles
  "&title=0" +
  "&byline=0" +
  "&portrait=0" +
  "&keyboard=0";

const REDIRECT_URL =
  "https://banco-de-talentos-godev.vercel.app/sign-in?redirect=%2F";

export function ApprovedVSL() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const durationRef = useRef<number>(0);
  const maxWatchedRef = useRef<number>(0);

  const [ready, setReady] = useState(false);

  const [realPercent, setRealPercent] = useState(0);
  const [uiPercent, setUiPercent] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  // ✅ overlay botão iniciar
  const [started, setStarted] = useState(false);

  const computeUiPercent = (real: number) => {
    let boost = 0;
    if (real < 25) boost = 14;
    else if (real < 50) boost = 10;
    else if (real < 70) boost = 6;
    else boost = 0;

    const value = Math.min(real + boost, 99);
    return Math.max(real, value);
  };

  useEffect(() => {
    let cancelled = false;

    const loadVimeoApi = () =>
      new Promise<void>((resolve, reject) => {
        if ((window as any)?.Vimeo?.Player) return resolve();

        const existing = document.querySelector(
          'script[src="https://player.vimeo.com/api/player.js"]'
        ) as HTMLScriptElement | null;

        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(), { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src = "https://player.vimeo.com/api/player.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });

    (async () => {
      try {
        await loadVimeoApi();
        if (cancelled) return;

        const Vimeo = (window as any).Vimeo;
        if (!Vimeo?.Player || !iframeRef.current) return;

        const player = new Vimeo.Player(iframeRef.current);
        playerRef.current = player;
        setReady(true);

        // duração
        try {
          const d = Number(await player.getDuration()) || 0;
          durationRef.current = d;
        } catch {
          durationRef.current = 0;
        }

        // ✅ garante que começa pausado
        try {
          await player.pause();
        } catch {}

        // progresso real (anti-skip pelo maior tempo assistido)
        player.on("timeupdate", (data: any) => {
          const seconds = Number(data?.seconds || 0);
          const d = Number(data?.duration || durationRef.current || 0);

          maxWatchedRef.current = Math.max(maxWatchedRef.current, seconds);

          if (d > 0) {
            const real = Math.floor((maxWatchedRef.current / d) * 100);
            setRealPercent(real);
            setUiPercent((prev) => Math.max(prev, computeUiPercent(real)));
          }
        });

        // anti-skip (tenta avançar? volta)
        const antiSkip = async (data: any) => {
          try {
            const seekTo = Number(data?.seconds || 0);
            const allowed = maxWatchedRef.current + 2;
            if (seekTo > allowed) {
              await player.setCurrentTime(maxWatchedRef.current);
            }
          } catch {}
        };

        player.on("seeked", antiSkip);
        player.on("seeking", antiSkip);

        player.on("ended", () => setUnlocked(true));
      } catch {
        setReady(false);
      }
    })();

    return () => {
      cancelled = true;
      try {
        const p = playerRef.current;
        p?.off?.("timeupdate");
        p?.off?.("seeked");
        p?.off?.("seeking");
        p?.off?.("ended");
      } catch {}
    };
  }, []);

  useEffect(() => {
    if (realPercent >= REQUIRED_PERCENT) setUnlocked(true);
  }, [realPercent]);

  const progressWidth = `${Math.min(100, Math.max(0, uiPercent))}%`;

  const buttonLabel = useMemo(() => {
    if (unlocked) return "Acessar gratuitamente o Banco de Talentos";
    return "Assista para liberar seu acesso gratuito";
  }, [unlocked]);

  // ✅ clique único: inicia com volume máximo e som ligado
  const handleStart = async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      // iOS exige que som + play aconteça no mesmo gesto do usuário
      await player.setVolume(1);
      await player.setMuted(false);
      await player.play();

      setStarted(true);
    } catch {
      // se falhar, ainda esconde overlay? melhor manter visível
      setStarted(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-4xl font-black text-foreground leading-tight">
          Em poucos minutos, vamos liberar acesso{" "}
          <span className="text-primary">100% gratuito</span> ao{" "}
          <span className="text-primary">Banco de Talentos GoDev</span> <br />
        </h2>

        <p className="text-lg md:text-lg text-muted-foreground mt-2">
          Você precisa assistir o vídeo{" "}
          <span className="text-primary">até o final</span> para liberar o acesso.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 relative">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            ref={iframeRef}
            src={VIMEO_SRC}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="vsl-pronta"
          />

          {/* ✅ overlay iniciar */}
          {!started && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <button
                type="button"
                onClick={handleStart}
                className="px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg md:text-xl shadow-xl flex items-center gap-3 hover:opacity-95 active:scale-[0.99]"
              >
                <Play className="w-6 h-6" />
                Iniciar vídeo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-2">
            <TimerIcon className="w-4 h-4" />
            <span>
              Progresso:{" "}
              <span className="font-semibold text-foreground">{uiPercent}%</span>
            </span>
          </div>

          <span className="font-semibold text-foreground">
            {unlocked ? "Liberado ✅" : "Bloqueado 🔒"}
          </span>
        </div>

        <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: progressWidth }}
          />
        </div>

        {!ready && (
          <p className="mt-2 text-[11px] text-muted-foreground text-center">
            Se o vídeo não carregar, recarregue a página e toque em “Iniciar vídeo com som”.
          </p>
        )}
      </div>

      <Button
        className="w-full h-14 text-lg font-black mt-5 shadow-lg hover:shadow-xl"
        disabled={!unlocked}
        type="button"
        onClick={() => {
          if (!unlocked) return;
          window.location.href = REDIRECT_URL;
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}