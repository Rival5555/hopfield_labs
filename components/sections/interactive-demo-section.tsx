"use client";

import * as React from "react";
import { Terminal, Send, Sparkles, Bot, User, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/section-reveal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESET_PROMPTS = [
  "What is your typical turnaround for an MVP?",
  "How does FYP mentoring & viva prep work?",
  "Can you integrate RAG with our Postgres DB?",
  "What is your core tech stack?",
];

export function InteractiveDemoSection() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Hopfield Labs. I am our calibrated engineering concierge. Ask me about our web development, mobile architecture, GenAI pipelines, or academic capstone mentorship.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `[System Notice]: ${errorText || "Error communicating with concierge."}`,
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (!res.body) {
        setIsLoading(false);
        return;
      }

      // Read streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMsg += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantMsg };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection interrupted. Please verify your network.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <SectionReveal>
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="eyebrow text-[var(--accent)]">
            LIVE GENAI DEMONSTRATION // ROUTE HANDLER
          </div>
          <h2 className="section-heading text-[var(--fg)]">
            Query Our Studio Engine Live
          </h2>
          <p className="body-text">
            Test the responsiveness of our production AI pipeline. Streamed token
            responses, domain-scoped guardrails, and server-side rate-limiting.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)] overflow-hidden shadow-2xl">
          {/* Terminal header bar */}
          <div className="px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]/80" />
              <span className="ml-2 font-mono text-xs text-[var(--fg-muted)] tracking-wider">
                HOPFIELD-AI // CONCIERGE v1.0
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="signal" dot pulse className="text-[10px] py-0">
                ACTIVE STREAM
              </Badge>
              <button
                onClick={() =>
                  setMessages([
                    {
                      role: "assistant",
                      content:
                        "Welcome to Hopfield Labs. I am our calibrated engineering concierge. Ask me about our web development, mobile architecture, GenAI pipelines, or academic capstone mentorship.",
                    },
                  ])
                }
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors p-1"
                title="Reset session"
                aria-label="Reset chat session"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages window */}
          <div className="p-4 sm:p-6 h-80 sm:h-96 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--signal)] shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-md p-3 leading-relaxed ${
                    m.role === "user"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--border)]"
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex items-center gap-1.5 text-[var(--fg-muted)]">
                      <Sparkles className="h-3.5 w-3.5 animate-spin text-[var(--signal)]" />
                      Synthesizing response...
                    </span>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset prompt pills */}
          <div className="p-3 bg-[var(--surface-2)]/50 border-t border-[var(--border)] flex flex-wrap gap-2">
            <span className="eyebrow text-[10px] self-center mr-1">SUGGESTED:</span>
            {PRESET_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => handleSubmit(p)}
                disabled={isLoading}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-all cursor-pointer disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="p-3 sm:p-4 bg-[var(--surface)] border-t border-[var(--border)] flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about deliverables, FYP mentorship, tech stack, or SLA..."
              disabled={isLoading}
              className="font-mono text-xs sm:text-sm bg-[var(--surface-2)]"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="default"
              className="gap-1.5 shrink-0 px-4"
              aria-label="Send question to AI concierge"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Transmit</span>
            </Button>
          </form>
        </div>
      </SectionReveal>
    </section>
  );
}
