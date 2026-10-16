type SendEmailInput = {
  to: { address: string; name?: string };
  subject: string;
  htmlbody: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, htmlbody, replyTo }: SendEmailInput) {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
  const fromName = process.env.ZEPTOMAIL_FROM_NAME ?? "Ctrl School";
  const bounce = process.env.ZEPTOMAIL_BOUNCE_ADDRESS;

  if (!token) throw new Error("Missing ZEPTOMAIL_TOKEN in .env.local");
  if (!fromEmail) throw new Error("Missing ZEPTOMAIL_FROM_EMAIL in .env.local");

  const body: Record<string, unknown> = {
    from: { address: fromEmail, name: fromName },
    to: [{ email_address: { address: to.address, name: to.name ?? to.address } }],
    subject,
    htmlbody,
  };

  if (bounce) body.bounce_address = bounce;
  if (replyTo) body.reply_to = [{ address: replyTo }];

  // Your Zoho CPaaS / ZeptoMail agent shows host: cpaas.zoho.com
  const host = (process.env.ZEPTOMAIL_HOST ?? "cpaas.zoho.com").replace(/^https?:\/\//, "");
  const res = await fetch(`https://${host}/v1.1/email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Paste only the key part, or the full "Zoho-enczapikey …" string — both work
      Authorization: token.startsWith("Zoho-enczapikey") ? token : `Zoho-enczapikey ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { message?: string; error?: { message?: string } })?.error?.message ||
      (data as { message?: string })?.message ||
      `ZeptoMail failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export function applicationApplicantHtml(input: {
  fullName: string;
  plan: string;
  program?: string | null;
  billing: string;
  priceLabel: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#171717">
      <p>Hi ${escapeHtml(input.fullName)},</p>
      <p>Thanks for applying to <strong>Ctrl School</strong>.</p>
      <p>
        We received your application for the <strong>${escapeHtml(input.plan)}</strong> plan
        ${input.program ? `(${escapeHtml(input.program)})` : ""}
        at <strong>${escapeHtml(input.priceLabel)}/${escapeHtml(input.billing === "yearly" ? "mo billed yearly" : "mo")}</strong>.
      </p>
      <p>Our team will review it and email you within one business day.</p>
      <p>— Ctrl School<br/>Lagos · Ctrlschoolafrica@gmail.com</p>
    </div>
  `;
}

export function applicationAdminHtml(input: {
  fullName: string;
  email: string;
  plan: string;
  program?: string | null;
  billing: string;
  priceLabel: string;
  goals?: string | null;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#171717">
      <p><strong>New Ctrl School application</strong></p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(input.fullName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(input.email)}</li>
        <li><strong>Plan:</strong> ${escapeHtml(input.plan)} (${escapeHtml(input.billing)})</li>
        <li><strong>Price:</strong> ${escapeHtml(input.priceLabel)}/mo</li>
        <li><strong>Program:</strong> ${escapeHtml(input.program || "Not selected")}</li>
        <li><strong>Goals:</strong> ${escapeHtml(input.goals || "—")}</li>
      </ul>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
