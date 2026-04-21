"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/general/Tooltip";

type ChatbotOption = {
  value: string;
  label: string;
};

type ChatbotFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
};

const MOBILE_BREAKPOINT = 640;

const initialFormData: ChatbotFormData = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function Chatbot(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ChatbotFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: "" });
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isMobile) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.chatbotOpen = isOpen ? "true" : "false";
    return () => {
      document.body.dataset.chatbotOpen = "false";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) {
        return;
      }
      const clickedPanel = panelRef.current?.contains(target);
      const clickedButton = buttonRef.current?.contains(target);
      if (!clickedPanel && !clickedButton) {
        handleClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitStatus({ type: null, message: "" });
    }, 250);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    const subject = "Demande de devis";
    const fullMessage = `${formData.phone ? `Téléphone: ${formData.phone}\n\n` : ""}${formData.message}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject,
          message: fullMessage
        })
      });
      if (!response.ok) {
        throw new Error("request_failed");
      }
      setSubmitStatus({
        type: "success",
        message: "Votre message a été envoyé avec succès. Nous revenons vers vous rapidement."
      });
      setFormData(initialFormData);
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Une erreur est survenue lors de l'envoi. Merci de réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            ref={buttonRef}
            onClick={() => setIsOpen(true)}
            size="icon"
            className="sweep-light h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-primary/40"
            aria-label="Ouvrir le chatbot"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[48] bg-black/30"
                onClick={handleClose}
              />
            ) : null}
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16, scale: isVisible ? 1 : 0.96 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed z-[49] flex max-h-[calc(100vh-2.5rem)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-96 md:max-w-md"
              style={{
                bottom: "1.25rem",
                right: isMobile ? "auto" : "1.5rem",
                left: isMobile ? "50%" : "auto",
                transform: isMobile
                  ? `translateX(-50%) ${isVisible ? "translateY(0)" : "translateY(1rem)"}`
                  : undefined,
                transformOrigin: isMobile ? "bottom center" : "bottom right"
              }}
              onClick={isMobile ? (event) => event.stopPropagation() : undefined}
            >
              <div className="flex items-center justify-between rounded-t-2xl bg-primary px-3 py-2 text-primary-foreground sm:px-5 sm:py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white sm:h-10 sm:w-10">
                    <MessageCircle className="text-base text-primary sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold sm:text-lg">Demander un devis</h3>
                    <p className="text-xs text-primary-foreground/90 sm:text-sm">Nous répondons sous 24h</p>
                  </div>
                </div>
                <Tooltip content="Fermer" position="left">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="-m-2 h-8 w-8 rounded-lg p-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    aria-label="Fermer le chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </Tooltip>
              </div>

              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-2 overflow-y-auto p-3 sm:p-4">
                  <div>
                    <label htmlFor="chatbot-name" className="mb-1 block text-sm font-medium text-foreground">
                      Nom complet
                    </label>
                    <input
                      id="chatbot-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="chatbot-email" className="mb-1 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="chatbot-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean.dupont@exemple.fr"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="chatbot-phone" className="mb-1 block text-sm font-medium text-foreground">
                      Téléphone
                    </label>
                    <input
                      id="chatbot-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="chatbot-message" className="mb-1 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="chatbot-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Décrivez votre projet..."
                      className={`${inputClassName} min-h-[100px] resize-none`}
                    />
                  </div>

                  {submitStatus.type ? (
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        submitStatus.type === "success"
                          ? "bg-primary/15 text-foreground"
                          : "bg-destructive/15 text-foreground"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  ) : null}
                </div>

                <div className="border-t p-3 sm:p-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="sweep-light w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    {isSubmitting ? null : <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
