"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

const CONTACT_EMAIL = "hirakada.id@gmail.com";

const contactOptions = [
  "Project collaboration",
  "Freelance opportunity",
  "Technical consultation",
  "Research or education",
  "General question",
] as const;

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.get("type"),
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 w-full px-(--global-padding-x) py-section"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <header className="max-w-md">
          <p className="text-label text-muted uppercase tracking-widest">
            Contact
          </p>
          <h2 className="text-display mt-3">
            Let&apos;s make something useful.
          </h2>
          <p className="text-body text-muted mt-5">
            Tell me what you are working on, and I will get back to you at
            {" "}
            {CONTACT_EMAIL}.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium"
          >
            <Mail className="size-4" />
            Send an email
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 border-t border-border pt-6"
        >
          <label className="grid gap-2 text-sm">
            <span className="font-medium">What can I help with?</span>
            <select
              name="type"
              defaultValue={contactOptions[0]}
              className="h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition-colors focus:border-foreground"
            >
              {contactOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="font-medium">Name</span>
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium">Email</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            <span className="font-medium">Message</span>
            <textarea
              required
              name="message"
              rows={6}
              className="resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground"
              placeholder="A few details about your idea or question..."
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
            <ArrowUpRight className="size-4" />
          </button>

          {status === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Your message has been sent.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">
              We could not send your message. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}