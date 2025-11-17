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

type FilterMode = "all" | "need" | "visited";

export default function ExpoChecklistPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [collapsedHalls, setCollapsedHalls] = useState<Hall[]>([]);
  const [openNotes, setOpenNotes] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>("need");
  const [search, setSearch] = useState("");

  // load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Booth[];
        setBooths(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // save
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(booths));
  }, [booths]);

  const toggleVisited = (id: string) => {
    setBooths((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, visited: !b.visited } : b
      )
    );
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

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBoothsForHall = (hall: Hall) =>
    booths
      .filter((b) => b.hall === hall)
      .filter((b) => {
        if (filterMode === "need" && b.visited) return false;
        if (filterMode === "visited" && !b.visited) return false;
        return true;
      })
      .filter((b) => {
        if (!normalizedSearch) return true;
        const brand = b.brand.toLowerCase();
        const booth = b.booth.toLowerCase();
        return (
          brand.includes(normalizedSearch) ||
          booth.includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        const av = boothSortValue(a.booth);
        const bv = boothSortValue(b.booth);
        if (av !== bv) return av - bv;
        const as = a.booth.toLowerCase();
        const bs = b.booth.toLowerCase();
        if (as !== bs) return as.localeCompare(bs);
        return a.brand.toLowerCase().localeCompare(b.brand.toLowerCase());
      });

  const totalNeed = booths.filter((b) => !b.visited).length;
  const totalVisited = booths.filter((b) => b.visited).length;

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
          Expo Booth Checklist
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#555" }}>
          Page 2 of 2 · Tap to mark booths visited. Works offline once loaded.
        </p>
        <nav
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <a href="/expo-plan" style={{ color: "#0066cc" }}>
            Plan
          </a>
          <span style={{ color: "#aaa" }}>·</span>
          <span style={{ fontWeight: 600 }}>Checklist</span>
        </nav>
      </header>

      {/* Search + filter */}
      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "0.75rem",
          padding: "0.6rem",
          marginBottom: "1rem",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by brand or booth…"
          style={{
            width: "100%",
            padding: "0.4rem",
            fontSize: "0.9rem",
            borderRadius: "0.4rem",
            border: "1px solid #ccc",
            marginBottom: "0.5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            fontSize: "0.8rem",
          }}
        >
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            style={{
              flex: 1,
              padding: "0.35rem",
              borderRadius: "0.4rem",
              border:
                filterMode === "all"
                  ? "1px solid #111"
                  : "1px solid #ccc",
              backgroundColor:
                filterMode === "all" ? "#eee" : "transparent",
              cursor: "pointer",
            }}
          >
            All ({booths.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("need")}
            style={{
              flex: 1,
              padding: "0.35rem",
              borderRadius: "0.4rem",
              border:
                filterMode === "need"
                  ? "1px solid #111"
                  : "1px solid #ccc",
              backgroundColor:
                filterMode === "need" ? "#eee" : "transparent",
              cursor: "pointer",
            }}
          >
            Still need ({totalNeed})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("visited")}
            style={{
              flex: 1,
              padding: "0.35rem",
              borderRadius: "0.4rem",
              border:
                filterMode === "visited"
                  ? "1px solid #111"
                  : "1px solid #ccc",
              backgroundColor:
                filterMode === "visited" ? "#eee" : "transparent",
              cursor: "pointer",
            }}
          >
            Visited ({totalVisited})
          </button>
        </div>
      </section>

      {/* Halls + booths */}
      <section>
        {HALLS.map((hall) => {
          const list = filteredBoothsForHall(hall);
          if (list.length === 0) return null;

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
                    {list.length} matching
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
                  {list.map((b) => {
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
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.5rem",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.45rem",
                              flex: 1,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={b.visited}
                              onChange={() => toggleVisited(b.id)}
                              style={{ width: 18, height: 18 }}
                            />
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
                          </label>
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
                              whiteSpace: "nowrap",
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
