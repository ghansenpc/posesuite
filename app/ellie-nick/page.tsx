"use client";

import { useState, useEffect } from "react";

type Shot = { id: string; label: string };
type EventBlock = {
  id: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  shots: Shot[];
};

const events: EventBlock[] = [
  {
    id: "getting-ready",
    time: "11:30 AM – 1:00 PM",
    title: "Getting Ready (Ellie)",
    location: "The Westin Chicago River North, 320 N Dearborn St, Chicago IL",
    notes:
      "Suite prep photos: flat-lay details, Ellie individual getting ready, bridesmaids group, first look with bridesmaids and father of the bride.",
    shots: [
      { id: "flatlay", label: "Flat-lay details" },
      { id: "bride-ready", label: "Ellie getting ready" },
      { id: "bridesmaids", label: "Bridesmaids group" },
      { id: "firstlook-dad", label: "First look with father" },
      { id: "firstlook-maids", label: "First look with bridesmaids" },
    ],
  },
  {
    id: "first-look",
    time: "1:00 PM – 1:30 PM",
    title: "First Look",
    location:
      "The Westin Chicago River North – Riverwalk (North Side of River)",
    notes:
      "Nick arrives just before 1 PM. Ellie walks from hotel room to meet on riverwalk. Then couple portraits immediately after.",
    shots: [
      { id: "arrival", label: "Nick arriving" },
      { id: "walk-up", label: "Ellie walking up" },
      { id: "reaction", label: "First look reaction" },
      { id: "couple-portraits", label: "Couple portraits on riverwalk" },
    ],
  },
  {
    id: "portraits-westin",
    time: "1:30 PM – 2:30 PM",
    title: "Formal Portraits – Westin",
    location:
      "The Westin Chicago River North and Riverwalk (North Side of River)",
    notes:
      "Bridesmaids, groomsmen, couple, immediate family at Westin + Riverwalk.",
    shots: [
      { id: "bridesmaids-group", label: "Bridesmaids group" },
      { id: "groomsmen-group", label: "Groomsmen group" },
      { id: "couple", label: "Couple portraits" },
      { id: "brides-family", label: "Bride’s immediate family" },
      { id: "grooms-family", label: "Groom’s immediate family" },
    ],
  },
  {
    id: "portraits-opera",
    time: "2:30 PM – 3:00 PM",
    title: "Formal Portraits – Civic Opera House",
    location: "Civic Opera House, 20 N Wacker Dr STE 400, Chicago IL",
    notes:
      "Full wedding party and fun photos under the pillars + trolley candids + posed party photo + couple portraits if time allows.",
    shots: [
      { id: "party-pillars", label: "Full party under pillars" },
      { id: "trolley", label: "Trolley candids (getting on/off)" },
      { id: "posed-party", label: "Posed full-party photo" },
      { id: "couple-extra", label: "Extra couple portraits" },
    ],
  },
  {
    id: "transport",
    time: "3:00 PM – 3:30 PM",
    title: "Transportation to Rockwell on the River",
    location: "Trolley to 3057 N Rockwell St, Chicago IL",
    notes:
      "Photos of boarding the trolley, guests seated before departure. Photographers do not ride.",
    shots: [
      { id: "boarding", label: "Boarding trolley" },
      { id: "seated", label: "Guests seated inside trolley" },
      { id: "departure", label: "Trolley departure shot" },
    ],
  },
  {
    id: "venue-pre",
    time: "3:30 PM – 4:30 PM",
    title: "Venue Portraits (Pre-Ceremony)",
    location: "Rockwell on the River, 3057 N Rockwell St, Chicago IL",
    notes:
      "Arrival at venue, bride and groom exiting trolley, walking to venue, groomsmen at distillery (barrel room), individual groomsmen/bridesmaid portraits, couple portraits, wedding party walking shots if time.",
    shots: [
      { id: "arrival", label: "Arrival / trolley exit" },
      { id: "walkway", label: "Walking to venue" },
      { id: "groomsmen-distillery", label: "Groomsmen group (barrel room)" },
      { id: "groom-solo", label: "Groom individuals" },
      { id: "bridesmaids-solo", label: "Bridesmaids individuals" },
      { id: "couple-venue", label: "Couple portraits at venue" },
      { id: "party-walk", label: "Full party entering venue" },
    ],
  },
  {
    id: "ceremony",
    time: "4:30 PM – 5:30 PM",
    title: "Ceremony",
    location: "Rockwell on the River, 3057 N Rockwell St, Chicago IL",
    notes:
      "Pre-ceremony room setup, guest arrivals, processional, vows, kiss, recessional, immediate-family portraits post-ceremony.",
    shots: [
      { id: "setup", label: "Ceremony setup (empty room)" },
      { id: "arrivals", label: "Guest arrivals" },
      { id: "processional", label: "Processional" },
      { id: "vows", label: "Vows + reactions" },
      { id: "kiss", label: "First kiss" },
      { id: "recessional", label: "Recessional exit" },
      { id: "bride-groom", label: "Bride & Groom portraits post-ceremony" },
      { id: "ahlberg", label: "Ahlberg family (groom maternal side)" },
      { id: "grandpa", label: "Groom’s grandpa portrait" },
      { id: "schweska", label: "Schweska family (groom paternal side)" },
    ],
  },
  {
    id: "reception",
    time: "5:30 PM – 11:00 PM",
    title: "Cocktail Hour + Reception",
    location: "Rockwell on the River, 3057 N Rockwell St, Chicago IL",
    notes:
      "Cocktail hour (5:30–6:30), party entrance (6:30), cake cutting, thank-you speech, father speech + prayer, buffet (7 PM), first dances (8 PM), dancefloor candids and band.",
    shots: [
      { id: "cocktail", label: "Cocktail hour candids" },
      { id: "entrance", label: "Wedding party entrance" },
      { id: "cake", label: "Cake cutting" },
      { id: "thankyou", label: "Bride & Groom thank-you speech" },
      { id: "fob-speech", label: "Father of Bride speech + prayer" },
      { id: "buffet", label: "Buffet + dessert stand" },
      { id: "first-dances", label: "Parent dances" },
      { id: "dancefloor", label: "Open dancefloor candids" },
      { id: "band", label: "Live band photos" },
    ],
  },
];

export default function EllieAndMark() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<Record<string, "need" | "done">>({});

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("ellieMarkProgress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompleted(parsed.completed || []);
      setCollapsed(parsed.collapsed || []);
      setViewMode(parsed.viewMode || {});
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      "ellieMarkProgress",
      JSON.stringify({ completed, collapsed, viewMode })
    );
  }, [completed, collapsed, viewMode]);

  const toggleShot = (eventId: string, shotId: string) => {
    const key = `${eventId}-${shotId}`;
    setCompleted((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const toggleCollapse = (id: string) =>
    setCollapsed((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const toggleView = (id: string, mode: "need" | "done") =>
    setViewMode((prev) => ({ ...prev, [id]: mode }));

  return (
    <main
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#fff",
        color: "#222",
        minHeight: "100vh",
        padding: "1rem 0.75rem 5rem",
        lineHeight: 1.4,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        Ellie Davis & Nicholas Schweska · November 15 2025
      </h1>

      {events.map((ev) => {
        const isCollapsed = collapsed.includes(ev.id);
        const mode = viewMode[ev.id] || "need";
        const shots =
          mode === "need"
            ? ev.shots.filter(
                (s) => !completed.includes(`${ev.id}-${s.id}`)
              )
            : ev.shots.filter((s) => completed.includes(`${ev.id}-${s.id}`));

        return (
          <div
            key={ev.id}
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {ev.time} – {ev.title}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {ev.location}
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
                  onChange={() => toggleCollapse(ev.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                Collapse
              </label>
            </div>

            {!isCollapsed && (
              <div style={{ marginTop: "0.5rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#555" }}>{ev.notes}</p>

                {/* Toggle */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    margin: "0.6rem 0",
                    fontSize: "0.85rem",
                  }}
                >
                  <button
                    onClick={() => toggleView(ev.id, "need")}
                    style={{
                      flex: 1,
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border:
                        mode === "need"
                          ? "1px solid #A3B18A"
                          : "1px solid #ccc",
                      backgroundColor:
                        mode === "need" ? "#F3F6F0" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Still Need
                  </button>
                  <button
                    onClick={() => toggleView(ev.id, "done")}
                    style={{
                      flex: 1,
                      padding: "0.4rem",
                      borderRadius: "6px",
                      border:
                        mode === "done"
                          ? "1px solid #A3B18A"
                          : "1px solid #ccc",
                      backgroundColor:
                        mode === "done" ? "#F3F6F0" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Completed
                  </button>
                </div>

                {/* Shot List */}
                <div style={{ display: "grid", gap: "0.3rem" }}>
                  {shots.length === 0 ? (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontStyle: "italic",
                        color: "#777",
                      }}
                    >
                      {mode === "need"
                        ? "All shots completed for this section."
                        : "No completed shots yet."}
                    </p>
                  ) : (
                    shots.map((s) => (
                      <label
                        key={s.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.35rem 0.5rem",
                          border: "1px solid #eee",
                          borderRadius: "5px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completed.includes(`${ev.id}-${s.id}`)}
                          onChange={() => toggleShot(ev.id, s.id)}
                          style={{ accentColor: "#A3B18A" }}
                        />
                        <span style={{ fontSize: "0.9rem" }}>{s.label}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
