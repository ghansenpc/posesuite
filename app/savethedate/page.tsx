

          margin: 36px auto 38px;
          max-width: 590px;
          font-size: 12px;
          line-height: 2;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .ps-mobile-break { display: block; }
        .ps-form {
          border: 1px solid rgba(233, 223, 202, 0.65);
          padding: 34px 48px 42px;
        }
        .ps-field { margin-bottom: 24px; }
        .ps-field label {
          display: block;
          margin-bottom: 11px;
          font-size: 11px;
          letter-spacing: 0.24em;
          line-height: 1.7;
        }
        .ps-field input,
        .ps-field select,
        .ps-field textarea {
          display: block;
          width: 100%;
          border: 1px solid rgba(233, 223, 202, 0.74);
          border-radius: 0;
          padding: 13px 15px;
          color: #f2e9dc;
          background: rgba(10, 12, 8, 0.13);
          -webkit-text-fill-color: #f2e9dc;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 17px;
          font-style: italic;
          line-height: 1.4;
          outline-offset: 3px;
        }
        .ps-field input::placeholder,
        .ps-field textarea::placeholder { color: rgba(238, 230, 216, 0.79); opacity: 1; }
        .ps-field input:focus,
        .ps-field select:focus,
        .ps-field textarea:focus { outline: 1px solid #eee6d8; }
        .ps-field input[type='date'] { min-height: 52px; color-scheme: dark; }
        .ps-field input:-webkit-autofill,
        .ps-field input:-webkit-autofill:hover,
        .ps-field input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #25291f inset;
          -webkit-text-fill-color: #f2e9dc;
          caret-color: #f2e9dc;
          transition: background-color 9999s ease-out;
        }
        .ps-field select { appearance: auto; min-height: 52px; }
        .ps-field select option { background: #1d2117; color: #eee6d8; }
        .ps-field textarea { resize: vertical; min-height: 98px; }
        .ps-button {
          display: block;
          width: 100%;
          min-height: 64px;
          margin-top: 6px;
          padding: 16px;
          border: 1px solid #e5d7c4;
          border-radius: 0;
          background: #e5d7c4;
          color: #202218;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.32em;
          cursor: pointer;
          transition: background 180ms ease;
        }
        .ps-button:hover { background: #f3e9db; }
        .ps-button:focus-visible { outline: 2px solid white; outline-offset: 4px; }
        .ps-button:disabled { opacity: 0.65; cursor: wait; }
        .ps-error { color: #ffd2c7; font-size: 14px; line-height: 1.6; }
        .ps-honeypot { position: absolute; left: -9999px; height: 0; overflow: hidden; }
        .ps-footer { padding: 28px 10px 0; }
        .ps-footer > p {
          margin: 0;
          font-family: Didot, 'Bodoni MT', Georgia, serif;
          font-style: italic;
          font-size: 22px;
          line-height: 1.45;
        }
        .ps-footer > p span { display: block; }
        .ps-footer .ps-divider { margin: 26px auto 22px; }
        .ps-footer small { color: #c4baa9; font-size: 11px; line-height: 1.7; }
        .ps-success { text-align: center; padding-top: 66px; padding-bottom: 64px; }
        .ps-success-label { font-size: 11px; letter-spacing: 0.28em; }
        .ps-success h2 {
          margin: 14px 0 22px;
          font-family: Didot, 'Bodoni MT', Georgia, serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(38px, 7vw, 62px);
        }
        .ps-success > p:not(.ps-success-label) {
          max-width: 470px;
          margin: 0 auto 30px;
          font-family: Georgia, serif;
          font-size: 17px;
          line-height: 1.75;
        }
        @media (max-width: 600px) {
          .ps-page { padding: 34px 16px 48px; }
          .ps-tagline { font-size: 9px; letter-spacing: 0.28em; }
          .ps-divider { margin: 26px auto; }
          .ps-intro p { margin: 28px auto; font-size: 10px; letter-spacing: 0.2em; }
          .ps-form { padding: 28px 20px 32px; }
          .ps-field { margin-bottom: 20px; }
          .ps-field label { font-size: 10px; letter-spacing: 0.16em; }
          .ps-field input, .ps-field select, .ps-field textarea { font-size: 16px; }
          .ps-button { font-size: 12px; letter-spacing: 0.22em; }
          .ps-footer > p { font-size: 19px; }
        }
      `}</style>
    </main>
  );
}

