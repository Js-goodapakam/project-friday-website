import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import aiBot from "../../assets/AI Bot.png";

type Message = {
  id: number;
  from: "friday" | "user";
  text: string;
  suggestions?: string[];
};

const QUICK_ACTIONS = [
  "Tell me about Friday",
  "CRM Solutions",
  "Automation",
  "Communication",
  "AI Solutions",
  "Digital Transformation",
  "Talk to us",
];

const RESPONSES: Record<
  string,
  { text: string; suggestions: string[] }
> = {
  friday: {
    text:
      "I'm Friday — your AI-powered business technology assistant. I bring CRM, automation, communication, AI and digital transformation together so your business can work smarter, move faster and stay connected.",
    suggestions: [
      "What can Friday do?",
      "CRM Solutions",
      "Automation",
    ],
  },

  crm: {
    text:
      "CRM is the foundation for managing customer relationships. Friday can help you explore CRM implementation, lead management, customer management, sales workflows, follow-ups, reporting and connected business processes.",
    suggestions: [
      "CRM Implementation",
      "CRM + Communication",
      "Talk to us",
    ],
  },

  automation: {
    text:
      "Let's automate the repetitive work. Friday can help you explore workflow automation, approvals, notifications, lead assignment, follow-ups, data movement and connected business processes — so your team can focus on higher-value work.",
    suggestions: [
      "Workflow Automation",
      "CRM Automation",
      "Talk to us",
    ],
  },

  communication: {
    text:
      "Connected communication keeps your customers and teams closer. Friday can help you explore business communication solutions, customer conversations, calling, messaging and communication workflows connected with your business systems.",
    suggestions: [
      "Business Communication",
      "Communication + CRM",
      "Talk to us",
    ],
  },

  ai: {
    text:
      "AI can turn business data and workflows into intelligent experiences. Friday can help you explore AI-powered assistance, conversational experiences, intelligent automation and ways to connect AI with your business operations.",
    suggestions: [
      "AI Solutions",
      "AI Automation",
      "Talk to us",
    ],
  },

  transformation: {
    text:
      "Digital transformation is about making technology work as one connected system. Friday can help you explore how CRM, automation, communication and AI can modernize the way your business operates.",
    suggestions: [
      "CRM Solutions",
      "Automation",
      "AI Solutions",
    ],
  },

  contact: {
    text:
      "Absolutely! 👋 Tell me what you're looking to build, improve or automate. I can help you identify the right Friday solution and guide you toward the next step with our team.",
    suggestions: [
      "I need CRM",
      "I need Automation",
      "I want to talk to the team",
    ],
  },

  implementation: {
    text:
      "Friday can help you plan and implement connected business solutions around CRM, automation, communication and AI. The right implementation depends on your current process, users, integrations and business goals.",
    suggestions: [
      "CRM Solutions",
      "Automation",
      "Talk to us",
    ],
  },

  integration: {
    text:
      "Integrations connect your existing business tools instead of forcing your team to work across disconnected systems. Friday can help you explore CRM, communication, automation and API-based integration possibilities.",
    suggestions: [
      "CRM + Communication",
      "Workflow Automation",
      "Talk to us",
    ],
  },

  sales: {
    text:
      "If you're evaluating Friday for your business, I can help you identify the right solution based on your requirements. Tell me about your business, the process you want to improve and what you're trying to achieve.",
    suggestions: [
      "CRM Solutions",
      "Automation",
      "Talk to us",
    ],
  },

  fallback: {
    text:
      "I'm here to help. You can ask me about CRM, automation, communication, AI, digital transformation or getting in touch with the Friday team. Tell me what you're trying to achieve and I'll point you in the right direction.",
    suggestions: [
      "Tell me about Friday",
      "CRM Solutions",
      "Automation",
    ],
  },
};

function getResponse(input: string) {
  const value = input.toLowerCase().trim();

  if (
    value.includes("tell me about friday") ||
    value.includes("what is friday") ||
    value.includes("who are you") ||
    value.includes("what can friday do") ||
    value.includes("about friday")
  ) {
    return RESPONSES.friday;
  }

  if (
    value.includes("crm") ||
    value.includes("customer relationship") ||
    value.includes("customer management") ||
    value.includes("lead management") ||
    value.includes("sales pipeline")
  ) {
    return RESPONSES.crm;
  }

  if (
    value.includes("automation") ||
    value.includes("automate") ||
    value.includes("workflow") ||
    value.includes("approval") ||
    value.includes("repetitive")
  ) {
    return RESPONSES.automation;
  }

  if (
    value.includes("communication") ||
    value.includes("calling") ||
    value.includes("call") ||
    value.includes("messaging") ||
    value.includes("phone") ||
    value.includes("conversation")
  ) {
    return RESPONSES.communication;
  }

  if (
    value.includes("ai") ||
    value.includes("artificial intelligence") ||
    value.includes("intelligent")
  ) {
    return RESPONSES.ai;
  }

  if (
    value.includes("transformation") ||
    value.includes("digital") ||
    value.includes("modernize") ||
    value.includes("modernise")
  ) {
    return RESPONSES.transformation;
  }

  if (
    value.includes("implementation") ||
    value.includes("implement") ||
    value.includes("setup") ||
    value.includes("set up")
  ) {
    return RESPONSES.implementation;
  }

  if (
    value.includes("integration") ||
    value.includes("integrate") ||
    value.includes("api")
  ) {
    return RESPONSES.integration;
  }

  if (
    value.includes("talk to us") ||
    value.includes("contact") ||
    value.includes("sales") ||
    value.includes("team") ||
    value.includes("demo") ||
    value.includes("pricing")
  ) {
    return RESPONSES.contact;
  }

  return RESPONSES.fallback;
}

export default function FridayChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "friday",
      text: "Hi, I'm Friday! 👋",
      suggestions: [
        "Tell me about Friday",
        "CRM Solutions",
        "Automation",
      ],
    },
    {
      id: 2,
      from: "friday",
      text: "How can I help you today?",
      suggestions: [
        "Communication",
        "AI Solutions",
        "Talk to us",
      ],
    },
  ]);

  // Allow the large Friday Bot in the Hero section to open this same chat.
  useEffect(() => {
    const openFridayChat = () => {
      setOpen(true);
    };

    window.addEventListener("friday:open-chat", openFridayChat);

    return () => {
      window.removeEventListener("friday:open-chat", openFridayChat);
    };
  }, []);

  const sendMessage = (text: string) => {
    const value = text.trim();
    if (!value) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "user",
      text: value,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    window.setTimeout(() => {
      const response = getResponse(value);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          from: "friday",
          text: response.text,
          suggestions: response.suggestions,
        },
      ]);
    }, 450);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: Date.now(),
        from: "friday",
        text: "Hi, I'm Friday! 👋",
        suggestions: [
          "Tell me about Friday",
          "CRM Solutions",
          "Automation",
        ],
      },
      {
        id: Date.now() + 1,
        from: "friday",
        text: "How can I help you today?",
        suggestions: [
          "Communication",
          "AI Solutions",
          "Talk to us",
        ],
      },
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-[100] w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] border border-ink/[0.08] bg-white shadow-[0_24px_70px_-20px_rgba(11,28,51,0.35)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#0A3D91] via-[#126FD1] to-[#078bd3] px-4 py-3.5 text-white">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <img
                  src={aiBot}
                  alt="Friday AI"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold">Friday AI</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#79e6b0]" />
                  Online • Ready to help
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Friday chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-white/80 transition-all hover:bg-white/15 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="h-[330px] overflow-y-auto bg-[#f8fbfe] px-4 py-4">
              <div className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-ink/35">
                Friday AI Assistant
              </div>

              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.from === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[82%] rounded-[18px] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          message.from === "user"
                            ? "rounded-br-md bg-[#0A3D91] text-white"
                            : "rounded-bl-md border border-ink/[0.06] bg-white text-ink shadow-sm"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>

                    {/* Context-aware follow-up suggestions */}
                    {message.from === "friday" &&
                      message.suggestions &&
                      message.suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 }}
                          className="mt-2 flex flex-wrap gap-1.5"
                        >
                          {message.suggestions.map((suggestion) => (
                            <button
                              key={`${message.id}-${suggestion}`}
                              type="button"
                              onClick={() => sendMessage(suggestion)}
                              className="rounded-full border border-[#078bd3]/20 bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-[#0A3D91] shadow-sm transition-all hover:scale-[1.02] hover:border-[#078bd3]/40 hover:bg-[#078bd3]/[0.06]"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </motion.div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="border-t border-ink/[0.06] bg-white px-3.5 py-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink/40">
                  Quick help
                </div>

                <button
                  type="button"
                  onClick={resetConversation}
                  className="text-[10px] font-medium text-[#078bd3] transition-colors hover:text-[#0A3D91]"
                >
                  New chat
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => sendMessage(action)}
                    className="shrink-0 rounded-full border border-[#078bd3]/20 bg-[#078bd3]/[0.06] px-3 py-1.5 text-[11px] font-medium text-[#0A3D91] transition-all hover:scale-[1.03] hover:border-[#078bd3]/40 hover:bg-[#078bd3]/10"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-ink/[0.06] bg-white p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Friday anything..."
                className="min-w-0 flex-1 rounded-full bg-[#f4f7fa] px-4 py-2.5 text-[12px] text-ink outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-[#078bd3]/15"
              />

              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D91] text-white transition-all hover:scale-105 hover:bg-[#126FD1]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Friday AI chat" : "Open Friday AI chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[101] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0A3D91] via-[#126FD1] to-[#078bd3] shadow-[0_12px_35px_-10px_rgba(10,61,145,0.65)] ring-4 ring-white/80"
      >
        {open ? (
          <span className="text-2xl leading-none text-white">×</span>
        ) : (
          <>
            <img
              src={aiBot}
              alt=""
              className="h-10 w-10 object-contain"
            />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#45d39b]" />
          </>
        )}
      </motion.button>

      {/* Small greeting teaser when chat is closed */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.8, duration: 0.25 }}
            className="pointer-events-none fixed bottom-[27px] right-[84px] z-[99] hidden rounded-full border border-ink/[0.07] bg-white px-3.5 py-2 text-[11px] font-medium text-ink shadow-[0_8px_25px_-10px_rgba(11,28,51,0.3)] sm:block"
          >
            Hi, I'm Friday! 👋
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
