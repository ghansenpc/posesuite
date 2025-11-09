"use client";

import { useState, useEffect } from "react";

export default function BasicsPage() {
  const [partner1Name, setPartner1Name] = useState("");
  const [partner2Name, setPartner2Name] = useState("");

  // Load saved names (if any) from localStorage when the page first loads
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("posesuiteBasics");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.partner1Name) setPartner1Name(data.partner1Name);
        if (data.partner2Name) setPartner2Name(data.partner2Name);
      }
    } catch {
      // ignore if parsing fails
    }
  }, []);

  // Save names whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      partner1Name,
      partner2Name,
    };
    window.localStorage.setItem("posesuiteBasics", JSON.stringify(payload));
  }, [partner1Name, partner2Name]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #F8F7F4, #ECF0E8)",
        color: "#2E2E2E",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "3rem 1.5rem 4rem",
      }}
    >
      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem 2.75rem",
          boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
          border: "1px solid #E4E4E0",
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: "2.25rem", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              border: "1px solid #C9A66B",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7A6A45",
              marginBottom: "1.25rem",
            }}
          >
            Let&apos;s get the basics out of the way
          </div>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 300,
              fontSize: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Tell me about your day.
          </h1>
          <p
            style={{
              maxWidth: "540px",
              margin: "0 auto",
              fontSize: "0.98rem",
              color: "#555",
            }}
          >
            Before we dive into timelines and shot lists, share your essential
            wedding details so my team can build a calm, organized photography
            plan around your day.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "grid", gap: "2rem" }}
        >
          {/* Couple Info */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Couple information
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Partner 1 full name
                </label>
                <input
                  type="text"
                  placeholder="First & last name"
                  value={partner1Name}
                  onChange={(e) => setPartner1Name(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Partner 2 full name
                </label>
                <input
                  type="text"
                  placeholder="First & last name"
                  value={partner2Name}
                  onChange={(e) => setPartner2Name(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Best contact email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Best contact phone
                </label>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  style={inputStyle}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Emergency day-of contact name
                </label>
                <input
                  type="text"
                  placeholder="Name (maid of honor, best man, etc.)"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Emergency day-of contact phone
                </label>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* Planner & Venue Contacts */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Planner & venue contacts
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Wedding planner name
                  <span style={{ color: "#999" }}> (optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Planner name"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Planner phone
                </label>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Planner email
                </label>
                <input
                  type="email"
                  placeholder="planner@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Venue coordinator name
                  <span style={{ color: "#999" }}> (optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Venue contact"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Venue coordinator phone
                </label>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* Prep Locations */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Getting ready locations
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Partner 1 prep location
                </label>
                <textarea
                  placeholder="Hotel / home / venue room name and full address"
                  rows={3}
                  style={textareaStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Partner 2 prep location
                </label>
                <textarea
                  placeholder="Hotel / home / venue room name and full address"
                  rows={3}
                  style={textareaStyle}
                />
              </div>
            </div>
          </section>

          {/* Ceremony & Reception */}
          <section>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Ceremony & reception details
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem",
                marginBottom: "1.75rem",
              }}
            >
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Ceremony location name
                </label>
                <input
                  type="text"
                  placeholder="Venue name / church / location"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#555" }}>
                  Ceremony location address
                </label>
                <textarea
                  placeholder="Street, city, state, ZIP"
                  rows={2}
                  style={textareaStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  marginBottom: "0.5rem",
                }}
              >
                Is your reception in the same location as your ceremony?
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#777",
                }}
              >
                (For now, you can simply note different locations later in our
                planning emails if needed.)
              </p>
            </div>
          </section>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              style={{
                borderRadius: "999px",
                border: "1px solid #C9A66B",
                backgroundColor: "#FFFDF8",
                padding: "0.7rem 1.8rem",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Save for later (coming soon)
            </button>
            <a
              href="/timeline"
              style={{
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#A3B18A",
                color: "#1F2622",
                padding: "0.85rem 2.4rem",
                fontSize: "0.95rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Save & Continue
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.3rem",
  borderRadius: "999px",
  border: "1px solid #D4D4CF",
  padding: "0.6rem 0.9rem",
  fontSize: "0.9rem",
  outline: "none",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.3rem",
  borderRadius: "0.9rem",
  border: "1px solid #D4D4CF",
  padding: "0.6rem 0.9rem",
  fontSize: "0.9rem",
  resize: "vertical",
  outline: "none",
};
