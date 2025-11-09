"use client";

import { useState, useEffect } from "react";

type Relationship = "together" | "separatedAmicable" | "separatedSeparate";

type GroupOption = {
  id: string;
  label: string;
};

type CustomGroup = {
  id: string;
  label: string;
  included: boolean;
};

function getPartnerGroups(
  status: Relationship,
  primaryName: string,
  otherName: string,
  sidePrefix: string
): GroupOption[] {
  const p = primaryName || "Partner";
  const o = otherName || "Partner";

  if (status === "together") {
    // Partner parents happily together – Group A
    return [
      { id: `${sidePrefix}-mom`, label: `${p} with mom` },
      { id: `${sidePrefix}-dad`, label: `${p} with dad` },
      { id: `${sidePrefix}-parents-together`, label: `${p} with mom and dad together` },
      { id: `${sidePrefix}-couple-with-parents`, label: `${p} & ${o} with ${p}'s parents` },
      {
        id: `${sidePrefix}-couple-with-parents-siblings`,
        label: `${p} & ${o} with ${p}'s parents and siblings`,
      },
      {
        id: `${sidePrefix}-couple-with-parents-siblings-grandparents`,
        label: `${p} & ${o} with ${p}'s parents, siblings, and grandparents`,
      },
      {
        id: `${sidePrefix}-couple-with-grandparents`,
        label: `${p} & ${o} with ${p}'s grandparents`,
      },
      { id: `${sidePrefix}-with-grandmother`, label: `${p} with grandmother` },
      { id: `${sidePrefix}-with-grandfather`, label: `${p} with grandfather` },
      { id: `${sidePrefix}-with-grandparents`, label: `${p} with grandparents` },
      { id: `${sidePrefix}-with-siblings`, label: `${p} with siblings` },
    ];
  }

  if (status === "separatedAmicable") {
    // Partner parents separated but comfortable together – Group B
    return [
      { id: `${sidePrefix}-mom`, label: `${p} with mom` },
      { id: `${sidePrefix}-dad`, label: `${p} with dad` },
      { id: `${sidePrefix}-parents-together`, label: `${p} with mom and dad together` },
      { id: `${sidePrefix}-couple-with-parents`, label: `${p} & ${o} with ${p}'s parents` },
      {
        id: `${sidePrefix}-couple-with-parents-siblings`,
        label: `${p} & ${o} with ${p}'s parents and siblings`,
      },
      {
        id: `${sidePrefix}-couple-mom-partner`,
        label: `${p} & ${o} with mom and her partner`,
      },
      {
        id: `${sidePrefix}-couple-mom-partner-siblings`,
        label: `${p} & ${o} with mom, her partner, and siblings`,
      },
      {
        id: `${sidePrefix}-couple-dad-partner`,
        label: `${p} & ${o} with dad and his partner`,
      },
      {
        id: `${sidePrefix}-couple-dad-partner-siblings`,
        label: `${p} & ${o} with dad, his partner, and siblings`,
      },
      {
        id: `${sidePrefix}-couple-both-parents-partners`,
        label: `${p} & ${o} with both parents and their partners`,
      },
      {
        id: `${sidePrefix}-couple-both-parents-partners-siblings`,
        label: `${p} & ${o} with both parents, their partners, and siblings`,
      },
      {
        id: `${sidePrefix}-couple-with-grandparents`,
        label: `${p} & ${o} with ${p}'s grandparents`,
      },
      { id: `${sidePrefix}-with-grandmother`, label: `${p} with grandmother` },
      { id: `${sidePrefix}-with-grandfather`, label: `${p} with grandfather` },
      { id: `${sidePrefix}-with-grandparents`, label: `${p} with grandparents` },
    ];
  }

  // status === "separatedSeparate"
  // Partner parents separated – prefer separate photos – Group C
  return [
    { id: `${sidePrefix}-mom`, label: `${p} with mom` },
    { id: `${sidePrefix}-dad`, label: `${p} with dad` },
    {
      id: `${sidePrefix}-couple-mom-partner`,
      label: `${p} & ${o} with mom and her partner (if applicable)`,
    },
    {
      id: `${sidePrefix}-couple-mom-partner-siblings`,
      label: `${p} & ${o} with mom, her partner, and siblings`,
    },
    {
      id: `${sidePrefix}-couple-dad-partner`,
      label: `${p} & ${o} with dad and his partner (if applicable)`,
    },
    {
      id: `${sidePrefix}-couple-dad-partner-siblings`,
      label: `${p} & ${o} with dad, his partner, and siblings`,
    },
    {
      id: `${sidePrefix}-couple-dad-grandparents`,
      label: `${p} & ${o} with dad and his parents`,
    },
    {
      id: `${sidePrefix}-couple-mom-grandparents`,
      label: `${p} & ${o} with mom and her parents`,
    },
    {
      id: `${sidePrefix}-couple-with-siblings`,
      label: `${p} & ${o} with siblings`,
    },
    { id: `${sidePrefix}-with-siblings`, label: `${p} with siblings` },
    {
      id: `${sidePrefix}-couple-with-grandparents`,
      label: `${p} & ${o} with ${p}'s grandparents`,
    },
    { id: `${sidePrefix}-with-grandmother`, label: `${p} with grandmother` },
    { id: `${sidePrefix}-with-grandfather`, label: `${p} with grandfather` },
    { id: `${sidePrefix}-with-grandparents`, label: `${p} with grandparents` },
  ];
}

function getBothFamiliesGroups(
  partner1Name: string,
  partner2Name: string
): GroupOption[] {
  const p1 = partner1Name || "Partner 1";
  const p2 = partner2Name || "Partner 2";

  return [
    {
      id: "both-parents",
      label: `${p1} & ${p2} with both sets of parents`,
    },
    {
      id: "both-parents-partners",
      label: `${p1} & ${p2} with both sets of parents and their partners (if applicable)`,
    },
    {
      id: "both-parents-siblings",
      label: `${p1} & ${p2} with both sets of parents and siblings (full immediate families)`,
    },
  ];
}

export default function FamilyPage() {
  const [partner1Name, setPartner1Name] = useState("Partner 1");
  const [partner2Name, setPartner2Name] = useState("Partner 2");

  const [p1Status, setP1Status] = useState<Relationship>("together");
  const [p2Status, setP2Status] = useState<Relationship>("together");

  const [p1Selected, setP1Selected] = useState<string[]>([]);
  const [p2Selected, setP2Selected] = useState<string[]>([]);
  const [bothSelected, setBothSelected] = useState<string[]>([]);

  const [customGroups, setCustomGroups] = useState<CustomGroup[]>([]);

  // Load basics + any previously saved family data
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const basicsRaw = window.localStorage.getItem("posesuiteBasics");
      if (basicsRaw) {
        const basics = JSON.parse(basicsRaw);
        if (basics.partner1Name && typeof basics.partner1Name === "string") {
          setPartner1Name(basics.partner1Name);
        }
        if (basics.partner2Name && typeof basics.partner2Name === "string") {
          setPartner2Name(basics.partner2Name);
        }
      }

      const famRaw = window.localStorage.getItem("posesuiteFamily");
      if (famRaw) {
        const fam = JSON.parse(famRaw);
        if (fam.p1Status) setP1Status(fam.p1Status);
        if (fam.p2Status) setP2Status(fam.p2Status);
        if (Array.isArray(fam.p1Selected)) setP1Selected(fam.p1Selected);
        if (Array.isArray(fam.p2Selected)) setP2Selected(fam.p2Selected);
        if (Array.isArray(fam.bothSelected)) setBothSelected(fam.bothSelected);
        if (Array.isArray(fam.customGroups)) setCustomGroups(fam.customGroups);
      }
    } catch {
      // ignore errors
    }
  }, []);

  // Save family selections so the day-of page can read them
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      p1Status,
      p2Status,
      p1Selected,
      p2Selected,
      bothSelected,
      customGroups,
    };
    window.localStorage.setItem("posesuiteFamily", JSON.stringify(payload));
  }, [p1Status, p2Status, p1Selected, p2Selected, bothSelected, customGroups]);

  const toggleP1 = (id: string) => {
    setP1Selected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleP2 = (id: string) => {
    setP2Selected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleBoth = (id: string) => {
    setBothSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCustom = (id: string) => {
    setCustomGroups((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, included: !g.included } : g
      )
    );
  };

  const handleCustomLabelChange = (id: string, value: string) => {
    setCustomGroups((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, label: value } : g
      )
    );
  };

  const handleAddCustomGroup = () => {
    const newId = `custom-${Date.now()}`;
    setCustomGroups((prev) => [
      ...prev,
      { id: newId, label: "", included: false },
    ]);
  };

  const p1Groups = getPartnerGroups(
    p1Status,
    partner1Name,
    partner2Name,
    "p1"
  );
  const p2Groups = getPartnerGroups(
    p2Status,
    partner2Name,
    partner1Name,
    "p2"
  );
  const bothGroups = getBothFamiliesGroups(partner1Name, partner2Name);

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
              During formal portrait time we&apos;ll focus on your closest
              family so everything stays organized and efficient. We&apos;ll
              have the whole reception for extended family photos at dinner and
              on the dance floor.
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

        {/* Partner 1 section */}
        <section style={{ marginBottom: "2.25rem" }}>
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
              marginBottom: "0.75rem",
            }}
          >
            Choose the option that best reflects {partner1Name || "Partner 1"}
            &apos;s parents, then check the groupings you&apos;d like during
            the formal portrait window.
          </p>

          {/* Relationship selector */}
          <div
            style={{
              borderRadius: "0.9rem",
              border: "1px solid #E2E2DD",
              padding: "0.75rem 0.85rem",
              backgroundColor: "#FCFCF9",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              display: "grid",
              gap: "0.4rem",
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
                type="radio"
                name="p1-status"
                value="together"
                checked={p1Status === "together"}
                onChange={() => setP1Status("together")}
              />
              <span>Parents happily together</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="radio"
                name="p1-status"
                value="separatedAmicable"
                checked={p1Status === "separatedAmicable"}
                onChange={() => setP1Status("separatedAmicable")}
              />
              <span>Parents separated but comfortable being photographed together</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="radio"
                name="p1-status"
                value="separatedSeparate"
                checked={p1Status === "separatedSeparate"}
                onChange={() => setP1Status("separatedSeparate")}
              />
              <span>Parents separated and prefer separate photos</span>
            </label>
          </div>

          {/* Partner 1 groups checklist */}
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {p1Groups.map((group) => (
              <label
                key={group.id}
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
                  checked={p1Selected.includes(group.id)}
                  onChange={() => toggleP1(group.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                <span>{group.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Partner 2 section */}
        <section style={{ marginBottom: "2.25rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            {partner2Name || "Partner 2"}&apos;s family
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.75rem",
            }}
          >
            Same idea here for {partner2Name || "Partner 2"}&apos;s side of the
            family.
          </p>

          {/* Relationship selector */}
          <div
            style={{
              borderRadius: "0.9rem",
              border: "1px solid #E2E2DD",
              padding: "0.75rem 0.85rem",
              backgroundColor: "#FCFCF9",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              display: "grid",
              gap: "0.4rem",
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
                type="radio"
                name="p2-status"
                value="together"
                checked={p2Status === "together"}
                onChange={() => setP2Status("together")}
              />
              <span>Parents happily together</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="radio"
                name="p2-status"
                value="separatedAmicable"
                checked={p2Status === "separatedAmicable"}
                onChange={() => setP2Status("separatedAmicable")}
              />
              <span>Parents separated but comfortable being photographed together</span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="radio"
                name="p2-status"
                value="separatedSeparate"
                checked={p2Status === "separatedSeparate"}
                onChange={() => setP2Status("separatedSeparate")}
              />
              <span>Parents separated and prefer separate photos</span>
            </label>
          </div>

          {/* Partner 2 groups checklist */}
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {p2Groups.map((group) => (
              <label
                key={group.id}
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
                  checked={p2Selected.includes(group.id)}
                  onChange={() => toggleP2(group.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                <span>{group.label}</span>
              </label>
            ))}
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
            These are the &quot;everyone together&quot; photos with both
            families — often right after we finish each side individually.
          </p>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {bothGroups.map((group) => (
              <label
                key={group.id}
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
                  checked={bothSelected.includes(group.id)}
                  onChange={() => toggleBoth(group.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                <span>{group.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Additional family groupings */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Additional family groupings
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Use this space for family photos that aren&apos;t listed above but
            still matter to you — godparents, cousins, chosen family, or anyone
            who has played a parent-figure role in your life.
          </p>

          <div style={{ display: "grid", gap: "0.7rem", marginBottom: "1rem" }}>
            {customGroups.map((group) => (
              <div
                key={group.id}
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
                  checked={group.included}
                  onChange={() => toggleCustom(group.id)}
                  style={{ accentColor: "#A3B18A" }}
                />
                <input
                  type="text"
                  value={group.label}
                  onChange={(e) =>
                    handleCustomLabelChange(group.id, e.target.value)
                  }
                  placeholder="Describe this group (for example: Bride with godparents, all of bride's cousins, groom with grandparents & aunt)"
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddCustomGroup}
            style={{
              borderRadius: "999px",
              border: "1px solid #C9A66B",
              backgroundColor: "#FFFDF8",
              padding: "0.7rem 1.6rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            + Add another family group
          </button>
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
            formal portrait block so things move smoothly and on time.
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
        Later, these selections can flow into your day-of PoseSuite checklist so
        we can move through family photos in a clear, efficient order.
      </p>
    </main>
  );
}
