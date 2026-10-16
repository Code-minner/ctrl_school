import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { formatNaira, getPlan, monthlyPrice, type Billing, type PlanName } from "@/lib/plans";
import {
  applicationAdminHtml,
  applicationApplicantHtml,
  sendEmail,
} from "@/lib/zeptomail";

type Body = {
  fullName?: string;
  email?: string;
  program?: string;
  plan?: PlanName;
  billing?: Billing;
  goals?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const program = body.program?.trim() || null;
    const goals = body.goals?.trim() || null;
    const billing: Billing = body.billing === "yearly" ? "yearly" : "monthly";
    const plan = getPlan(body.plan);
    const price = monthlyPrice(plan, billing);

    if (!fullName || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const db = sql();
    const rows = await db`
      INSERT INTO applications (full_name, email, program, plan, billing, price_monthly, goals)
      VALUES (${fullName}, ${email}, ${program}, ${plan.name}, ${billing}, ${price}, ${goals})
      RETURNING id
    `;

    const priceLabel = formatNaira(price);
    const adminEmail = process.env.ADMIN_EMAIL ?? "Ctrlschoolafrica@gmail.com";

    // Emails should not fail the save if ZeptoMail is misconfigured temporarily
    const emailErrors: string[] = [];
    try {
      await sendEmail({
        to: { address: email, name: fullName },
        subject: "We got your Ctrl School application",
        htmlbody: applicationApplicantHtml({
          fullName,
          plan: plan.name,
          program,
          billing,
          priceLabel,
        }),
        replyTo: adminEmail,
      });
    } catch (err) {
      emailErrors.push(err instanceof Error ? err.message : "Applicant email failed");
    }

    try {
      await sendEmail({
        to: { address: adminEmail, name: "Ctrl School" },
        subject: `New application · ${fullName} · ${plan.name}`,
        htmlbody: applicationAdminHtml({
          fullName,
          email,
          plan: plan.name,
          program,
          billing,
          priceLabel,
          goals,
        }),
        replyTo: email,
      });
    } catch (err) {
      emailErrors.push(err instanceof Error ? err.message : "Admin email failed");
    }

    return NextResponse.json({
      ok: true,
      id: rows[0]?.id,
      emailWarnings: emailErrors.length ? emailErrors : undefined,
    });
  } catch (err) {
    console.error("[api/apply]", err);
    const message = err instanceof Error ? err.message : "Could not save application.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
