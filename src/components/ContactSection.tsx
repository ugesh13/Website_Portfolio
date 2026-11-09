import React, { useState } from "react";
import gsap from "gsap";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Copy, Check, ArrowUpRight, FileDown, Send, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { useSectionReveals, REVEAL_EASE } from "../hooks/useSectionReveals";

const ContactRow: React.FC<{
  label: string;
  value: string;
  href?: string;
  breakAll?: boolean;
}> = ({ label, value, href, breakAll }) => {
  const content = (
    <div data-row-inner className="flex items-center justify-between gap-4">
      <span className="text-xs uppercase tracking-[0.28em] text-gray-400 font-mono">
        {label}
      </span>
      <span
        className={`text-xs sm:text-sm font-medium text-white group-hover:text-[#ff5c3d] transition-colors ${
          breakAll ? "break-all text-right" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div className="group px-6 md:px-8 py-5 transition-colors duration-300 hover:bg-white/[0.04]">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const { profile, theme } = PORTFOLIO_CONFIG;
  const [copied, setCopied] = useState(false);

  // Contact Form state
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);

  const headline = ["LET'S", "CONNECT"];

  const sectionRef = useSectionReveals<HTMLElement>(({ scope }) => {
    const panel = scope.querySelector<HTMLElement>("[data-contact-panel]");
    if (!panel) return;

    const rows = gsap.utils.toArray<HTMLElement>("[data-row-inner]", panel);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          once: true,
        },
      })
      .from(panel, {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: REVEAL_EASE,
      })
      .from(
        rows,
        {
          yPercent: 105,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: REVEAL_EASE,
        },
        "-=0.75"
      );
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback */
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSending(true);

    // Form submission handling via Formspree or mailto fallback
    try {
      const response = await fetch("https://formspree.io/f/xbjvnwqk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio Contact from ${formState.name}`,
        }),
      });

      if (response.ok) {
        setFormSent(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        // Fallback to mailto
        window.location.href = `mailto:${profile.email}?subject=Contact from ${encodeURIComponent(
          formState.name
        )}&body=${encodeURIComponent(formState.message)}`;
        setFormSent(true);
      }
    } catch {
      window.location.href = `mailto:${profile.email}?subject=Contact from ${encodeURIComponent(
        formState.name
      )}&body=${encodeURIComponent(formState.message)}`;
      setFormSent(true);
    } finally {
      setFormSending(false);
    }
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="bg-[#050505] text-white pt-24 pb-0 relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between">
          {/* Left: Headline, CTA & Direct Buttons */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  style={{ backgroundColor: theme.accent }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase">
                  Open for Opportunities
                </span>
              </div>

              <h2
                data-reveal-lines
                className="text-4xl md:text-6xl font-black tracking-tighter drop-shadow-2xl mb-6 leading-[0.95] uppercase"
              >
                {headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <span
                      className={`line block ${
                        i === 1
                          ? "italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c3d] to-amber-300"
                          : "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800"
                      }`}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h2>

              <p
                data-reveal
                data-reveal-delay="0.15"
                className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-md mb-8"
              >
                {profile.availabilityText}. Let's team up to build clean, high-performance web products together.
              </p>

              {/* Action Buttons: Email, Copy Email, Download Resume & LinkedIn (min-h-[44px] touch targets) */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  style={{ backgroundColor: theme.accent }}
                  className="px-5 py-2.5 min-h-[44px] rounded-full text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Send an email
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-5 py-2.5 min-h-[44px] rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy email
                    </>
                  )}
                </button>

                <a
                  href="/Ugesh_Kumar_Resume.pdf"
                  download="Ugesh_Kumar_Resume.pdf"
                  className="px-5 py-2.5 min-h-[44px] rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white active:scale-95 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  Download Resume
                </a>

                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 min-h-[44px] rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 backdrop-blur-md transition-all hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] active:scale-95"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Quick Metadata Card */}
            <div className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-gray-400">
              <p className="text-gray-300 font-semibold mb-1">Location &amp; Availability</p>
              <p>{profile.location} · Available for immediate internship onboarding</p>
            </div>
          </div>

          {/* Right: Interactive Contact Form & Contact Details */}
          <div className="w-full lg:w-6/12 flex flex-col gap-6">
            {/* Short Contact Form */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-[#ff5c3d]" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                  Send a Direct Message
                </h3>
              </div>

              {formSent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3">
                  <Check className="w-5 h-5 shrink-0" />
                  <span>Thank you! Your message has been sent. Ugesh will respond shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Rivera"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff5c3d]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff5c3d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Ugesh, I'd like to discuss an opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff5c3d] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSending}
                    className="w-full py-3 rounded-xl bg-[#ff5c3d] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {formSending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channel Strip */}
            <div
              data-contact-panel
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden divide-y divide-white/[0.08]"
            >
              <ContactRow label="Email" value={profile.email} href={`mailto:${profile.email}`} breakAll />
              <ContactRow label="GitHub" value="github.com/ugesh13" href={profile.socials.github} />
              <ContactRow label="LinkedIn" value="linkedin.com/in/ugesh16" href={profile.socials.linkedin} />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer with Back to top link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pb-16">
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} {profile.name} · B.Tech CSBS @ Jain University FET
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/Ugesh_Kumar_Resume.pdf"
              download="Ugesh_Kumar_Resume.pdf"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5" /> Download Resume
            </a>
            <a href="#home" className="hover:text-white transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
