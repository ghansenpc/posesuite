"use client";

import { useState, useEffect } from "react";

type TimelineItemState = {
  id: string;
  included: boolean;
};

// Order of items, logic for labels will use these IDs
const itemOrder: string[] = [
  "partner1-prep",
  "partner2-prep",
  "partner1-bridesmaids-first-look",
  "partner1-father-first-look",
  "couple-first-look",
  "couple-first-touch",
  "private-vows",
  "ceremony",
  "family-portraits",
  "couple-portraits",
  "wedding-party-portraits",
  "church-exit",
  "church-portrait-session",
  "extended-family-photos",
  "additional-location-portraits",
  "cocktail-hour",
  "grand-entrance",
  "welcome-speech",
  "welcome-blessing",
  "cake-cutting",
  "first-dance",
  "mother-son-dance",
  "father-daughter-dance",
  "table-race",
  "best-man-speech",
  "maid-of-honor-speech",
  "bouquet-toss",
  "garter-toss",
  "sparkler-exit",
];

function buildLabel(
  id: string,
  partner1Name: string,
  partner2Name: string
): string {
  switch (id) {
    case "partner1-prep":
      return `${partner1Name} getting ready photos`;
    case "partner2-prep":
      return `${partner2Name} getting ready photos`;
    case "partner1-bridesmaids-first-look":
      return `${partner1Name} first look with wedding party / bridesmaids`;
    case "partner1-father-first-look":
      return `${partner1Name} first look with father`;
    case "couple-first-look":
      return `${partner1Name} & ${partner2Name} first look`;
    case "couple-first-touch":
      return `${partner1Name} & ${partner2Name} first touch`;
    case "private-vows":
      return "Private vows";
    case "ceremony":
      return "Ceremony";
    case "family-portraits":
      return "Family portraits";
    case "couple-portraits":
      return `${partner1Name} & ${partner2Name} portraits`;
    case "wedding-party-portraits":
      return "Wedding party portraits";
    case "church-exit":
      return "Church exit";
    case "church-portrait-session":
      return "Church portrait session";
    case "extended-family-photos":
      return "Extended family photos";
    case "additional-location-portraits":
      return "Additional location portraits";
    case "cocktail-hour":
      return "Cocktail hour";
    case "grand-entrance":
      return "Grand entrance";
    case "welcome-speech":
      return "Welcome speech";
    case "welcome-blessing":
      return "Welcome blessing";
    case "cake-cutting":
      return "Cake cutting";
    case "first-dance":
      return "First dance";
    case "mother-son-dance":
      return "Mother–son dance";
    case "father-daughter-dance":
      return "Father–daughter dance";
    case "table-race":
      return "Table race / table photos";
    case "best-man-speech":
      return "Best man speech";
    case "maid-of-honor-speech":
      return "Maid of honor speech";
    case "bouquet-toss":
      return "Bouquet toss";
    case "garter-toss":
      return "Garter toss";
    case "sparkler-exit":
      return "Sparkler exit";
    default:
      return id;
  }
}

type CustomItem = {
  id: string;
  label: string;
  included: boolean;
};

export default function TimelinePage() {
  const [partner1Name, setPartner1Name] = useState("Partner 1");
  const [partner2Name, setPartner2Name] = useState("Partner 2");

  const [items, setItems] = useState<TimelineItemState[]>(() =>
    itemOrder.map((id) => ({ id, included: false }))
  );
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);

  // Load partner names from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("posesuiteBasics");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.partner1Name && typeof data.partner1Name === "string") {
          setPartner1Name(data.partner1Name);
        }
        if (data.partner2Name && typeof data.partner2Name === "string") {
          setPartner2Name(data.partner2Name);
        }
      }
    } catch {
      // ignore if parsing fails
    }
  }, []);

  const toggleIncluded = (id: string, source: "default" | "custom") => {
    if (source === "default") {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, included: !item.included } : item
        )
      );
    } else {
      setCustomItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, included: !item.included } : item
        )
      );
    }
  };

  const handleCustomLabelChange = (id: string, value: string) => {
    setCustomItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, label: value } : item
      )
    );
  };

  const handleAddCustom = () => {
    const newId = `custom-${Date.now()}`;
    setCustomItems((prev) => [
      ...prev,
      {
        id: newId,
        label: "",
        included: false,
      },
    ]);
  };

  const handleRemoveCustom = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #F8F7F4, #ECF0E8)",
        color: "#2E2E2E",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "3rem 1.25rem 4rem",
      }}
    >
      <section
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem 2.75rem",
          boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
          border: "1px solid #E4E4E0",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
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
              PoseSuite · Wedding day timeline
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              Help me build your wedding day timeline.
            </h1>
            <p
              style={{
                maxWidth: "540px",
                fontSize: "0.98rem",
                color: "#555",
                margin: 0,
              }}
            >
              These are common parts of the wedding day. Check everything that
              you would like to have photographed.
            </p>
          </div>
          <a
            href="/day-of"
            style={{
              fontSize: "0.85rem",
              textDecoration: "none",
              color: "#555",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid #D4D4CF",
              backgroundColor: "#FFFDF8",
              marginTop: "0.5rem",
            }}
          >
            Preview day-of view →
          </a>
        </div>

        {/* Core moments */}
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Core moments
          </h2>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {items.map((item) => {
              const label = buildLabel(
                item.id,
                partner1Name || "Partner 1",
                partner2Name || "Partner 2"
              );
              return (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.55rem 0.8rem",
                    borderRadius: "0.8rem",
                    border: "1px solid #E2E2DD",
                    backgroundColor: "#FCFCF9",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.included}
                    onChange={() => toggleIncluded(item.id, "default")}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Additional moments */}
        <section>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Additional events or special moments
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Use this space for anything unique to your day – special
            performances, cultural traditions, outfit changes, private vows, or
            anything else you&apos;d like me to be ready for.
          </p>

          <div style={{ display: "grid", gap: "0.7rem", marginBottom: "1rem" }}>
            {customItems.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: "0.9rem",
                  border: "1px solid #E2E2DD",
                  padding: "0.6rem 0.75rem",
                  backgroundColor: "#FCFCF9",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.included}
                  onChange={() => toggleIncluded(item.id, "custom")}
                  style={{ accentColor: "#A3B18A" }}
                />
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    handleCustomLabelChange(item.id, e.target.value)
                  }
                  placeholder="Describe this event (for example: tea ceremony, outfit change, private vows)"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCustom(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#999",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCustom}
            style={{
              borderRadius: "999px",
              border: "1px solid #C9A66B",
              backgroundColor: "#FFFDF8",
              padding: "0.7rem 1.6rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            + Add another event
          </button>
        </section>

        {/* Bottom controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "2rem",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            style={{
              borderRadius: "999px",
              border: "1px solid #D4D4CF",
              backgroundColor: "#FFFFFF",
              padding: "0.7rem 1.8rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Save for later (coming soon)
          </button>
          <button
            type="button"
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
            }}
          >
            This looks good (for now)
          </button>
        </div>
      </section>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#888",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        Later, these checked events will help shape the timeline and day-of
        plan inside PoseSuite.
      </p>
    </main>
  );
}
