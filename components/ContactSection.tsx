"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Github,
  Linkedin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import LightParticles from "@/components/ui/light-particles";
import { Tooltip } from "@/components/ui/tooltip";

export default function ContactSection() {
  const t = useTranslations('Home.contact');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez intégrer avec un service d'email
    console.log("Formulaire soumis:", formData);
    alert(t('form.success'));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-6 md:py-8 px-6 relative bg-gradient-to-b from-background via-background/95 to-background">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-card/80 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {t('form.title')}
                </CardTitle>
                <CardDescription>
                  {t('form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('form.fields.name')}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t('form.placeholders.name')}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('form.fields.email')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('form.placeholders.email')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('form.fields.subject')}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t('form.placeholders.subject')}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('form.fields.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('form.placeholders.message')}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sweep-light"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {t('info.title')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <a
                    href="mailto:tmilville.pro@gmail.com"
                    className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                  </a>
                  <div>
                    <h4 className="font-semibold mb-1">{t('info.email')}</h4>
                    <a
                      href="mailto:tmilville.pro@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      tmilville.pro@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <a
                    href="https://t.me/Thybow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </a>
                  <div>
                    <h4 className="font-semibold mb-1">{t('info.telegram')}</h4>
                    <a
                      href="https://t.me/Thybow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @Thybow
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('info.location')}</h4>
                    <p className="text-muted-foreground">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">{t('info.socialNetworks')}</h3>
              <div className="flex gap-4">
                <Tooltip content={t('tooltips.github')}>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://github.com/ThibautMilville"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                </Tooltip>
                <Tooltip content={t('tooltips.linkedin')}>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://fr.linkedin.com/in/thibaut-milville"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </Tooltip>
                <Tooltip content={t('tooltips.telegram')}>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://t.me/Thybow"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </Tooltip>
              </div>
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>{t('availability.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('availability.freelance')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">{t('availability.available')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('availability.consulting')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">{t('availability.available')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('availability.longMissions')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-orange-600">
                        {t('availability.onRequest')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {t('availability.guarantee')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
