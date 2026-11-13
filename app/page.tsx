import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f4ee",
        color: "#1f1b16",
        fontFamily:
          'Baskerville, "Times New Roman", Times, serif',
      }}
    >
      <header
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(31, 27, 22, 0.08)",
          backgroundColor: "#f7f4ee",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "28px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ display: "inline-block" }}>
            <Image
              src="/HOMEPAGE-LOGO.png"
              alt="Pose Suite"
              width={520}
              height={170}
              priority
              style={{
                width: "min(520px, 100%)",
                height: "auto",
              }}
            />
          </Link>

          <nav aria-label="Main navigation">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                gap: "34px",
                margin: 0,
                padding: 0,
                letterSpacing: "0.18em",
                fontSize: "0.9rem",
                textTransform: "uppercase",
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{ color: "#1f1b16", textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/yourinvestment"
                  style={{ color: "#1f1b16", textDecoration: "none" }}
                >
                  The Investment
                </Link>
              </li>
              <li>
                <Link
                  href="/savethedate"
                  style={{ color: "#1f1b16", textDecoration: "none" }}
                >
                  Inquire
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "28px 24px 64px",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "calc(100vh - 180px)",
            borderRadius: "0px",
            overflow: "hidden",
            backgroundImage: "url('/homepage-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(20,18,15,0.12) 0%, rgba(20,18,15,0.18) 30%, rgba(20,18,15,0.28) 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              color: "#f7f4ee",
              width: "100%",
              maxWidth: "900px",
              padding: "clamp(70px, 10vw, 120px) 24px 120px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "26px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "76px",
                  height: "1px",
                  backgroundColor: "rgba(247, 244, 238, 0.85)",
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                Chicagoland &amp; Beyond
              </p>
              <span
                style={{
                  display: "block",
                  width: "76px",
                  height: "1px",
                  backgroundColor: "rgba(247, 244, 238, 0.85)",
                }}
              />
            </div>

            <h1
              style={{
                margin: 0,
                fontWeight: 400,
                lineHeight: 0.92,
                fontSize: "clamp(4.2rem, 10vw, 8.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Pose Suite
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginTop: "22px",
                marginBottom: "42px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "60px",
                  height: "1px",
                  backgroundColor: "rgba(247, 244, 238, 0.72)",
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                A Guided Photo Booth Experience
              </p>
              <span
                style={{
                  display: "block",
                  width: "60px",
                  height: "1px",
                  backgroundColor: "rgba(247, 244, 238, 0.72)",
                }}
              />
            </div>

            <p
              style={{
                margin: "0 auto",
                maxWidth: "700px",
                fontSize: "clamp(1.8rem, 4vw, 3.3rem)",
                lineHeight: 1.2,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Guided editorial portraits for weddings &amp; celebrations.
            </p>

            <div
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <Link
                href="/savethedate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "340px",
                  maxWidth: "100%",
                  padding: "18px 28px",
                  color: "#f7f4ee",
                  textDecoration: "none",
                  border: "1px solid rgba(247, 244, 238, 0.88)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontSize: "0.98rem",
                  backgroundColor: "rgba(247, 244, 238, 0.04)",
                  backdropFilter: "blur(2px)",
                }}
              >
                Check Your Date &nbsp; →
              </Link>

              <Link
                href="/yourinvestment"
                style={{
                  color: "#f7f4ee",
                  textDecoration: "none",
                  fontSize: "1rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(247, 244, 238, 0.65)",
                  paddingBottom: "4px",
                }}
              >
                View The Investment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

