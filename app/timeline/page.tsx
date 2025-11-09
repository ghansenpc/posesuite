"use client";

import { useState } from "react";

type TimelineItem = {
  id: string;
  label: string;
  time: string;
  notes: string;
  included: boolean;
};

const defaultItems: TimelineItem[] = [
  {
    id: "hair-makeup",
    label: "Hair & makeup",
    time: "",
    notes: "When you expect to be mostly ready for photos.",
    included: true,
  },
  {
    id: "photographer-start",
    label: "Photographer arrival",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "videographer-start",
    label: "Videographer arrival",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "bride-prep",
    label: "Bride / Partner 1 getting ready photos",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "groom-prep",
    label: "Groom / Partner 2 getting ready photos",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "bridesmaids-first-look",
    label: "Bridesmaids / wedding party first look",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "parent-first-look",
    label: "Parent first look",
    time: "",
    notes: "For example: bride & dad first look.",
    included: false,
  },
  {
    id: "couple-first-look",
    label: "Couple first look",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "ceremony",
    label: "Ceremony",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "cocktail-hour",
    label: "Cocktail hour",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "family-portraits",
    label: "Family portraits",
    time: "",
    notes: "Usually right after the ceremony or during cocktail hour.",
    included: true,
  },
  {
    id: "wedding-party-portraits",
    label: "Wedding party portraits",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "couple-portraits",
    label: "Couple portraits",
    time: "",
    notes: "Often during golden hour or a quiet moment.",
    included: true,
  },
  {
    id: "reception-entrance",
    label: "Reception entrance & intros",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "first-dance",
    label: "First dance",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "parent-dances",
    label: "Parent dances",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "toasts",
    label: "Toasts / speeches",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "cake-cutting",
    label: "Cake cutting / dessert moment",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "dance-floor",
    label: "Open dance floor coverage",
    time: "",
    notes: "",
    included: true,
  },
  {
    id: "private-last-dance",
    label: "Private last dance",
    time: "",
    notes: "",
    included: false,
  },
  {
    id: "exit",
    label: "Exit / send-off photos",
    time: "",
    notes: "",
    included: false,
  },
];

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>(defaultItems);
  const [customItems, setCustomItems] = useState<TimelineItem[]>([]);

  const handleChange = (
    id: string,
    source: "default" | "custom",
    field: "time" | "notes" | "label" | "included",
    value: string | boolean
  ) => {
    const updater = (list: TimelineItem[]) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );

    if (source === "default") {
      setItems((prev) => updater(prev));
    } else {
      setCustomItems((prev) => updater(prev));
    }
  };

  const handleAddCustom = () => {
    const newId = `custom-${Date.now()}`;
    setCustomItems((prev) => [
      ...prev,
      {
        id: newId,
        label: "Additional moment",
        time: "",
        notes: "",
        included: true,
      },
    ]);
  };

  const handleRemoveCustom = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const includedDefaults = items.filter((i) => i.included);
  const notIncludedDefaults = items.filter((i) => !i.included);

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
              Build your wedding day timeline.
            </h1>
            <p
              style={{
                maxWidth: "540px",
                fontSize: "0.98rem",
                color: "#555",
                margin: 0,
              }}
            >
              We&apos;ll start with the most common moments we see at weddings.
              Keep what fits your day, add times if you know them, and use the
              notes to share anything you want me to be aware of.
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
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Check the moments that are part of your day, and add an approximate
            time if you have one. It&apos;s okay if you don&apos;t know
            everything yet.
          </p>

          <div style={{ display: "grid", gap: "0.9rem" }}>
            {includedDefaults.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: "1rem",
                  border: "1px solid #E2E2DD",
                  padding: "0.75rem 0.9rem 0.9rem",
                  backgroundColor: "#FCFCF9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.included}
                      onChange={(e) =>
                        handleChange(
                          item.id,
                          "default",
                          "included",
                          e.target.checked
                        )
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span style={{ color: "#777" }}>Approx. time</span>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) =>
                        handleChange(
                          item.id,
                          "default",
                          "time",
                          e.target.value
                        )
                      }
                      style={{
                        borderRadius: "999px",
                        border: "1px solid #D4D4CF",
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>
                <textarea
                  placeholder="Notes about this moment (who's involved, location, anything special you want me to know)."
                  value={item.notes}
                  onChange={(e) =>
                    handleChange(
                      item.id,
                      "default",
                      "notes",
                      e.target.value
                    )
                  }
                  rows={item.notes ? 2 : 1}
                  style={{
                    width: "100%",
                    marginTop: "0.45rem",
                    borderRadius: "0.8rem",
                    border: "1px solid #E2E2DD",
                    padding: "0.45rem 0.65rem",
                    fontSize: "0.88rem",
                    resize: "vertical",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </div>
            ))}
          </div>

          {notIncludedDefaults.length > 0 && (
            <details
              style={{
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              <summary style={{ cursor: "pointer" }}>
                Moments you&apos;ve turned off ({notIncludedDefaults.length})
              </summary>
              <div
                style={{
                  marginTop: "0.6rem",
                  display: "grid",
                  gap: "0.5rem",
                }}
              >
                {notIncludedDefaults.map((item) => (
                  <label
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.included}
                      onChange={(e) =>
                        handleChange(
                          item.id,
                          "default",
                          "included",
                          e.target.checked
                        )
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </details>
          )}
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
            Additional moments
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
            anything else we should plan for.
          </p>

          <div style={{ display: "grid", gap: "0.9rem", marginBottom: "1rem" }}>
            {customItems.map((item) => (
              <div
                key={item.id}
                style={{
                  borderRadius: "1rem",
                  border: "1px solid #E2E2DD",
                  padding: "0.75rem 0.9rem 0.9rem",
                  backgroundColor: "#FCFCF9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "0.4rem",
                  }}
                >
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "custom",
                        "label",
                        e.target.value
                      )
                    }
                    placeholder="Describe this moment"
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      outline: "none",
                      minWidth: "220px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span style={{ color: "#777" }}>Approx. time</span>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) =>
                        handleChange(
                          item.id,
                          "custom",
                          "time",
                          e.target.value
                        )
                      }
                      style={{
                        borderRadius: "999px",
                        border: "1px solid #D4D4CF",
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>
                <textarea
                  placeholder="Notes about this moment."
                  value={item.notes}
                  onChange={(e) =>
                    handleChange(
                      item.id,
                      "custom",
                      "notes",
                      e.target.value
                    )
                  }
                  rows={item.notes ? 2 : 1}
                  style={{
                    width: "100%",
                    borderRadius: "0.8rem",
                    border: "1px solid #E2E2DD",
                    padding: "0.45rem 0.65rem",
                    fontSize: "0.88rem",
                    resize: "vertical",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                    marginBottom: "0.4rem",
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
            + Add another moment
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
        Later, each moment here will connect to its own shot list inside your
        PoseSuite day-of plan.
      </p>
    </main>
  );
}
