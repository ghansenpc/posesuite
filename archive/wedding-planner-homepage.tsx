export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #F8F7F4, #ECF0E8)",
        color: "#2E2E2E",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {/* top pill bar */}
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
            marginBottom: "1.5rem",
          }}
        >
          POSE SUITE · GARBERO PHOTOGRAPHY
        </div>

        <h1
          style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontWeight: 300,
            fontSize: "2.7rem",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          Plan, organize, and schedule your wedding so we can execute it beautifully.
        </h1>

        <p
          style={{
            maxWidth: "34rem",
            margin: "0 auto 2.5rem",
            fontSize: "1.05rem",
            color: "#555",
          }}
        >
          PoseSuite connects your vision with my team&apos;s expertise to build
          family formals, timelines, and inspiration boards — all in one
          elegant workflow.
        </p>

        <a
          href="/basics"
          style={{
            backgroundColor: "#A3B18A",
            color: "#1F2622",
            border: "none",
            padding: "0.9rem 2.8rem",
            borderRadius: "999px",
            fontSize: "1rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 500,
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Get Started
        </a>

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "#777",
          }}
        >
          Built for couples who value simplicity in planning timeless imagery.
        </p>
      </section>

      {/* HOW IT WORKS / TAGLINE */}
      <section
        style={{
          padding: "3rem 1.5rem 4rem",
          maxWidth: "1040px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontWeight: 400,
            marginBottom: "2.5rem",
          }}
        >
          An organized home for your wedding photography vision board.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {[
            {
              title: "Plan",
              text: "Collect must-have images, family details, and inspiration uploads in one place.",
            },
            {
              title: "Organize",
              text: "Build smart family shot lists, note special considerations, and photographer-only reminders.",
            },
            {
              title: "Schedule",
              text: "Design a photography-first timeline so your photo team knows where to be and who should be in front of our lens.",
            },
            {
              title: "Execute",
              text: "Shareable day-of checklists for my phone – I can tap to mark shots complete so I can focus on creating, not remembering.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "1.25rem",
                padding: "1.75rem 1.6rem",
                border: "1px solid #E4E4E0",
                boxShadow: "0 14px 35px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 20%, #C9A66B, #A37A36)",
                  marginBottom: "0.9rem",
                }}
              />
              <h3
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#555" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section
        style={{
          padding: "3.5rem 1.5rem 4rem",
          backgroundColor: "#F2F3ED",
          borderTop: "1px solid #E0E2D7",
          borderBottom: "1px solid #E0E2D7",
        }}
      >
        <div
          style={{
            maxWidth: "1040px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
            gap: "2.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: "1.6rem",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              Built so your wedding day feels calm, intentional, and fully seen.
            </h2>
            <p
              style={{
                fontSize: "0.98rem",
                color: "#555",
                marginBottom: "1.5rem",
              }}
            >
              PoseSuite is your private planning room for Garbero Photography:
              a dedicated hub for your family formals, timeline, special
              considerations, and inspiration images we&apos;ll bring to life on
              the day.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.95rem",
                color: "#444",
              }}
            >
              <li style={{ marginBottom: "0.65rem" }}>
                ✅ Guided family shot builder with space for names and dynamics
              </li>
              <li style={{ marginBottom: "0.65rem" }}>
                ✅ Timeline notes so we know where to be, and when
              </li>
              <li style={{ marginBottom: "0.65rem" }}>
                ✅ Upload your must-have inspiration images and traditions
              </li>
              <li>✅ Day-of reference so we can focus on you, not the checklist</li>
            </ul>
          </div>

          <div
            style={{
              alignSelf: "center",
              borderRadius: "1.5rem",
              border: "1px solid #E0E2D7",
              padding: "1.75rem 1.5rem",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 18px 40px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Working with Garbero Photography
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#555",
                marginBottom: "1.2rem",
              }}
            >
              From your first consultation to your final gallery delivery, my
              team and I use PoseSuite behind the scenes to keep everything
              organized, thoughtful, and tailored to your story.
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#777",
                fontStyle: "italic",
              }}
            >
              You bring the love and the vision. We&apos;ll bring the calm, the
              direction, and the artistry to photograph it all.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "1.5rem 1rem 2rem",
          fontSize: "0.8rem",
          color: "#777",
        }}
      >
        © {new Date().getFullYear()} Garbero Photography · PoseSuite
      </footer>
    </main>
  );
}
