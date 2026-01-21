"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Timer as TimerIcon, Volume2 } from "lucide-react";

const REQUIRED_PERCENT = 98;

// ✅ autoplay mutado (funciona no browser)
// ✅ controls=0 (tenta ocultar UI)
// Obs: Vimeo pode ainda mostrar controles em hover/touch dependendo da config.
const VIMEO_SRC =
  "https://player.vimeo.com/video/1155686997" +
  "?autoplay=1" +
  "&muted=1" +
  "&playsinline=1" +
  "&badge=0" +
  "&autopause=0" +
  "&controls=0" +
  "&title=0" +
  "&byline=0" +
  "&portrait=0" +
  "&keyboard=0";

export function ApprovedVSL() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  // refs para evitar "stale state" nos listeners
  const durationRef = useRef<number>(0);
  const maxWatchedRef = useRef<number>(0);

  const [ready, setReady] = useState(false);
  const [, setDuration] = useState(0);

  const [realPercent, setRealPercent] = useState(0); // % real (liberação)
  const [uiPercent, setUiPercent] = useState(0); // % "vturb-style" (visual)
  const [unlocked, setUnlocked] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [startingAudio, setStartingAudio] = useState(false);

  // --- Função: acelera o começo e estabiliza depois (visual only)
  const computeUiPercent = (real: number) => {
    let boost = 0;

    if (real < 25) boost = 14;
    else if (real < 50) boost = 10;
    else if (real < 70) boost = 6;
    else boost = 0;

    const value = Math.min(real + boost, 99);
    return Math.max(real, value);
  };

  // Carrega Vimeo Player API + instancia player
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
          setDuration(d);
        } catch {
          // ignore
        }

        // garante volume alto (mesmo mutado, já deixa preparado)
        try {
          await player.setVolume(1);
        } catch {
          // ignore
        }

        // autoplay mutado (pra funcionar)
        try {
          await player.setMuted(true);
          await player.play();
        } catch {
          // se bloquear, usuário dá play manual
        }

        // timeupdate
        player.on("timeupdate", (data: any) => {
          const seconds = Number(data?.seconds || 0);
          const d = Number(data?.duration || durationRef.current || 0);

          // maxWatched real (anti-skip)
          maxWatchedRef.current = Math.max(maxWatchedRef.current, seconds);

          if (d > 0) {
            const real = Math.floor((maxWatchedRef.current / d) * 100);
            setRealPercent(real);
            setUiPercent((prev) => {
              const next = computeUiPercent(real);
              return Math.max(prev, next);
            });
          }
        });

        // anti-skip: seeked
        player.on("seeked", async (data: any) => {
          try {
            const seekTo = Number(data?.seconds || 0);
            const allowed = maxWatchedRef.current + 2;

            if (seekTo > allowed) {
              await player.setCurrentTime(maxWatchedRef.current);
            }
          } catch {
            // ignore
          }
        });

        // anti-skip: seeking (mais forte)
        player.on("seeking", async (data: any) => {
          try {
            const seekTo = Number(data?.seconds || 0);
            const allowed = maxWatchedRef.current + 2;

            if (seekTo > allowed) {
              await player.setCurrentTime(maxWatchedRef.current);
            }
          } catch {
            // ignore
          }
        });

        // terminou
        player.on("ended", () => {
          setUnlocked(true);
        });
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
      } catch {
        // ignore
      }
    };
  }, []);

  // liberação REAL
  useEffect(() => {
    if (realPercent >= REQUIRED_PERCENT) setUnlocked(true);
  }, [realPercent]);

  const progressWidth = `${Math.min(100, Math.max(0, uiPercent))}%`;

  const buttonLabel = useMemo(() => {
    if (unlocked) return "Garantir meu acesso";
    return `Assista para liberar seu acesso`;
  }, [unlocked]);

  // Clique para ativar áudio e reiniciar do começo
  const startWithAudioFromBeginning = async () => {
    if (!playerRef.current) return;

    setStartingAudio(true);

    try {
      // Reinicia tudo visual e real
      maxWatchedRef.current = 0;
      setRealPercent(0);
      setUiPercent(0);
      setUnlocked(false);

      await playerRef.current.setCurrentTime(0);
      await playerRef.current.setVolume(1);
      await playerRef.current.setMuted(false);
      await playerRef.current.play();

      setSoundEnabled(true);
    } catch {
      try {
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(1);
        await playerRef.current.play();
        setSoundEnabled(true);
      } catch {
        // ignore
      }
    } finally {
      setStartingAudio(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">


      {/* Headline única (vsl-style) */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-4xl font-black text-foreground leading-tight">
          Nós vamos garantir que você ganhe {" "}
          <span className="text-primary">pelo menos 7k/mês</span> sendo um fornecedor de tecnologia em  
          <span className="text-primary"> 60 dias</span>  ou menos
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Assista ao vídeo{" "}
          <span className="text-primary">até o final</span> para entender melhor
        </p>
      </div>

      {/* Vídeo (sem card grande, bem “VSL simples”) */}
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
        </div>

        {/* Botão de áudio */}
        {!soundEnabled && (
          <div className="absolute bottom-3 right-3">
            <Button
              type="button"
              variant="secondary"
              className="gap-2"
              onClick={startWithAudioFromBeginning}
              disabled={!ready || startingAudio}
            >
              <Volume2 className="w-4 h-4" />
              {startingAudio ? "Iniciando..." : "Ativar áudio (do início)"}
            </Button>
          </div>
        )}
      </div>

      {/* Progresso (pequeno, discreto) */}
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
      </div>

      {/* CTA */}
      <Button
        className="w-full h-14 text-lg font-black mt-5 shadow-lg hover:shadow-xl"
        disabled={!unlocked}
        type="button"
        onClick={() => {
          if (!unlocked) return;
          window.location.href = "https://pay.kiwify.com.br/J4oFiud";
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}