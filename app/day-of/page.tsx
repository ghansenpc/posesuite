"use client";

import { useEffect, useState } from "react";

/* ---------- Types ---------- */

type TimelineStoredItem = {
  id: string;
  included: boolean;
};

type TimelineCustomItem = {
  id: string;
  label: string;
  included: boolean;
};

type Relationship = "together" | "separatedAmicable" | "separatedSeparate";

type FamilyData = {
  p1Status: Relationship;
  p2Status: Relationship;
  p1Selected: string[];
  p2Selected: string[];
  bothSelected: string[];
  customGroups: { id: string; label: string; included: boolean }[];
};

type InspirationSlot = {
  id: string;
  imageDataUrl: string | null;
  note: string;
};

type MustHavesData = {
  selectedShotIds: string[];
  inspirationSlots: InspirationSlot[];
};

type ShotTemplate = {
  id: string;
  buildLabel: (p1: string, p2: string) => string;
};

type DayOfProgress = {
  timelineDoneIds: string[];
  familyDoneIds: string[];
  mustHaveDoneIds: string[];
  inspirationDoneIds: string[];
};

/* ---------- Timeline helpers ---------- */

const timelineOrder: string[] = [
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

function buildTimelineLabel(
  id: string,
  partner1Name: string,
  partner2Name: string
): string {
  const p1 = partner1Name || "Partner 1";
  const p2 = partner2Name || "Partner 2";

  switch (id) {
    case "partner1-prep":
      return `${p1} getting ready`;
    case "partner2-prep":
      return `${p2} getting ready`;
    case "partner1-bridesmaids-first-look":
      return `${p1} first look with wedding party / bridesmaids`;
    case "partner1-father-first-look":
      return `${p1} first look with father`;
    case "couple-first-look":
      return `${p1} & ${p2} first look`;
    case "couple-first-touch":
      return `${p1} & ${p2} first touch`;
    case "private-vows":
      return "Private vows";
    case "ceremony":
      return "Ceremony";
    case "family-portraits":
      return "Family portraits block";
    case "couple-portraits":
      return `${p1} & ${p2} portraits`;
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
      return "Table photos / table race";
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

/* ---------- Family helpers (same logic as the Family page) ---------- */

function getPartnerGroups(
  status: Relationship,
  primaryName: string,
  otherName: string,
  sidePrefix: string
) {
  const p = primaryName || "Partner";
  const o = otherName || "Partner";

  if (status === "together") {
    // Group A
    return [
      { id: `${sidePrefix}-mom`, label: `${p} with mom` },
      { id: `${sidePrefix}-dad`, label: `${p} with dad` },
      { id: `${sidePrefix}-parents-together`, label: `${p} with mom and dad together` },
      {
        id: `${sidePrefix}-couple-with-parents`,
        label: `${p} & ${o} with ${p}'s parents`,
      },
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
    // Group B
    return [
      { id: `${sidePrefix}-mom`, label: `${p} with mom` },
      { id: `${sidePrefix}-dad`, label: `${p} with dad` },
      { id: `${sidePrefix}-parents-together`, label: `${p} with mom and dad together` },
      {
        id: `${sidePrefix}-couple-with-parents`,
        label: `${p} & ${o} with ${p}'s parents`,
      },
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

  // Group C
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

function getBothFamiliesGroups(partner1Name: string, partner2Name: string) {
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

/* ---------- Must-have shot templates (same as must-haves page) ---------- */

const prep1Shots: ShotTemplate[] = [
  {
    id: "prep1-room-details",
    buildLabel: (p1) => `${p1}'s getting ready room & atmosphere`,
  },
  {
    id: "prep1-outfit-details",
    buildLabel: (p1) => `${p1}'s dress / outfit, shoes, jewelry, and details`,
  },
  {
    id: "prep1-hair-makeup",
    buildLabel: (p1) => `Hair and makeup finishing touches for ${p1}`,
  },
  {
    id: "prep1-getting-dressed",
    buildLabel: (p1) =>
      `${p1} getting into outfit with a helper (parent or friend)`,
  },
  {
    id: "prep1-with-party",
    buildLabel: (p1) =>
      `${p1} with wedding party in the getting-ready room`,
  },
  {
    id: "prep1-with-parents",
    buildLabel: (p1) => `${p1} with parents in getting-ready space`,
  },
];

const prep2Shots: ShotTemplate[] = [
  {
    id: "prep2-room-details",
    buildLabel: (p1, p2) => `${p2}'s getting ready room & atmosphere`,
  },
  {
    id: "prep2-outfit-details",
    buildLabel: (p1, p2) =>
      `${p2}'s suit / outfit, shoes, watch, boutonniere, and details`,
  },
  {
    id: "prep2-getting-dressed",
    buildLabel: (p1, p2) =>
      `${p2} getting dressed with a parent or friend helping`,
  },
  {
    id: "prep2-with-party",
    buildLabel: (p1, p2) => `${p2} with wedding party before the ceremony`,
  },
];

const ceremonyShots: ShotTemplate[] = [
  {
    id: "ceremony-room",
    buildLabel: () => "Ceremony space before guests arrive",
  },
  {
    id: "ceremony-processional",
    buildLabel: () => "Processional and walking down the aisle",
  },
  {
    id: "ceremony-partner1-down-aisle",
    buildLabel: (p1) => `${p1} walking down the aisle`,
  },
  {
    id: "ceremony-partner2-reaction",
    buildLabel: (p1, p2) => `${p2}'s reaction during the walk down the aisle`,
  },
  {
    id: "ceremony-vows",
    buildLabel: () => "Exchange of vows",
  },
  {
    id: "ceremony-rings",
    buildLabel: () => "Exchange of rings",
  },
  {
    id: "ceremony-kiss",
    buildLabel: () => "First kiss",
  },
  {
    id: "ceremony-recessional",
    buildLabel: () => "Recessional down the aisle",
  },
];

const portraitsShots: ShotTemplate[] = [
  {
    id: "portraits-couple",
    buildLabel: (p1, p2) => `${p1} & ${p2} portraits together`,
  },
  {
    id: "portraits-individual",
    buildLabel: (p1, p2) => `Individual portraits of ${p1} and ${p2}`,
  },
  {
    id: "portraits-family-core",
    buildLabel: () =>
      "Core family groupings from your family portrait list",
  },
  {
    id: "portraits-wedding-party",
    buildLabel: () => "Wedding party group portraits",
  },
  {
    id: "portraits-extra-locations",
    buildLabel: () => "Portraits at any additional planned locations",
  },
];

const receptionShots: ShotTemplate[] = [
  {
    id: "reception-room-details",
    buildLabel: () =>
      "Reception room and decor before guests enter (tables, florals, cake, stationery)",
  },
  {
    id: "reception-cocktail-hour",
    buildLabel: () => "Candid moments during cocktail hour",
  },
  {
    id: "reception-grand-entrance",
    buildLabel: () => "Grand entrance into reception",
  },
  {
    id: "reception-first-dances",
    buildLabel: () => "First dance and parent dances",
  },
  {
    id: "reception-toasts",
    buildLabel: () => "Toasts and reactions",
  },
  {
    id: "reception-cake-cutting",
    buildLabel: () => "Cake cutting",
  },
  {
    id: "reception-dance-floor",
    buildLabel: () => "Open dance floor moments",
  },
  {
    id: "reception-table-candids",
    buildLabel: () => "Candids of guests at tables",
  },
  {
    id: "reception-exit",
    buildLabel: () =>
      "Planned exit (sparklers, bubbles, etc., if happening)",
  },
];

const allShotTemplates: ShotTemplate[] = [
  ...prep1Shots,
  ...prep2Shots,
  ...ceremonyShots,
  ...portraitsShots,
  ...receptionShots,
];

/* ---------- Component ---------- */

export default function DayOfPage() {
  const [partner1Name, setPartner1Name] = useState("Partner 1");
  const [partner2Name, setPartner2Name] = useState("Partner 2");

  const [timelineItems, setTimelineItems] = useState<
    { id: string; label: string; isCustom: boolean }[]
  >([]);
  const [familyItems, setFamilyItems] = useState<
    { id: string; label: string; section: "p1" | "p2" | "both" | "custom" }[]
  >([]);
  const [mustHaveShots, setMustHaveShots] = useState<{ id: string; label: string }[]>(
    []
  );
  const [inspirationSlots, setInspirationSlots] = useState<InspirationSlot[]>([]);

  const [progress, setProgress] = useState<DayOfProgress>({
    timelineDoneIds: [],
    familyDoneIds: [],
    mustHaveDoneIds: [],
    inspirationDoneIds: [],
  });

  const [showCompleted, setShowCompleted] = useState(false);

  // Load everything from localStorage
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

      // Timeline
      const timelineRaw = window.localStorage.getItem("posesuiteTimeline");
      if (timelineRaw) {
        const t = JSON.parse(timelineRaw);
        const items: TimelineStoredItem[] = Array.isArray(t.items)
          ? t.items
          : [];
        const customItems: TimelineCustomItem[] = Array.isArray(t.customItems)
          ? t.customItems
          : [];

        const includedCore = items
          .filter((it) => it.included)
          .sort(
            (a, b) =>
              timelineOrder.indexOf(a.id) - timelineOrder.indexOf(b.id)
          )
          .map((it) => ({
            id: it.id,
            label: buildTimelineLabel(it.id, basicsRaw ? JSON.parse(basicsRaw).partner1Name ?? "Partner 1" : "Partner 1",
              basicsRaw ? JSON.parse(basicsRaw).partner2Name ?? "Partner 2" : "Partner 2"),
            isCustom: false,
          }));

        const includedCustom = customItems
          .filter((it) => it.included && it.label)
          .map((it) => ({
            id: it.id,
            label: it.label,
            isCustom: true,
          }));

        setTimelineItems([...includedCore, ...includedCustom]);
      }

      // Family
      const famRaw = window.localStorage.getItem("posesuiteFamily");
      if (famRaw) {
        const f: FamilyData = JSON.parse(famRaw);
        const p1Groups = getPartnerGroups(
          f.p1Status,
          basicsRaw ? JSON.parse(basicsRaw).partner1Name ?? "Partner 1" : "Partner 1",
          basicsRaw ? JSON.parse(basicsRaw).partner2Name ?? "Partner 2" : "Partner 2",
          "p1"
        );
        const p2Groups = getPartnerGroups(
          f.p2Status,
          basicsRaw ? JSON.parse(basicsRaw).partner2Name ?? "Partner 2" : "Partner 2",
          basicsRaw ? JSON.parse(basicsRaw).partner1Name ?? "Partner 1" : "Partner 1",
          "p2"
        );
        const bothGroups = getBothFamiliesGroups(
          basicsRaw ? JSON.parse(basicsRaw).partner1Name ?? "Partner 1" : "Partner 1",
          basicsRaw ? JSON.parse(basicsRaw).partner2Name ?? "Partner 2" : "Partner 2"
        );

        const chosenP1 = p1Groups
          .filter((g) => f.p1Selected.includes(g.id))
          .map((g) => ({ id: g.id, label: g.label, section: "p1" as const }));
        const chosenP2 = p2Groups
          .filter((g) => f.p2Selected.includes(g.id))
          .map((g) => ({ id: g.id, label: g.label, section: "p2" as const }));
        const chosenBoth = bothGroups
          .filter((g) => f.bothSelected.includes(g.id))
          .map((g) => ({ id: g.id, label: g.label, section: "both" as const }));
        const chosenCustom =
          f.customGroups
            ?.filter((g) => g.included && g.label)
            .map((g) => ({
              id: g.id,
              label: g.label,
              section: "custom" as const,
            })) ?? [];

        setFamilyItems([...chosenP1, ...chosenP2, ...chosenBoth, ...chosenCustom]);
      }

      // Must-haves + inspiration
      const mustRaw = window.localStorage.getItem("posesuiteMustHaves");
      if (mustRaw) {
        const m: MustHavesData = JSON.parse(mustRaw);
        const selectedIds = Array.isArray(m.selectedShotIds)
          ? m.selectedShotIds
          : [];

        const basics = basicsRaw ? JSON.parse(basicsRaw) : {};
        const p1Name = basics.partner1Name ?? "Partner 1";
        const p2Name = basics.partner2Name ?? "Partner 2";

        const shots = allShotTemplates
          .filter((tpl) => selectedIds.includes(tpl.id))
          .map((tpl) => ({
            id: tpl.id,
            label: tpl.buildLabel(p1Name, p2Name),
          }));

        setMustHaveShots(shots);
        if (Array.isArray(m.inspirationSlots)) {
          setInspirationSlots(m.inspirationSlots);
        }
      }

      // Progress
      const progRaw = window.localStorage.getItem("posesuiteDayOfProgress");
      if (progRaw) {
        const p = JSON.parse(progRaw);
        setProgress({
          timelineDoneIds: Array.isArray(p.timelineDoneIds)
            ? p.timelineDoneIds
            : [],
          familyDoneIds: Array.isArray(p.familyDoneIds) ? p.familyDoneIds : [],
          mustHaveDoneIds: Array.isArray(p.mustHaveDoneIds)
            ? p.mustHaveDoneIds
            : [],
          inspirationDoneIds: Array.isArray(p.inspirationDoneIds)
            ? p.inspirationDoneIds
            : [],
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "posesuiteDayOfProgress",
      JSON.stringify(progress)
    );
  }, [progress]);

  const toggleTimelineDone = (id: string) => {
    setProgress((prev) => {
      const exists = prev.timelineDoneIds.includes(id);
      return {
        ...prev,
        timelineDoneIds: exists
          ? prev.timelineDoneIds.filter((x) => x !== id)
          : [...prev.timelineDoneIds, id],
      };
    });
  };

  const toggleFamilyDone = (id: string) => {
    setProgress((prev) => {
      const exists = prev.familyDoneIds.includes(id);
      return {
        ...prev,
        familyDoneIds: exists
          ? prev.familyDoneIds.filter((x) => x !== id)
          : [...prev.familyDoneIds, id],
      };
    });
  };

  const toggleMustHaveDone = (id: string) => {
    setProgress((prev) => {
      const exists = prev.mustHaveDoneIds.includes(id);
      return {
        ...prev,
        mustHaveDoneIds: exists
          ? prev.mustHaveDoneIds.filter((x) => x !== id)
          : [...prev.mustHaveDoneIds, id],
      };
    });
  };

  const toggleInspirationDone = (id: string) => {
    setProgress((prev) => {
      const exists = prev.inspirationDoneIds.includes(id);
      return {
        ...prev,
        inspirationDoneIds: exists
          ? prev.inspirationDoneIds.filter((x) => x !== id)
          : [...prev.inspirationDoneIds, id],
      };
    });
  };

  const activeTimeline = timelineItems.filter(
    (it) => !progress.timelineDoneIds.includes(it.id)
  );
  const completedTimeline = timelineItems.filter((it) =>
    progress.timelineDoneIds.includes(it.id)
  );

  const activeFamily = familyItems.filter(
    (it) => !progress.familyDoneIds.includes(it.id)
  );
  const completedFamily = familyItems.filter((it) =>
    progress.familyDoneIds.includes(it.id)
  );

  const activeMust = mustHaveShots.filter(
    (it) => !progress.mustHaveDoneIds.includes(it.id)
  );
  const completedMust = mustHaveShots.filter((it) =>
    progress.mustHaveDoneIds.includes(it.id)
  );

  const activeInspiration = inspirationSlots.filter(
    (slot) =>
      slot.imageDataUrl &&
      !progress.inspirationDoneIds.includes(slot.id)
  );
  const completedInspiration = inspirationSlots.filter(
    (slot) =>
      slot.imageDataUrl &&
      progress.inspirationDoneIds.includes(slot.id)
  );

  const totalRemaining =
    activeTimeline.length +
    activeFamily.length +
    activeMust.length +
    activeInspiration.length;

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
          padding: "2.3rem 2rem 2.5rem",
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
            marginBottom: "1.8rem",
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
                marginBottom: "1.1rem",
              }}
            >
              PoseSuite · Day-of plan
            </div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 300,
                fontSize: "1.9rem",
                marginBottom: "0.4rem",
              }}
            >
              {partner1Name} &amp; {partner2Name} · Day-of checklist
            </h1>
            <p
              style={{
                maxWidth: "540px",
                fontSize: "0.95rem",
                color: "#555",
                margin: 0,
              }}
            >
              Everything here comes from the planning pages you completed
              together. Tap to mark items done — they’ll move to the completed
              list so you can stay focused on what’s next.
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
              minWidth: "180px",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                color: "#777",
                marginBottom: "0.3rem",
              }}
            >
              Remaining items
            </div>
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
              }}
            >
              {totalRemaining}
            </div>
            <button
              type="button"
              onClick={() => setShowCompleted((prev) => !prev)}
              style={{
                marginTop: "0.6rem",
                borderRadius: "999px",
                border: "1px solid #D4D4CF",
                backgroundColor: "#FFFDF8",
                padding: "0.45rem 1rem",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {showCompleted ? "Hide completed" : "Show completed"}
            </button>
          </div>
        </div>

        {/* Timeline checklist */}
        {timelineItems.length > 0 && (
          <section style={{ marginBottom: "1.9rem" }}>
            <h2
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Timeline checklist
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#666",
                marginBottom: "0.8rem",
              }}
            >
              These are the key events you selected on your timeline. Work from
              top to bottom, or jump as needed depending on how the day flows.
            </p>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              {activeTimeline.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.5rem 0.8rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #E2E2DD",
                    backgroundColor: "#FCFCF9",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={progress.timelineDoneIds.includes(item.id)}
                    onChange={() => toggleTimelineDone(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{item.label}</span>
                  {item.isCustom && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.7rem",
                        padding: "0.1rem 0.5rem",
                        borderRadius: "999px",
                        border: "1px solid #D4D4CF",
                        color: "#777",
                      }}
                    >
                      Custom
                    </span>
                  )}
                </label>
              ))}

              {showCompleted &&
                completedTimeline.length > 0 && (
                  <details
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <summary
                      style={{
                        cursor: "pointer",
                        color: "#777",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Completed timeline items ({completedTimeline.length})
                    </summary>
                    <div style={{ display: "grid", gap: "0.4rem", marginTop: "0.4rem" }}>
                      {completedTimeline.map((item) => (
                        <label
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.45rem 0.8rem",
                            borderRadius: "0.75rem",
                            border: "1px solid #E2E2DD",
                            backgroundColor: "#F4F4F0",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            opacity: 0.8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => toggleTimelineDone(item.id)}
                            style={{ accentColor: "#A3B18A" }}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                )}
            </div>
          </section>
        )}

        {/* Family portraits checklist */}
        {familyItems.length > 0 && (
          <section style={{ marginBottom: "1.9rem" }}>
            <h2
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Family portraits
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#666",
                marginBottom: "0.8rem",
              }}
            >
              These groupings come from the family portrait page. Work straight
              down the list, or reorder in the moment depending on who is
              present and ready.
            </p>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              {activeFamily.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.5rem 0.8rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #E2E2DD",
                    backgroundColor: "#FCFCF9",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={progress.familyDoneIds.includes(item.id)}
                    onChange={() => toggleFamilyDone(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}

              {showCompleted &&
                completedFamily.length > 0 && (
                  <details
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <summary
                      style={{
                        cursor: "pointer",
                        color: "#777",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Completed family portraits ({completedFamily.length})
                    </summary>
                    <div style={{ display: "grid", gap: "0.4rem", marginTop: "0.4rem" }}>
                      {completedFamily.map((item) => (
                        <label
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.45rem 0.8rem",
                            borderRadius: "0.75rem",
                            border: "1px solid #E2E2DD",
                            backgroundColor: "#F4F4F0",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            opacity: 0.8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => toggleFamilyDone(item.id)}
                            style={{ accentColor: "#A3B18A" }}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                )}
            </div>
          </section>
        )}

        {/* Must-have standard shots */}
        {mustHaveShots.length > 0 && (
          <section style={{ marginBottom: "1.9rem" }}>
            <h2
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Must-have standard shots
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#666",
                marginBottom: "0.8rem",
              }}
            >
              These are the standard moments the couple kept checked on the
              must-have page. Once you feel you&apos;ve captured a moment in a
              way you&apos;re happy with, mark it done.
            </p>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              {activeMust.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.5rem 0.8rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #E2E2DD",
                    backgroundColor: "#FCFCF9",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={progress.mustHaveDoneIds.includes(item.id)}
                    onChange={() => toggleMustHaveDone(item.id)}
                    style={{ accentColor: "#A3B18A" }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}

              {showCompleted &&
                completedMust.length > 0 && (
                  <details
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <summary
                      style={{
                        cursor: "pointer",
                        color: "#777",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Completed must-have shots ({completedMust.length})
                    </summary>
                    <div style={{ display: "grid", gap: "0.4rem", marginTop: "0.4rem" }}>
                      {completedMust.map((item) => (
                        <label
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.45rem 0.8rem",
                            borderRadius: "0.75rem",
                            border: "1px solid #E2E2DD",
                            backgroundColor: "#F4F4F0",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            opacity: 0.8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => toggleMustHaveDone(item.id)}
                            style={{ accentColor: "#A3B18A" }}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                )}
            </div>
          </section>
        )}

        {/* Inspiration thumbnails */}
        {inspirationSlots.some((s) => s.imageDataUrl) && (
          <section style={{ marginBottom: "0.8rem" }}>
            <h2
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Specific inspiration requests
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#666",
                marginBottom: "0.8rem",
              }}
            >
              These are the handful of inspiration images the couple uploaded as
              special requests — Pinterest favorites, venue classics, or family
              traditions. Mark them off as you feel you&apos;ve honored each one.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {inspirationSlots
                .filter((slot) => slot.imageDataUrl)
                .map((slot, index) => {
                  const done = progress.inspirationDoneIds.includes(slot.id);
                  const isVisible =
                    showCompleted || !done; // if showCompleted is false, hide completed ones

                  if (!isVisible) return null;

                  return (
                    <div
                      key={slot.id}
                      style={{
                        borderRadius: "1rem",
                        border: "1px solid #E2E2DD",
                        padding: "0.75rem",
                        backgroundColor: done ? "#F4F4F0" : "#FCFCF9",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.45rem",
                        opacity: done ? 0.85 : 1,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          borderRadius: "0.75rem",
                          overflow: "hidden",
                          backgroundColor: "#F2F2EE",
                        }}
                      >
                        {slot.imageDataUrl && (
                          <img
                            src={slot.imageDataUrl}
                            alt={`Inspiration ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        )}
                      </div>
                      {slot.note && (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#555",
                            margin: 0,
                          }}
                        >
                          {slot.note}
                        </p>
                      )}
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          marginTop: "0.2rem",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleInspirationDone(slot.id)}
                          style={{ accentColor: "#A3B18A" }}
                        />
                        <span>Marked as completed</span>
                      </label>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
