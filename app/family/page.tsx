"use client";

import { useState, useEffect } from "react";

type FamilyItemState = {
  id: string;
  included: boolean;
};

const itemOrder: string[] = [
  // Partner 1 side first
  "p1-parents-together",
  "p1-mom",
  "p1-dad",
  "p1-parents-plus-siblings",
  "p1-siblings-only",
  "p1-grandparents",

  // Both families together
  "both-couple-with-p1-parents",
  "both-couple-with-p2-parents",
  "both-couple-with-both-parents",
  "both-couple-with-immediate-both-sides",

  // Partner 2 side last
  "p2-parents-together",
  "p2-mom",
  "p2-dad",
  "p2-parents-plus-siblings",
  "p2-siblings-only",
  "p2-grandparents",
];

function buildLabel(
  id: string,
  partner1Name: string,
  partner2Name: string
): { section: "p1" | "p2" | "both"; label: string } {
  const p1 = partner1Name || "Partner 1";
  const p2 = partner2Name || "Partner 2";

  switch (id) {
    // Partner 1 side
    case "p1-parents-together":
      return { section: "p1", label: `${p1} with parents` };
    case "p1-mom":
      return { section: "p1", label: `${p1} with mom` };
    case "p1-dad":
      return { section: "p1", label: `${p1} with dad` };
    case "p1-parents-plus-siblings":
      return { section: "p1", label: `${p1} with parents and siblings` };
    case "p1-siblings-only":
      return { section: "p1", label: `${p1} with siblings only` };
    case "p1-grandparents":
      return { section: "p1", label: `${p1} with grandparents` };

    // Combined
    case "both-couple-with-p1-parents":
      return {
        section: "both",
        label: `${p1} & ${p2} with ${p1}'s parents`,
      };
    case "both-couple-with-p2-parents":
      return {
        section: "both",
        label: `${p1} & ${p2} with ${p2}'s parents`,
      };
    case "both-couple-with-both-parents":
      return {
        section: "both",
        label: `${p1} & ${p2} with both sets of parents`,
      };
    case "both-couple-with-immediate-both-sides":
      return {
        section: "both",
        label: `${p1} & ${p2} with immediate family (both sides)`,
      };

    // Partner 2 side
    case "p2-parents-together":
      return { section: "p2", label: `${p2} with parents` };
    case "p2-mom":
      return { section: "p2", label: `${p2} with mom` };
    case "p2-dad":
      return { section: "p2", label: `${p2} with dad` };
    case "p2-parents-plus-siblings":
      return { section: "p2", label: `${p2} with parents and siblings` };
    case "p2-siblings-only":
      return { section: "p2", label: `${p2} with siblings only` };
    case "p2-grandparents":
      return { section: "p2", label: `${p2} with grandparents` };

    default:
      return { section: "p1", label: id };
  }
}

type DivorceState = {
  p1ParentsDivorced: boolean;
  p1ParentsHavePartners: boolean;
  p2ParentsDivorced: boolean;
  p2ParentsHavePartners: boolean;
};

export default function FamilyPage() {
  const [partner1Name, setPartner1Name] = useState("Partner 1");
  const [partner2Name, setPartner2Name] = useState("Partner 2");

  const [items, setItems] = useState<FamilyItemState[]>(() =>
    itemOrder.map((id) => ({ id, included: false }))
  );

  const [divorceState, setDivorceState] = useState<DivorceState>({
    p1ParentsDivorced: false,
    p1ParentsHavePartners: false,
    p2ParentsDivorced: false,
    p2ParentsHavePartners: false,
  });

  // Load partner names from Basics
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
      // ignore
    }
  }, []);

  const toggleIncluded = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, included: !item.included } : item
      )
    );
  };

  const updateDivorceState = (field: keyof DivorceState) => {
    setDivorceState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const partner1Items = items.filter(
    (item) => buildLabel(item.id, partner1Name, partner2Name).section === "p1"
  );
  const partner2Items = items.filter(
    (item) => buildLabel(item.id, partner1Name, partner2Name).section === "p2"
  );
  const bothItems = items.filter(
    (item) => buildLabel(item.id, partner1Name, partner2Name).section === "both"
  );

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
              PoseSuite · Family portraits
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              Help me build your family portrait list.
            </h1>
            <p
              style={{
                maxWidth: "580px",
                fontSize: "0.98rem",
                color: "#555",
                margin: 0,
              }}
            >
              During formal portrait time, we&apos;ll focus on your closest
              family so everything feels calm and efficient. We&apos;ll have the
              whole reception for extended family photos at dinner and on the
              dance floor.
            </p>
          </div>

          <a
            href="/timeline"
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
            Back to timeline →
          </a>
        </div>

        {/* Family structure / divorced parents */}
        <section
          style={{
            marginBottom: "2rem",
            borderRadius: "1rem",
            border: "1px solid #E2E2DD",
            padding: "1.1rem 1rem 1.2rem",
            backgroundColor: "#FCFCF9",
          }}
        >
          <h2
            style={{
              fontSize: "1.0rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
            }}
          >
            Family structure details
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.9rem",
            }}
          >
            This helps me plan groupings kindly and efficiently if there are
            divorced parents or important partners/step-parents to include.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "0.6rem",
              fontSize: "0.9rem",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={divorceState.p1ParentsDivorced}
                onChange={() =>
                  updateDivorceState("p1ParentsDivorced")
                }
                style={{ accentColor: "#A3B18A" }}
              />
              <span>
                {partner1Name || "Partner 1"}&apos;s parents are divorced
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={divorceState.p1ParentsHavePartners}
                onChange={() =>
                  updateDivorceState("p1ParentsHavePartners")
                }
                style={{ accentColor: "#A3B18A" }}
              />
              <span>
                {partner1Name || "Partner 1"}&apos;s parents have partners /
                step-parents to include
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={divorceState.p2ParentsDivorced}
                onChange={() =>
                  updateDivorceState("p2ParentsDivorced")
                }
                style={{ accentColor: "#A3B18A" }}
              />
              <span>
                {partner2Name || "Partner 2"}&apos;s parents are divorced
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={divorceState.p2ParentsHavePartners}
                onChange={() =>
                  updateDivorceState("p2ParentsHavePartners")
                }
                style={{ accentColor: "#A3B18A" }}
              />
              <span>
                {partner2Name || "Partner 2"}&apos;s parents have partners /
                step-parents to include
              </span>
            </label>
          </div>

          <p
            style={{
              fontSize: "0.8rem",
              color: "#888",
              marginTop: "0.7rem",
            }}
          >
            We&apos;ll use this information to plan kind, comfortable groupings
            on the day — especially when we build your final day-of checklist.
          </p>
        </section>

        {/* Partner 1 family */}
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            {partner1Name || "Partner 1"}&apos;s family (usually first)
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Check the groupings you&apos;d like during formal portrait time for
            this side of the family.
          </p>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {partner1Items.map((item) => {
              const { label } = buildLabel(
                item.id,
                partner1Name,
                partner2Name
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
                    onChange={() => toggleIncluded(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Both families together */}
        <section style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Both families together
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            These are the &quot;big picture&quot; photos with both families —
            often right after individual sides.
          </p>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {bothItems.map((item) => {
              const { label } = buildLabel(
                item.id,
                partner1Name,
                partner2Name
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
                    onChange={() => toggleIncluded(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Partner 2 family */}
        <section style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            {partner2Name || "Partner 2"}&apos;s family (usually after group photo)
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Check the groupings for this side of the family.
          </p>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {partner2Items.map((item) => {
              const { label } = buildLabel(
                item.id,
                partner1Name,
                partner2Name
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
                    onChange={() => toggleIncluded(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Gentle reminder about extended family */}
        <section>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#777",
              backgroundColor: "#F8F7F2",
              borderRadius: "0.8rem",
              border: "1px solid #E2E2DD",
              padding: "0.75rem 0.9rem",
            }}
          >
            We&apos;ll absolutely make time for extended family photos — often
            during dinner or on the dance floor when everyone is more relaxed.
            This checklist is just for the core, must-have groupings during the
            formal portrait block so things stay smooth and stress-free.
          </p>
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
        Later, these selections will feed into your day-of PoseSuite checklist
        so we can move through family photos in a calm, efficient order.
      </p>
    </main>
  );
}
