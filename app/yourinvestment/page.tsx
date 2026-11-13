import type { Metadata } from "next";
import Image from "next/image";
import groom from "../images/groom.jpg";
import bride from "../images/bride.jpg";

export const metadata: Metadata = {
  title: "2027 Investment | Pose Suite Wedding Portraits",
  description:
    "Explore Pose Suite's 2027 luxury guided wedding portrait experiences in Chicago and Chicagoland. Digital and printed collections starting at $2,100.",
  alternates: { canonical: "https://posesuite.com/yourinvestment" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Jost:wght@400;500;600&display=swap');
.ps-investment {
  --ink:#18241d;--olive:#263a2b;--paper:#f5f2ed;--cream:#fbf9f5;
  --muted:#677066;--rule:#cfcac1;--serif:'Bodoni Moda',Didot,'Times New Roman',serif;
  --sans:Jost,'Avenir Next',Arial,sans-serif;
  background:var(--paper);color:var(--ink);min-height:100vh;
  -webkit-font-smoothing:antialiased;font-family:var(--sans);font-size:16px;
}
.ps-investment *, .ps-investment *::before, .ps-investment *::after{box-sizing:border-box}
.ps-investment h1,.ps-investment h2,.ps-investment p,.ps-investment figure{margin:0}
.ps-investment a{color:inherit}
.ps-investment a:focus-visible{outline:2px solid #8ea58c;outline-offset:5px}
.ps-investment .site-header{background:var(--cream)}
.ps-investment .header-inner{max-width:1440px;margin:auto;padding:23px clamp(18px,4.8vw,70px);display:flex;align-items:center;justify-content:space-between;gap:18px}
.ps-investment .brand{font:400 clamp(30px,4.4vw,58px)/1 var(--serif);letter-spacing:-.065em;text-decoration:none;white-space:nowrap}
.ps-investment .top-nav{display:flex;gap:clamp(14px,3.8vw,52px);align-items:center}
.ps-investment .top-nav a{font:500 11px/1.4 var(--sans);letter-spacing:.17em;text-transform:uppercase;text-decoration:none;white-space:nowrap}
.ps-investment .top-nav a:hover,.ps-investment .footer-link:hover{text-decoration:underline;text-underline-offset:5px}
.ps-investment .photo-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(5px,.7vw,10px);width:100%}
.ps-investment .portrait{display:block;aspect-ratio:5 / 7;overflow:hidden;background:#18261e;position:relative}
.ps-investment .portrait img{display:block;width:100%;height:100%;object-fit:cover}
.ps-investment .portrait--groom img{object-position:50% 74%}
.ps-investment .portrait--bride img{object-position:50% 73%}
.ps-investment .container{width:min(calc(100% - 2 * clamp(20px,5vw,66px)),1130px);margin-inline:auto}
.ps-investment .intro{padding-top:clamp(40px,5.2vw,78px)}
.ps-investment .eyebrow,.ps-investment .section-label{font:600 12px/1.5 var(--sans);letter-spacing:.20em;text-transform:uppercase;color:var(--olive)}
.ps-investment .eyebrow span{margin-inline:.85em;color:#80867e}
.ps-investment h1{margin:13px 0 16px;font:400 clamp(53px,8vw,108px)/1.12 var(--serif);letter-spacing:-.065em}
.ps-investment .intro-subtitle{margin:0 0 9px;font:400 clamp(20px,2.7vw,33px)/1.35 var(--serif);letter-spacing:-.02em}
.ps-investment .tagline{margin-bottom:32px;font:500 12px/1.8 var(--sans);color:var(--muted);letter-spacing:.11em;text-transform:uppercase}
.ps-investment .divider{height:1px;width:100%;background:var(--rule)}
.ps-investment .investment{padding-block:26px 30px}
.ps-investment .section-label{margin:0 0 22px}
.ps-investment .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.ps-investment .price-card{background:var(--cream);border:1px solid #c6c2b8;padding:clamp(24px,3.3vw,46px);display:flex;flex-direction:column;min-height:375px}
.ps-investment .card-number{font:600 12px/1.4 var(--sans);letter-spacing:.15em;color:var(--olive);margin-bottom:18px}
.ps-investment .card-number span{display:inline-block;margin-inline:.8em;color:#9c9d95}
.ps-investment .price-card h2{margin-bottom:16px;font:400 clamp(28px,3.3vw,42px)/1.18 var(--serif);letter-spacing:-.028em}
.ps-investment .starting{font:600 10px/1.4 var(--sans);letter-spacing:.21em;text-transform:uppercase;color:var(--muted)}
.ps-investment .price{margin:2px 0 18px;font:400 clamp(56px,7vw,84px)/1.16 var(--serif);letter-spacing:-.06em}
.ps-investment .price-card .divider{margin-bottom:23px}
.ps-investment .card-kicker{margin:0 0 12px;font:600 11px/1.45 var(--sans);letter-spacing:.14em;text-transform:uppercase}
.ps-investment .card-desc{font:400 clamp(15px,1.65vw,17px)/1.65 var(--sans)}
.ps-investment .card-detail{margin-top:16px;font:400 13px/1.65 var(--sans);color:var(--muted)}
.ps-investment .common-note{text-align:center;margin:17px 0 0;color:var(--olive);font:500 12px/1.65 var(--sans);letter-spacing:.08em;text-transform:uppercase}
.ps-investment .addon{background:var(--olive);color:var(--cream);margin:10px 0 0;padding:clamp(27px,4vw,48px);display:flex;align-items:center;justify-content:space-between;gap:40px}
.ps-investment .addon-tag{color:#dedfce;font:500 11px/1.4 var(--sans);letter-spacing:.2em;text-transform:uppercase;margin:0 0 10px}
.ps-investment .addon h2{font:400 clamp(33px,4.3vw,55px)/1.2 var(--serif);letter-spacing:-.045em;margin-bottom:8px}
.ps-investment .addon p:last-child{font:400 15px/1.6 var(--sans);color:#edede3;max-width:620px}
.ps-investment .addon-price{flex:0 0 auto;border-left:1px solid #9ba89a;padding-left:clamp(25px,4.4vw,65px)}
.ps-investment .addon-price .starting{display:block;color:#e8e8dd}
.ps-investment .addon-price strong{display:block;font:400 clamp(51px,6.5vw,80px)/1.2 var(--serif);letter-spacing:-.06em;white-space:nowrap}
.ps-investment .closing{padding:28px 0 clamp(58px,8vw,105px);text-align:center}
.ps-investment .closing .disclaimer{font:italic 400 16px/1.7 Georgia,serif;color:#586359;margin:0 0 28px}
.ps-investment .closing h2{font:400 clamp(30px,5vw,50px)/1.25 var(--serif);letter-spacing:-.035em;margin-bottom:10px}
.ps-investment .closing p:not(.disclaimer){font:400 15px/1.65 var(--sans);margin:0 auto 25px;max-width:540px}
.ps-investment .cta{display:inline-flex;min-height:54px;min-width:255px;align-items:center;justify-content:center;padding:17px 26px;color:var(--cream);background:var(--ink);font:500 12px/1.4 var(--sans);letter-spacing:.2em;text-decoration:none;text-transform:uppercase;transition:background-color .2s ease,transform .2s ease}
.ps-investment .cta:hover{background:#385241;transform:translateY(-1px)}
.ps-investment .site-footer{padding:28px 0;border-top:1px solid var(--rule);text-align:center}
.ps-investment .site-footer p{font:400 11px/1.7 var(--sans);text-transform:uppercase;letter-spacing:.13em;color:var(--muted)}
.ps-investment .footer-link{text-decoration:none}
@media(max-width:680px){
 .ps-investment .header-inner{padding:18px}
 .ps-investment .brand{font-size:clamp(28px,7.8vw,40px)}
 .ps-investment .top-nav{gap:15px}
 .ps-investment .top-nav a{font-size:9px;letter-spacing:.10em}
 .ps-investment .top-nav a:first-child{display:none}
 .ps-investment .intro{padding-top:34px}
 .ps-investment h1{font-size:clamp(49px,12vw,72px)}
 .ps-investment .cards{grid-template-columns:1fr;gap:14px}
 .ps-investment .price-card{min-height:0}
 .ps-investment .addon{align-items:flex-start;flex-direction:column;gap:19px}
 .ps-investment .addon-price{padding:17px 0 0;border-left:0;border-top:1px solid #9ba89a;width:100%}
 .ps-investment .tagline{margin-bottom:25px}
}
@media(prefers-reduced-motion:reduce){.ps-investment .cta{transition:none}}
`;

export default function YourInvestmentPage() {
  return (
    <div className="ps-investment">
      <style>{css}</style>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="brand" aria-label="Pose Suite home">POSE SUITE</a>
          <nav className="top-nav" aria-label="Main navigation">
            <a href="/">The Experience</a>
            <a href="/savethedate/">Inquire</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="photo-pair" aria-label="Pose Suite editorial wedding portraits">
          <figure className="portrait portrait--groom">
            <Image src={groom} alt="Groom posed in a green chair against an olive studio backdrop" priority sizes="50vw" />
          </figure>
          <figure className="portrait portrait--bride">
            <Image src={bride} alt="Bride posed in a green chair wearing her wedding dress" priority sizes="50vw" />
          </figure>
        </section>

        <div className="container">
          <section className="intro" aria-labelledby="investment-title">
            <p className="eyebrow">2027 <span>/</span> Wedding Portrait Experiences</p>
            <h1 id="investment-title">The Investment</h1>
            <p className="intro-subtitle">Guided. Editorial. Unforgettable.</p>
            <p className="tagline">A photo booth takes pictures. We create portraits.</p>
            <div className="divider" aria-hidden="true" />
          </section>

          <section className="investment" aria-labelledby="choose-title">
            <h2 className="section-label" id="choose-title">Choose Your Experience</h2>
            <div className="cards">
              <article className="price-card">
                <p className="card-number">01 <span>/</span> Digital</p>
                <h2>The Digital<br />Experience</h2>
                <span className="starting">Starting at</span>
                <p className="price">$2,100</p>
                <div className="divider" aria-hidden="true" />
                <p className="card-kicker">More time to create</p>
                <p className="card-desc">Extended guided portraits throughout the reception, with a professionally edited digital gallery delivered after the wedding.</p>
                <p className="card-detail">Perfect for couples who want more opportunities for their guests to be photographed.</p>
              </article>
              <article className="price-card">
                <p className="card-number">02 <span>/</span> Printed</p>
                <h2>The Printed<br />Experience</h2>
                <span className="starting">Starting at</span>
                <p className="price">$2,100</p>
                <div className="divider" aria-hidden="true" />
                <p className="card-kicker">A keepsake to take home</p>
                <p className="card-desc">Guided portraits during cocktail hour, followed by on-site editing and up to 100 guest portrait prints, ready before the celebration ends.</p>
                <p className="card-detail">Includes a handful of portraits of the couple, separate from the guest print allowance.</p>
              </article>
            </div>
            <p className="common-note">Both experiences include six hours on-site, including setup and teardown.</p>
          </section>

          <section className="addon" aria-labelledby="family-title">
            <div>
              <p className="addon-tag">Optional Add-On</p>
              <h2 id="family-title">Formal Family Portraits</h2>
              <p>Pre-ceremony family photographs, guided with a planned shot list and delivered in a professionally edited digital gallery. Added coverage is scheduled before the main portrait experience.</p>
            </div>
            <div className="addon-price">
              <span className="starting">Starting at</span>
              <strong>$800</strong>
            </div>
          </section>

          <section className="closing" aria-labelledby="contact-title">
            <p className="disclaimer">All pricing is starting pricing and is subject to change. Final pricing and availability are confirmed in your proposal.</p>
            <h2 id="contact-title">Let&apos;s Create Something Unforgettable.</h2>
            <p>Planning your 2027 wedding in Chicago or Chicagoland? Share your date and a few details, and let&apos;s talk about the right experience for your celebration.</p>
            <a className="cta" href="/savethedate/">Inquire for 2027</a>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Pose Suite · Chicago &amp; Chicagoland · <a className="footer-link" href="/">A Guided Portrait Experience</a></p>
        </div>
      </footer>
    </div>
  );
}

