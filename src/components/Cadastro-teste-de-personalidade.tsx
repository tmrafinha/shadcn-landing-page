import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Sparkles,
  Send,
  Phone,
  Mail,
  User,
  FileText,
} from "lucide-react";
import { useAppNavigate } from "@/hooks/useNavigate";

const WEBHOOK_URL =
  "https://webhook.sellflux.app/v2/webhook/custom/21013a82106dc39c8eb89bb9d42073d5";

const USER_STORE_KEY = "goDevUser";

export default function CadastroTestePersonalidade() {
  const { goToTesteDePersonalidade } = useAppNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const emailValid = /.+@.+\..+/.test(email);
  const nameValid = name.trim().length >= 2;
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 10;
  const formValid = nameValid && emailValid && phoneValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    setError(null);

    if (!formValid) return;

    try {
      setLoading(true);
      await axios.post(
        WEBHOOK_URL,
        { name, email, phone },
        { headers: { "Content-Type": "application/json" } }
      );

      try {
        const payload = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(USER_STORE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn("Não foi possível salvar no localStorage:", e);
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Falha ao enviar. Tente novamente.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Teste de Personalidade</div>
                <div className="text-foreground font-semibold">
                  Identificação
                </div>
              </div>
            </div>

            {success && (
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold animate-in fade-in duration-500">
                <CheckCircle className="w-5 h-5" />
                Enviado!
              </div>
            )}
          </div>

          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                success
                  ? "bg-green-500"
                  : error
                  ? "bg-red-500"
                  : "bg-primary"
              }`}
              style={{ width: `${success ? 100 : 50}%` }}
            />
          </div>
        </div>

        {/* Card do formulário */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6 animate-in slide-in-from-right duration-500">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Preencha seus dados
              </h2>
              <p className="text-muted-foreground">
                Precisamos das seguintes informações para começar o teste de personalidade.
              </p>

              {/* Nome */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Nome
                </label>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 bg-muted/50 ${
                    touched.name && !nameValid
                      ? "border-red-500 bg-red-500/10"
                      : "border-border"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ${
                      touched.name && !nameValid
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, name: true }))
                    }
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {touched.name && !nameValid && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    Informe pelo menos 2 caracteres.
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Email
                </label>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 bg-muted/50 ${
                    touched.email && !emailValid
                      ? "border-red-500 bg-red-500/10"
                      : "border-border"
                  }`}
                >
                  <Mail
                    className={`w-5 h-5 ${
                      touched.email && !emailValid
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, email: true }))
                    }
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {touched.email && !emailValid && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    Informe um email válido.
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Telefone
                </label>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 bg-muted/50 ${
                    touched.phone && !phoneValid
                      ? "border-red-500 bg-red-500/10"
                      : "border-border"
                  }`}
                >
                  <Phone
                    className={`w-5 h-5 ${
                      touched.phone && !phoneValid
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  <input
                    type="tel"
                    placeholder="(11) 91234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, phone: true }))
                    }
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {touched.phone && !phoneValid && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    Informe um telefone válido (10 a 11 dígitos).
                  </p>
                )}
              </div>

              {error && (
                <div className="p-4 rounded-xl border-2 bg-red-500/10 border-red-500/30 animate-in slide-in-from-bottom">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-500">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !formValid}
                className="w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-60"
              >
                {loading ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Enviar
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            // Sucesso
            <div className="text-center animate-in fade-in slide-in-from-top duration-700">
              <h1 className="text-xl md:text-5xl font-black mb-3 text-green-600 dark:text-green-400">
                Tudo pronto <span className="text-white">para <br /> começar o </span>teste!
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Agora você está pronto para realizar o{" "}
                <span className="text-primary font-semibold">Teste de Personalidade Go Dev™</span>.
              </p>

              <div className="bg-muted/50 rounded-xl p-6 border border-border mt-8 text-left">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  O que você precisa saber
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>O teste contém <strong>30 perguntas de autoavaliação</strong>.</li>
                  <li>Você terá até <strong>30 minutos</strong> para responder com calma.</li>
                  <li>O foco aqui não é te avaliar tecnicamente, mas entender <strong>como você gosta de atuar em time</strong>.</li>
                  <li>
                    Esse resultado será usado junto com o teste técnico para montar{" "}
                    <span className="text-primary font-semibold">seu perfil completo no Banco de Talentos Go Dev</span>.
                  </li>
                </ul>
              </div>

              <Button
                onClick={goToTesteDePersonalidade}
                className="mt-8 w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Começar o teste agora
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}
