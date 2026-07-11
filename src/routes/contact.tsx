import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BiblioGabon" },
      { name: "description", content: "Contactez l'équipe BiblioGabon à Libreville." },
      { property: "og:title", content: "Contact — BiblioGabon" },
      {
        property: "og:description",
        content: "Écrivez-nous, appelez-nous ou rendez-nous visite à Libreville.",
      },
    ],
  }),
  component: Contact,
});

interface ContactForm {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const FORM_INITIAL: ContactForm = { nom: "", email: "", sujet: "", message: "" };

function Contact() {
  const [form, setForm] = useState<ContactForm>(FORM_INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const updateField =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(FORM_INITIAL);
  };

  return (
    <SiteLayout>
      <div className="h-1 gabon-stripe" aria-hidden="true" />
      <PageHeader
        Icon={Mail}
        accent="gold"
        image="/heroes/hero-contact.png"
        eyebrow="Contact"
        title="Parlons-en."
        description="Écrivez-nous pour toute question, partenariat ou proposition de contribution."
        crumbs={[{ label: "Accueil", to: "/" }, { label: "Contact" }]}
      />
      <section>
        <div className="container-editorial py-12 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl border border-green/30 bg-green-soft p-8 md:p-10 flex flex-col items-start gap-4 shadow-editorial"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-green text-white">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-navy">Message envoyé.</h2>
                <p className="mt-2 text-foreground/80 leading-relaxed">
                  Merci de nous avoir écrit. Notre équipe vous répondra dans les meilleurs délais à
                  l'adresse indiquée.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white"
                onClick={() => setSubmitted(false)}
              >
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border p-6 md:p-8 bg-card shadow-editorial"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    required
                    value={form.nom}
                    onChange={updateField("nom")}
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={updateField("email")}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sujet">Sujet</Label>
                <Input
                  id="sujet"
                  required
                  value={form.sujet}
                  onChange={updateField("sujet")}
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="msg">Message</Label>
                <Textarea
                  id="msg"
                  required
                  rows={6}
                  value={form.message}
                  onChange={updateField("message")}
                />
              </div>
              <Button type="submit" className="bg-navy text-white hover:bg-navy-deep h-11 px-6">
                Envoyer le message
              </Button>
            </form>
          )}
          <div className="space-y-5">
            <InfoBlock Icon={MapPin} title="Adresse" text="Libreville, République Gabonaise 🇬🇦" />
            <InfoBlock
              Icon={Mail}
              title="E-mail"
              text="contact@biblio-gabon.ga"
              href="mailto:contact@biblio-gabon.ga"
            />
            <InfoBlock
              Icon={Phone}
              title="Téléphone"
              text="+241 66 15 24 01"
              href="tel:+24166152401"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoBlock({
  Icon,
  title,
  text,
  href,
}: {
  Icon: typeof MapPin;
  title: string;
  text: string;
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-5 flex items-start gap-4">
      <div className="flex size-11 items-center justify-center rounded-xl bg-navy-soft text-navy">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-green">{title}</p>
        {href ? (
          <a href={href} className="mt-1 block font-display text-navy hover:text-gold">
            {text}
          </a>
        ) : (
          <p className="mt-1 font-display text-navy">{text}</p>
        )}
      </div>
    </div>
  );
}
