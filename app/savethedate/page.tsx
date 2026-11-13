"use client";

import { FormEvent, useState } from "react";

// IMPORTANT: Change this if your Pose Suite inbox is different.
const INQUIRY_EMAIL = "gina@posesuite.com";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function SaveTheDatePage() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const fields = new FormData(form);

    // A hidden field helps filter automated spam submissions.
    if (String(fields.get("website") || "").trim()) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(fields.get("name") || ""),
      email: String(fields.get("email") || ""),
      wedding_date: String(fields.get("wedding_date") || ""),
      wedding_venue: String(fields.get("wedding_venue") || ""),
      guest_count: String(fields.get("guest_count") || ""),
      notes: String(fields.get("notes") || ""),
      _subject: "Pose Suite | New Wedding Date Inquiry",
      _template: "table",
      _captcha: "false",
    };

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error("Unable to send inquiry");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="ps-page">
      <div className="ps-content">
        <header className="ps-header">
          <p className="ps-brand">POSE SUITE</p>
          <p className="ps-tagline">A LUXURY PORTRAIT EXPERIENCE</p>
          <div className="ps-divider" aria-hidden="true" />
        </header>

        <section className="ps-intro" aria-labelledby="ps-title">
          <h1 id="ps-title">
            <span>Check Your</span>
            <span>Wedding Date</span>
          </h1>
          <p>
            Let&apos;s see if your date is available
            <span className="ps-mobile-break"> </span>
            for the Pose Suite experience.
          </p>
        </section>

        {status === "success" ? (
          <section className="ps-form ps-success" role="status">
            <p className="ps-success-label">THANK YOU FOR INQUIRING</p>
            <h2>Your story starts here.</h2>
            <p>
              Your wedding date inquiry has been sent. We&apos;ll review your
              event details and be in touch with availability and next steps.
            </p>
            <button
              type="button"
              className="ps-button"
              onClick={() => setStatus("idle")}
            >
              SEND ANOTHER INQUIRY
            </button>
          </section>
        ) : (
          <form className="ps-form" onSubmit={handleSubmit}>
            <div className="ps-field">
              <label htmlFor="ps-name">YOUR NAME *</label>
              <input
                id="ps-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="First and last name"
                required
              />
            </div>

            <div className="ps-field">
              <label htmlFor="ps-email">EMAIL ADDRESS *</label>
              <input
                id="ps-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="ps-field">
              <label htmlFor="ps-date">WEDDING DATE *</label>
              <input
                id="ps-date"
                name="wedding_date"
                type="date"
                required
              />
            </div>

            <div className="ps-field">
              <label htmlFor="ps-venue">WEDDING VENUE *</label>
              <input
                id="ps-venue"
                name="wedding_venue"
                type="text"
                placeholder="Venue name and location (city, state)"
                required
              />
            </div>

            <div className="ps-field">
              <label htmlFor="ps-guests">APPROXIMATE GUEST COUNT *</label>
              <select id="ps-guests" name="guest_count" defaultValue="" required>
                <option value="" disabled>
                  Select a guest count
                </option>
                <option value="Under 75">Under 75</option>
                <option value="75–125">75–125</option>
                <option value="126–200">126–200</option>
                <option value="201–300">201–300</option>
                <option value="Over 300">Over 300</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <div className="ps-field">
              <label htmlFor="ps-notes">TELL US A LITTLE MORE (OPTIONAL)</label>
              <textarea
                id="ps-notes"
                name="notes"
                rows={3}
                placeholder="Share any details about your vision, timeline, or questions."
              />
            </div>

            <div className="ps-honeypot" aria-hidden="true">
              <label htmlFor="ps-website">Leave this field blank</label>
              <input id="ps-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <p className="ps-error" role="alert">
                Your request couldn&apos;t be sent. Please try again in a moment.
              </p>
            )}

            <button className="ps-button" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "SENDING..." : "CHECK MY DATE"}
            </button>
          </form>
        )}

        <footer className="ps-footer">
          <p>
            We&apos;ll personally review your details and be in touch soon
            <span>with availability and next steps.</span>
          </p>
          <div className="ps-divider" aria-hidden="true" />
          <small>Wedding dates are not reserved until confirmed by Pose Suite.</small>
        </footer>
      </div>

      <style jsx>{`
        .ps-page {
          min-height: 100vh;
          padding: 46px 20px 60px;
          color: #eee6d8;
          background:
            radial-gradient(ellipse at 50% 42%, rgba(87, 92, 64, 0.16), transparent 65%),
            #1d2117;
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
        }
        .ps-page * { box-sizing: border-box; }
        .ps-content { width: 100%; max-width: 768px; margin: 0 auto; }
        .ps-header, .ps-intro, .ps-footer { text-align: center; }
        .ps-brand {
          margin: 0;
          font-family: Didot, 'Bodoni MT', 'Times New Roman', serif;
          font-size: clamp(37px, 8vw, 69px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.16em;
        }
        .ps-tagline {
          margin: 18px 0 0;
          font-size: 11px;
          letter-spacing: 0.42em;
          line-height: 1.8;
        }
        .ps-divider { width: 104px; height: 1px; background: #c9bba3; margin: 36px auto; }
        .ps-intro h1 {
          margin: 0;
          font-family: Didot, 'Bodoni MT', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(50px, 9vw, 91px);
          line-height: 0.99;
          letter-spacing: -0.035em;
        }
        .ps-intro h1 span { display: block; }
        .ps-intro p {
          margin: 36px auto 38px;
          max-width: 590px;
          font-size: 12px;
          line-height: 2;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .ps-mobile-break { display: block; }
        .ps-form {
          border: 1px solid rgba(233, 223, 202, 0.65);
          padding: 34px 48px 42px;
        }
        .ps-field { margin-bottom: 24px; }
        .ps-field label {
          display: block;
          margin-bottom: 11px;
          font-size: 11px;
          letter-spacing: 0.24em;
          line-height: 1.7;
        }
        .ps-field input,
        .ps-field select,
        .ps-field textarea {
          display: block;
          width: 100%;
          border: 1px solid rgba(233, 223, 202, 0.74);
          border-radius: 0;
          padding: 13px 15px;
          color: #f2e9dc;
          background: rgba(10, 12, 8, 0.13);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 17px;
          font-style: italic;
          line-height: 1.4;
          outline-offset: 3px;
        }
        .ps-field input::placeholder,
        .ps-field textarea::placeholder { color: rgba(238, 230, 216, 0.79); opacity: 1; }
        .ps-field input:focus,
        .ps-field select:focus,
        .ps-field textarea:focus { outline: 1px solid #eee6d8; }
        .ps-field input[type='date'] { min-height: 52px; color-scheme: dark; }
        .ps-field select { appearance: auto; min-height: 52px; }
        .ps-field select option { background: #1d2117; color: #eee6d8; }
        .ps-field textarea { resize: vertical; min-height: 98px; }
        .ps-button {
          display: block;
          width: 100%;
          min-height: 64px;
          margin-top: 6px;
          padding: 16px;
          border: 1px solid #e5d7c4;
          border-radius: 0;
          background: #e5d7c4;
          color: #202218;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.32em;
          cursor: pointer;
          transition: background 180ms ease;
        }
        .ps-button:hover { background: #f3e9db; }
        .ps-button:focus-visible { outline: 2px solid white; outline-offset: 4px; }
        .ps-button:disabled { opacity: 0.65; cursor: wait; }
        .ps-error { color: #ffd2c7; font-size: 14px; line-height: 1.6; }
        .ps-honeypot { position: absolute; left: -9999px; height: 0; overflow: hidden; }
        .ps-footer { padding: 28px 10px 0; }
        .ps-footer > p {
          margin: 0;
          font-family: Didot, 'Bodoni MT', Georgia, serif;
          font-style: italic;
          font-size: 22px;
          line-height: 1.45;
        }
        .ps-footer > p span { display: block; }
        .ps-footer .ps-divider { margin: 26px auto 22px; }
        .ps-footer small { color: #c4baa9; font-size: 11px; line-height: 1.7; }
        .ps-success { text-align: center; padding-top: 66px; padding-bottom: 64px; }
        .ps-success-label { font-size: 11px; letter-spacing: 0.28em; }
        .ps-success h2 {
          margin: 14px 0 22px;
          font-family: Didot, 'Bodoni MT', Georgia, serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(38px, 7vw, 62px);
        }
        .ps-success > p:not(.ps-success-label) {
          max-width: 470px;
          margin: 0 auto 30px;
          font-family: Georgia, serif;
          font-size: 17px;
          line-height: 1.75;
        }
        @media (max-width: 600px) {
          .ps-page { padding: 34px 16px 48px; }
          .ps-tagline { font-size: 9px; letter-spacing: 0.28em; }
          .ps-divider { margin: 26px auto; }
          .ps-intro p { margin: 28px auto; font-size: 10px; letter-spacing: 0.2em; }
          .ps-form { padding: 28px 20px 32px; }
          .ps-field { margin-bottom: 20px; }
          .ps-field label { font-size: 10px; letter-spacing: 0.16em; }
          .ps-field input, .ps-field select, .ps-field textarea { font-size: 16px; }
          .ps-button { font-size: 12px; letter-spacing: 0.22em; }
          .ps-footer > p { font-size: 19px; }
        }
      `}</style>
    </main>
  );
}

