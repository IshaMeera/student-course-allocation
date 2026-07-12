"use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askAI } from "@/services/aiApi";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about student course allocation.",
    },
  ]);

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await askAI(currentQuestion);

      console.log("AI Response:", response);

      const answer = response.answer ?? "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5" />

              <div>
                <h3 className="font-semibold">
                  Allocation AI
                </h3>

                <p className="text-xs text-muted-foreground">
                  AI-powered allocation assistant
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
               <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => (
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {children}
                      </ul>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">
                        {children}
                      </p>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-muted-foreground">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about allocation..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />

              <Button
                size="icon"
                onClick={handleSend}
                disabled={loading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </>
  );
}