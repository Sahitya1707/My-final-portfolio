import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { Availability } from "@/components/Availability";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMeta({
  title: "Contact",
  description: "Tell me about your website or project. I reply within two working days with honest next steps.",
  path: "/contact/",
});

const helpful = [
  "What your business does and who your customers are",
  "Your current website, if you have one, and what bothers you about it",
  "Two or three websites you like, from any industry",
  "Any date you're working towards, like a launch or a busy season",
];

export default function ContactPage() {
  return (
    <>
      <section className="page grid gap-14 pt-14 sm:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label mb-5">Contact</p>
          <h1 className="font-serif text-display-lg">Tell me about your project.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            A few sentences is plenty. I&rsquo;ll reply {site.replyTime} with questions or a suggested next step.
            There&rsquo;s no cost and no obligation.
          </p>

          <Availability withNote className="mt-8 text-[0.95rem]" />

          <div className="mt-10 border-t border-ink pt-6">
            <p className="label mb-2">Prefer email?</p>
            <a href={`mailto:${site.email}`} className="link break-all font-serif text-2xl sm:text-3xl">
              {site.email}
            </a>
          </div>

          <div className="mt-10">
            <h2 className="label mb-4 !text-ink">Helpful to include</h2>
            <ul className="border-t border-rule">
              {helpful.map((h) => (
                <li key={h} className="flex gap-3 border-b border-rule py-3 text-[0.97rem]">
                  <span aria-hidden="true" className="text-signal">
                    +
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
            {site.socials.map((s) => (
              <li key={s.url}>
                <a className="link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border border-ink p-6 sm:p-10">
            <ContactForm />
          </div>
          <p className="mt-4 text-sm text-muted">
            Based in {site.location} ({site.timezone}). Happy to work with clients anywhere, by email or video call.
          </p>
        </div>
      </section>
      <SiteFooter showCta={false} />
    </>
  );
}
