// src/app/api/contact/route.ts
export const runtime = "edge";

import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Contact API up" });
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, website } = (await req.json()) as {
      name?: string; email?: string; phone?: string; message?: string; website?: string;
    };

    // Honeypot anti-spam
    if (website) return NextResponse.json({ ok: true }, { status: 200 });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO = process.env.CONTACT_TO || "contact@dynam8.fr";
    const CONTACT_FROM = process.env.CONTACT_FROM || "Dynam8 <onboarding@resend.dev>";
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "RESEND_API_KEY manquante." }, { status: 500 });
    }

    const subject = `Contact Dynam8 — ${name}`;
    const text = [
      `Nom : ${name}`,
      `Email : ${email}`,
      phone ? `Téléphone : ${phone}` : null,
      "",
      "Message :",
      message,
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial">
        <h2 style="margin:0 0 8px 0">Nouveau message depuis le site Dynam8</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
        <p style="margin:16px 0 4px 0"><strong>Message :</strong></p>
        <pre style="white-space:pre-wrap; font-family:inherit">${(message || "").replace(/</g, "&lt;")}</pre>
      </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        subject,
        html,
        text,
        reply_to: email,
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      const msg = err?.message || err?.error || `Échec d’envoi (status ${resp.status}).`;
      return NextResponse.json({ ok: false, error: msg }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
