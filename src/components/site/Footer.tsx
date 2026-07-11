import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DOMAINES } from "@/data/domaines";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-deep text-white/85">
      <div className="gabon-rule" aria-hidden />
      <div className="container-editorial py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-xl bg-white/95 px-3 py-2">
            <Logo size={34} withWordmark asLink={false} />
          </div>
          <p className="text-sm leading-relaxed text-white/70 max-w-xs">
            La bibliothèque numérique des universités et grandes écoles de la République Gabonaise.
          </p>
          <div className="flex items-center gap-2 pt-2">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "X" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Catalogue">
          <FLink to="/livres">Livres</FLink>
          <FLink to="/articles">Articles</FLink>
          <FLink to="/examens">Examens</FLink>
          <FLink to="/cours">TD / TP</FLink>
          <FLink to="/cours">Cours</FLink>
          <FLink to="/theses">Thèses</FLink>
        </FooterCol>

        <FooterCol title="Domaines">
          {DOMAINES.slice(0, 6).map((d) => (
            <FLink key={d.slug} to="/domaines/$slug" params={{ slug: d.slug }}>
              {d.nom}
            </FLink>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex items-start gap-2">
            <MapPin className="size-4 mt-0.5 text-gold shrink-0" />
            <span>Libreville, République Gabonaise 🇬🇦</span>
          </li>
          <li className="flex items-start gap-2">
            <Mail className="size-4 mt-0.5 text-gold shrink-0" />
            <a href="mailto:contact@biblio-gabon.ga" className="hover:text-gold">
              contact@biblio-gabon.ga
            </a>
          </li>
          <li className="flex items-start gap-2">
            <Phone className="size-4 mt-0.5 text-gold shrink-0" />
            <span>+241 66 15 24 01</span>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-editorial py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2026 BiblioGabon · République Gabonaise 🇬🇦 · v2.0.0</p>
          <div className="flex items-center gap-5">
            <Link to="/confidentialite" className="hover:text-gold">
              Confidentialité
            </Link>
            <Link to="/cgu" className="hover:text-gold">
              CGU
            </Link>
            <Link to="/contact" className="hover:text-gold">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-white/70">{children}</ul>
    </div>
  );
}

function FLink({
  to,
  params,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link to={to} params={params as never} className="hover:text-gold transition">
        {children}
      </Link>
    </li>
  );
}
