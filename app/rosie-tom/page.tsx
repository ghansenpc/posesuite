"use client";

import React, { useEffect, useMemo, useState } from "react";

type Contact = {
  label: string;
  name: string;
  phone: string;
};

type Shot = {
  id: string;
  label: string;
  location: "Church" | "Reception" | "Other";
  category: string; // e.g., "Family", "Ceremony", "Details"
  subcategory?: string; // e.g., "Family (Church)"
};

type ShotGroup = {
  title: string; // e.g., "CHURCH"
  sections: Array<{
    title: string; // e.g., "Family (at Church)"
    shots: Shot[];
  }>;
};

const STORAGE_KEY = "poseSuite_shotlist_rosie_and_tom_v1";

function formatPhoneForTel(raw: string) {
  // keeps digits and leading +
  const tel = raw.replace(/[^\d+]/g, "");
  return tel || raw;
}

export default function RosieAndTomShotListPage() {
  /**
   * ✅ Replace these placeholders with your real info.
   * If you paste me the names/date/phones/shot list, I’ll drop them in for you.
   */
  const event = {
    title: "Rosie & Tom",
    date: "2026-03-14",
    locationName: "St. Example Church",
    addressLine: "123 Church St, Chicago, IL",
    notes:
      "Notes: Arrive 30 min early. Confirm family members present before formal groupings.",
  };

  const contacts: Contact[] = [
    { label: "Bride", name: "Rosie Lastname", phone: "(312) 555-0123" },
    { label: "Groom", name: "Tom Lastname", phone: "(312) 555-0456" },
    { label: "Planner", name: "Planner Name", phone: "(773) 555-0789" },
    // Add more as needed
  ];

  /**
   * Shot List Structure:
   * - Groups (Church / Reception / Other)
   * - Inside each group: sections
   * - Each section has shot items (checkbox)
   *
   * ✅ Church → Family subcategory is included below.
   * Replace labels with your real family shot list.
   */
  const groups: ShotGroup[] = [
    {
      title: "CHURCH",
      sections: [
        {
          title: "Family (at Church)",
          shots: [
            { id: "ch-fam-001", label: "Couple + Both Parents", location: "Church", category: "Family", subcategory: "Family (Church)" },
            { id: "ch-fam-002", label: "Couple + Bride’s Immediate Family", location: "Church", category: "Family", subcategory: "Family (Church)" },
            { id: "ch-fam-003", label: "Couple + Groom’s Immediate Family", location: "Church", category: "Family", subcategory: "Family (Church)" },
            { id: "ch-fam-004", label: "Couple + Siblings (Both Sides)", location: "Church", category: "Family", subcategory: "Family (Church)" },
            { id: "ch-fam-005", label: "Bride with Parents", location: "Church", category: "Family", subcategory: "Family (Church)" },
            { id: "ch-fam-006", label: "Groom with Parents", location: "Church", category: "Family", subcategory: "Family (Church)" },
            // Add your full family list here
          ],
        },
        {
          title: "Ceremony / Details",
          shots: [
            { id: "ch-det-001", label: "Exterior establishing shot of church", location: "Church", category: "Details" },
            { id: "ch-det-002", label: "Programs / signage / florals", location: "Church", category: "Details" },
            { id: "ch-cer-001", label: "Processional", location: "Church", category: "Ceremony" },
            { id: "ch-cer-002", label: "First kiss", location: "Church", category: "Ceremony" },
            // Add more
          ],
        },
      ],
    },
    {
      title: "RECEPTION",
      sections: [
        {
          title: "Details",
          shots: [
            { id: "rec-det-001", label: "Room wide shot", location: "Reception", category: "Details" },
            { id: "rec-det-002", label: "Table settings / centerpieces", location: "Reception", category: "Details" },
            { id: "rec-det-003", label: "Cake / dessert table", location: "Reception", category: "Details" },
          ],
        },
        {
          title: "Key Moments",
          shots: [
            { id: "rec-mom-001", label: "Grand entrance", location: "Reception", category: "Moments" },
            { id: "rec-mom-002", label: "First dance", location: "Reception", category: "Moments" },
            { id: "rec-mom-003", label: "Toasts", location: "Reception", category: "Moments" },
          ],
        },
      ],
    },
  ];

  // Flattened list for counts / filtering.
  const allShots: Shot[] = useMemo(() => {
    return groups.flatMap((g) => g.sections.flatMap((s) => s.shots));
  }, [groups]);

  // completion state: id -> boolean
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [showMode, setShowMode] = useState<"all" | "remaining">("remaining"); // toggle

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { doneMap?: Record<string, boolean>; showMode?: "all" | "remaining" };
      if (parsed.doneMap) setDoneMap(parsed.doneMap);
      if (parsed.showMode) setShowMode(parsed.showMode);
    } catch {
      // ignore
    }
  }, []);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ doneMap, showMode }));
    } catch {
      // ignore
    }
  }, [doneMap, showMode]);

  const totalCount = allShots.length;
  const doneCount = allShots.reduce((acc, s) => acc + (doneMap[s.id] ? 1 : 0), 0);
  const remainingCount = totalCount - doneCount;

  function toggleShot(id: string) {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    if (!confirm("Reset all checkboxes?")) return;
    setDoneMap({});
    setShowMode("remaining");
  }

  // Helper: determine if a shot should display in current mode
  function isVisible(shot: Shot) {
    if (showMode === "all") return true;
    // remaining only
    return !doneMap[shot.id];
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "2rem 1.25rem", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2rem", lineHeight: 1.15 }}>{event.title}</h1>
          <p style={{ margin: "0.25rem 0 0", opacity: 0.8 }}>
            <strong>Date:</strong> {event.date} &nbsp;•&nbsp; <strong>Location:</strong> {event.locationName}
          </p>
          <p style={{ margin: "0.25rem 0 0", opacity: 0.8 }}>{event.addressLine}</p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>
            <strong>{remainingCount}</strong> remaining / {totalCount}
          </span>

          <div style={{ display: "inline-flex", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 12, overflow: "hidden" }}>
            <button
              type="button"
              onClick={() => setShowMode("remaining")}
              style={{
                padding: "0.5rem 0.75rem",
                border: "none",
                cursor: "pointer",
                background: showMode === "remaining" ? "rgba(0,0,0,0.08)" : "transparent",
              }}
              aria-pressed={showMode === "remaining"}
            >
              Unchecked only
            </button>
            <button
              type="button"
              onClick={() => setShowMode("all")}
              style={{
                padding: "0.5rem 0.75rem",
                border: "none",
                cursor: "pointer",
                background: showMode === "all" ? "rgba(0,0,0,0.08)" : "transparent",
              }}
              aria-pressed={showMode === "all"}
            >
              All shots
            </button>
          </div>

          <button
            type="button"
            onClick={resetAll}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </header>

      {/* Notes */}
      {event.notes ? (
        <section style={{ marginTop: "1rem", padding: "1rem", borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.03)" }}>
          <strong>Notes:</strong>
          <div style={{ marginTop: "0.5rem", opacity: 0.9 }}>{event.notes}</div>
        </section>
      ) : null}

      {/* Contacts */}
      <section style={{ marginTop: "1.25rem" }}>
        <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem" }}>Contacts</h2>
        <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {contacts.map((c) => (
            <div key={`${c.label}-${c.phone}`} style={{ padding: "1rem", borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontSize: "0.9rem", opacity: 0.75 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.name}</div>
              <a href={`tel:${formatPhoneForTel(c.phone)}`} style={{ display: "inline-block", marginTop: 6, textDecoration: "underline" }}>
                {c.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Shot List */}
      <section style={{ marginTop: "1.75rem" }}>
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.25rem" }}>Shot List</h2>

        {groups.map((group) => {
          // Determine if this group has any visible shots in current mode
          const groupHasVisible = group.sections.some((sec) => sec.shots.some((shot) => isVisible(shot)));
          if (!groupHasVisible) return null;

          return (
            <div key={group.title} style={{ marginBottom: "1.25rem", borderRadius: 18, border: "1px solid rgba(0,0,0,0.12)", overflow: "hidden" }}>
              <div style={{ padding: "0.9rem 1rem", background: "rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ letterSpacing: 0.5 }}>{group.title}</strong>
                <span style={{ fontSize: "0.9rem", opacity: 0.75 }}>
                  {
                    group.sections
                      .flatMap((s) => s.shots)
                      .filter((shot) => !doneMap[shot.id]).length
                  }{" "}
                  remaining
                </span>
              </div>

              <div style={{ padding: "1rem" }}>
                {group.sections.map((sec) => {
                  const visibleShots = sec.shots.filter((shot) => isVisible(shot));
                  if (visibleShots.length === 0) return null;

                  return (
                    <div key={sec.title} style={{ marginBottom: "1rem" }}>
                      <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>{sec.title}</h3>

                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
                        {visibleShots.map((shot) => {
                          const checked = !!doneMap[shot.id];

                          return (
                            <li
                              key={shot.id}
                              style={{
                                display: "flex",
                                gap: "0.75rem",
                                alignItems: "flex-start",
                                padding: "0.75rem 0.75rem",
                                borderRadius: 14,
                                border: "1px solid rgba(0,0,0,0.10)",
                                background: checked ? "rgba(0,0,0,0.03)" : "white",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleShot(shot.id)}
                                style={{ marginTop: 4, width: 18, height: 18, cursor: "pointer" }}
                                aria-label={`Mark complete: ${shot.label}`}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 650, textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.7 : 1 }}>
                                  {shot.label}
                                </div>
                                <div style={{ fontSize: "0.85rem", opacity: 0.75, marginTop: 2 }}>
                                  {shot.location} • {shot.category}
                                  {shot.subcategory ? ` • ${shot.subcategory}` : ""}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <footer style={{ marginTop: "2rem", opacity: 0.7, fontSize: "0.9rem" }}>
        Tip: This page saves progress automatically in your browser. Use “Reset” if you need a fresh run.
      </footer>
    </main>
  );
}
