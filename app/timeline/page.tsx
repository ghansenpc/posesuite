"use client";

import { useState } from "react";

type TimelineItem = {
  id: string;
  label: string;
  included: boolean;
};

// In a future version, these will come from the Basics page:
const partner1NamePlaceholder = "Partner 1";
const partner2NamePlaceholder = "Partner 2";

const defaultItems: TimelineItem[] = [
  {
    id: "partner1-prep",
    label: `${partner1NamePlaceholder} getting ready photos`,
    included: false,
  },
  {
    id: "partner2-prep",
    label: `${partner2NamePlaceholder} getting ready photos`,
    included: false,
  },
  {
    id: "partner1-bridesmaids-first-look",
    label: `${partner1NamePlaceholder} first look with wedding party / bridesmaids`,
    included: false,
  },
  {
    id: "partner1-father-first-look",
    label: `${partner1NamePlaceholder} first look with father`,
    included: false,
  },
  {
    id: "couple-first-look",
    label: `${partner1NamePlaceholder} & ${partner2NamePlaceholder} first look`,
    included: false,
  },
  {
    id: "couple-first-touch",
    label: `${partner1NamePlaceholder} & ${partner2NamePlaceholder} first touch`,
    included: false,
  },
  {
    id: "private-vows",
    label: "Private vows",
    included: false,
  },
  {
    id: "ceremony",
    label: "Ceremony",
    included: false,
  },
  {
    id: "family-portraits",
    label: "Family portraits",
    included: false,
  },
  {
    id: "couple-portraits",
    label: `${partner1NamePlaceholder} & ${partner2NamePlaceholder} portraits`,
    included: false,
  },
  {
    id: "wedding-party-portraits",
    label: "Wedding party portraits",
    included: false,
  },
  {
    id: "church-exit",
    label: "Church exit",
    included: false,
  },
  {
    id: "church-portrait-session",
    label: "Church portrait session",
    included: false,
  },
  {
    id: "extended-family-photos",
    label: "Extended family photos",
    included: false,
  },
  {
    id: "additional-location-portraits",
    label: "Additional location portraits",
    included: false,
  },
  {
    id: "cocktail-hour",
    label: "Cocktail hour",
    included: false,
  },
  {
    id: "grand-entrance",
    label: "Grand entrance",
    included: false,
  },
  {
    id: "welcome-speech",
    label: "Welcome speech",
    included: false,
  },
  {
    id: "welcome-blessing",
    label: "Welcome blessing",
    included: false,
  },
  {
    id: "cake-cutting",
    label: "Cake cutting",
    included: false,
  },
  {
    id: "first-dance",
    label: "First dance",
    included: false,
  },
  {
    id: "mother-son-dance",
    label: "Mother–son dance",
    included: false,
  },
  {
    id: "father-daughter-dance",
    label: "Father–daughter dance",
    included: false,
  },
  {
    id: "table-race",
    label: "Table race / table photos",
    included: false,
  },
  {
    id: "best-man-speech",
    label: "Best man speech",
    included: false,
  },
  {
    id: "maid-of-honor-speech",
    label: "Maid of honor speech",
    included: false,
  },
  {
    id: "bouquet-toss",
    label: "Bouquet toss",
    included: false,
  },
  {
    id: "garter-toss",
    label: "Garter toss",
    included: false,
  },
  {
    id: "sparkler-exit",
    label: "Sparkler exit",
    included: false,
  },
];

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>(defaultItems);
  const [customItems, setCustomItems] = useState<TimelineItem[]>([]);

  const toggleIncluded = (id: string, source: "default" | "custom") => {
    const updater = (list: TimelineItem[]) =>
      list.map((item) =>
        item.id === id ? { ...item, included: !item.included } : item
      );

    if (source === "default") {
      setItems((prev) => updater(prev));
    } else {
      setCustomItems((prev) => updater(prev));
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
            {items.map((item) => (
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
                <span>{item.label}</span>
              </label>
            ))}
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
