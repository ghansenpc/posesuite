"use client";

import { useEffect, useState } from "react";

type Hall =
  | "Hall A"
  | "Hall B"
  | "Hall C"
  | "Hall D"
  | "Hall E (Main Lower Level)"
  | "ACC Level 3"
  | "North Hall Level 100"
  | "North Hall Level 200"
  | "Fresh Ideas Tent"
  | "Outdoor Plaza";

const HALLS: Hall[] = [
  "Hall A",
  "Hall B",
  "Hall C",
  "Hall D",
  "Hall E (Main Lower Level)",
  "ACC Level 3",
  "North Hall Level 100",
  "North Hall Level 200",
  "Fresh Ideas Tent",
  "Outdoor Plaza",
];

type Booth = {
  id: string;
  brand: string;
  booth: string;
  hall: Hall;
  notes: string;
  visited: boolean;
};

const STORAGE_KEY = "expoBoothsV1";

function boothSortValue(booth: string): number {
  const match = booth.match(/\d+/);
  return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

export default function ExpoPlanPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [collapsedHalls, setCollapsedHalls] = useState<Hall[]>([]);
  const [openNotes, setOpenNotes] = useState<string[]>([]);

  const [brandInput, setBrandInput] = useState("");
  const [boothInput, setBoothInput] = useState("");
  const [hallInput, setHallInput] = useState<Hall>("Hall A");
  const [notesInput, setNotesInput] = useState("");

  // load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Booth[];
        setBooths(parsed);
      } catch {
        // ignore bad data
      }
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(booths));
  }, [booths]);

  const addBooth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandInput.trim() || !boothInput.trim()) return;

    const newBooth: Booth = {
      id:
        Date.now().toString() +
        "-" +
        Math.random().toString(36).slice(2, 7),
      brand: brandInput.trim(),
      booth: boothInput.trim(),
      hall: hallInput,
      notes: notesInput.trim(),
      visited: false,
    };

    setBooths((prev) => [...prev, newBooth]);
    setBrandInput("");
    setBoothInput("");
    setNotesInput("");
  };

  const updateNotes = (id: string, notes: string) => {
    setBooths((prev) =>
      prev.map((b) => (b.id === id ? { ...b, notes } : b))
    );
  };

  const toggleHallCollapse = (hall: Hall) => {
    setCollapsedHalls((prev) =>
      prev.includes(hall)
        ? prev.filter((h) => h !== hall)
        : [...prev, hall]
    );
  };

  const toggleNotesOpen = (id: string) => {
    setOpenNotes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const sortedBoothsForHall = (hall: Hall) =>
    booths
      .filter((b) => b.hall === hall)
      .sort((a, b) => {
        const av = boothSortValue(a.booth);
        const bv = boothSortValue(b.booth);
        if (av !== bv) return av - bv;
        const as = a.booth.toLowerCase();
        const bs = b.booth.toLowerCase();
        if (as !== bs) return as.localeCompare(bs);
        return a.brand.toLowerCase().localeCompare(b.brand.toLowerCase());
      });

  return (
    <main
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#ffffff",
        color: "#222",
        minHeight: "100vh",
        padding: "1rem 0.75rem 4rem",
      }}
    >
      <header style={{ marginBottom: "1rem" }}>
        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: 600,
            marginBottom: "0.25rem",
          }}
        >
          Expo Booth Planner
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#555" }}>
          Page 1 of 2 · Add brands you want to visit. Data is saved on this
          device only.
        </p>
        <nav
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontWeight: 600 }}>Plan</span>
          <span style={{ color: "#aaa" }}>·</span>
          <a href="/expo-checklist" style={{ color: "#0066cc" }}>
            Checklist
          </a>
        </nav>
      </header>

      {/* Input form */}
      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "0.75rem",
          padding: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <form
          onSubmit={addBooth}
          style={{ display: "grid", gap: "0.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                marginBottom: "0.2rem",
              }}
            >
              Brand name
            </label>
            <input
              value={brandInput}
              onChange={(e) => setBrandInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "0.9rem",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
              }}
              placeholder="e.g. Heray Spice"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                marginBottom: "0.2rem",
              }}
            >
              Booth number
            </label>
            <input
              value={boothInput}
              onChange={(e) => setBoothInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "0.9rem",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
              }}
              placeholder="e.g. 1234"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                marginBottom: "0.2rem",
              }}
            >
              Hall / Room
            </label>
            <select
              value={hallInput}
              onChange={(e) => setHallInput(e.target.value as Hall)}
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "0.9rem",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
              }}
            >
              {HALLS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setNotesInput((prev) => (prev ? "" : prev))}
              style={{
                fontSize: "0.8rem",
                padding: 0,
                border: "none",
                background: "none",
                color: "#0066cc",
                marginBottom: "0.2rem",
              }}
            >
              {notesInput ? "Clear notes" : "Add optional notes"}
            </button>
            <textarea
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              rows={2}
              placeholder="Optional notes about this brand…"
              style={{
                width: "100%",
                padding: "0.4rem",
                fontSize: "0.85rem",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              fontSize: "0.95rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add booth
          </button>
        </form>
      </section>

      {/* Grouped by hall */}
      <section>
        {HALLS.map((hall) => {
          const hallBooths = sortedBoothsForHall(hall);
          if (hallBooths.length === 0) return null;

          const isCollapsed = collapsedHalls.includes(hall);

          return (
            <div
              key={hall}
              style={{
                borderTop: "1px solid #ddd",
                paddingTop: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    {hall}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                    }}
                  >
                    {hallBooths.length} brands
                  </div>
                </div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isCollapsed}
                    onChange={() => toggleHallCollapse(hall)}
                  />
                  Collapse
                </label>
              </div>

              {!isCollapsed && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "grid",
                    gap: "0.3rem",
                  }}
                >
                  {hallBooths.map((b) => {
                    const notesOpen = openNotes.includes(b.id);
                    return (
                      <div
                        key={b.id}
                        style={{
                          border: "1px solid #eee",
                          borderRadius: "0.4rem",
                          padding: "0.35rem 0.45rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              {b.brand}
                            </div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "#555",
                              }}
                            >
                              Booth {b.booth}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleNotesOpen(b.id)}
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.25rem 0.4rem",
                              borderRadius: "0.35rem",
                              border: "1px solid #ccc",
                              background: "#f8f8f8",
                              cursor: "pointer",
                            }}
                          >
                            {notesOpen ? "Hide notes" : "Notes"}
                          </button>
                        </div>
                        {notesOpen && (
                          <div style={{ marginTop: "0.35rem" }}>
                            <textarea
                              value={b.notes}
                              onChange={(e) =>
                                updateNotes(b.id, e.target.value)
                              }
                              rows={2}
                              placeholder="Notes…"
                              style={{
                                width: "100%",
                                padding: "0.35rem",
                                fontSize: "0.8rem",
                                borderRadius: "0.4rem",
                                border: "1px solid #ccc",
                                resize: "vertical",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
