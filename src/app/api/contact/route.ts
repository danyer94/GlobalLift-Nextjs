import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "../../../lib/seo";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  product: string;
  route: string;
  volume: string;
  timing: string;
  message: string;
  website: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS: Record<Exclude<keyof ContactPayload, "website">, number> = {
  name: 120,
  company: 140,
  email: 180,
  phone: 40,
  service: 140,
  product: 180,
  route: 180,
  volume: 120,
  timing: 120,
  message: 4000,
};

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    return {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      product: "",
      route: "",
      volume: "",
      timing: "",
      message: "",
      website: "",
    };
  }

  const payload = body as Record<string, unknown>;

  return {
    name: normalizeString(payload.name),
    company: normalizeString(payload.company),
    email: normalizeString(payload.email).toLowerCase(),
    phone: normalizeString(payload.phone),
    service: normalizeString(payload.service),
    product: normalizeString(payload.product),
    route: normalizeString(payload.route),
    volume: normalizeString(payload.volume),
    timing: normalizeString(payload.timing),
    message: normalizeString(payload.message),
    website: normalizeString(payload.website),
  };
}

function validatePayload(payload: ContactPayload): string[] {
  const errors: string[] = [];

  if (!payload.name) errors.push("Missing name");
  if (!payload.company) errors.push("Missing company");
  if (!payload.email) errors.push("Missing email");
  if (!payload.phone) errors.push("Missing phone");
  if (!payload.service) errors.push("Missing service");
  if (!payload.message) errors.push("Missing message");

  if (payload.email && !EMAIL_PATTERN.test(payload.email)) {
    errors.push("Invalid email format");
  }

  if (payload.name.length > FIELD_LIMITS.name) errors.push("Name too long");
  if (payload.company.length > FIELD_LIMITS.company)
    errors.push("Company too long");
  if (payload.email.length > FIELD_LIMITS.email) errors.push("Email too long");
  if (payload.phone.length > FIELD_LIMITS.phone) errors.push("Phone too long");
  if (payload.service.length > FIELD_LIMITS.service)
    errors.push("Service too long");
  if (payload.product.length > FIELD_LIMITS.product)
    errors.push("Product too long");
  if (payload.route.length > FIELD_LIMITS.route) errors.push("Route too long");
  if (payload.volume.length > FIELD_LIMITS.volume) errors.push("Volume too long");
  if (payload.timing.length > FIELD_LIMITS.timing) errors.push("Timing too long");
  if (payload.message.length > FIELD_LIMITS.message)
    errors.push("Message too long");

  return errors;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTextBody(payload: ContactPayload): string {
  return [
    `New contact request from ${SITE_URL}`,
    "",
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Service: ${payload.service}`,
    `Product: ${payload.product || "N/A"}`,
    `Destination / Origin: ${payload.route || "N/A"}`,
    `Estimated volume: ${payload.volume || "N/A"}`,
    `Expected timing: ${payload.timing || "N/A"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function formatHtmlBody(payload: ContactPayload): string {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;">
      <h2 style="margin:0 0 16px;">New contact request from ${escapeHtml(SITE_URL)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>
      <p><strong>Product:</strong> ${escapeHtml(payload.product || "N/A")}</p>
      <p><strong>Destination / Origin:</strong> ${escapeHtml(payload.route || "N/A")}</p>
      <p><strong>Estimated volume:</strong> ${escapeHtml(payload.volume || "N/A")}</p>
      <p><strong>Expected timing:</strong> ${escapeHtml(payload.timing || "N/A")}</p>
      <hr style="border:0;border-top:1px solid #e2e8f0;margin:20px 0;" />
      <p style="margin:0 0 8px;"><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured" },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload" },
      { status: 400 },
    );
  }

  const payload = parsePayload(body);

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validatePayload(payload);

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Invalid form data" },
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact request - ${payload.name}`,
      replyTo: payload.email,
      text: formatTextBody(payload),
      html: formatHtmlBody(payload),
    });

    if (error) {
      console.error("[contact-api] resend API rejected send", error);
      return NextResponse.json(
        { ok: false, error: "Unable to send message" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact-api] resend send failed", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send message" },
      { status: 500 },
    );
  }
}
