import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithBot } from "@/lib/chat.functions";
import { useI18n } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatBot() {
  const { dir, lang } = useI18n();
  const isAr = lang === "ar";
  const chat = useServerFn(chatWithBot);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: isAr
        ? "أهلاً! أنا Pure من فريق Pure Digital. كيف أقدر أساعدك اليوم؟ 👋"
        : "Hi! I'm Pure from the Pure Digital team. How can I help you today? 👋",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({ data: { messages: next.slice(-12) } });
      if (res.error || !res.reply) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: res.error || (isAr ? "تعذر الرد، حاول مرة أخرى." : "Sorry, please try again.") },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: isAr ? "خطأ في الشبكة." : "Network error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Position: use logical 'start' so it's always opposite WhatsApp (which uses 'end-6')
  // In LTR → left side; In RTL (Arabic) → right side. Never collide.
  const sideClass = "start-5 sm:start-6";

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={isAr ? "افتح المساعد" : "Open chat assistant"}
        className={cn(
          "fixed bottom-5 sm:bottom-6 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-lg",
          "gradient-bg hover:scale-105 transition-transform",
          sideClass
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            dir={dir}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className={cn(
              "fixed bottom-24 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
              "h-[32rem] max-h-[70vh]",
              sideClass
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-4">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-bg text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{isAr ? "Pure — مساعد بيور ديجيتال" : "Pure — Digital Assistant"}</p>
                <p className="text-xs text-muted-foreground">{isAr ? "متصل الآن" : "Online now"}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "gradient-bg text-white rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder={isAr ? "اكتب رسالتك..." : "Type your message..."}
                  className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  disabled={loading}
                />
                <Button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  size="icon"
                  className="gradient-bg h-10 w-10 shrink-0 border-0"
                  aria-label={isAr ? "إرسال" : "Send"}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                {isAr ? "مدعوم بالذكاء الاصطناعي • قد يخطئ أحياناً" : "AI-powered • may occasionally be inaccurate"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
