export type Billing = "monthly" | "yearly";
export type PlanName = "Starter" | "Cohort" | "Career";
export type ProgramName = "Web development" | "Data analytics" | "UI/UX design" | "Product management";

export type Plan = {
  name: PlanName;
  monthly: number;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const YEARLY_DISCOUNT = 0.2;

export const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 49,
    blurb: "Self-paced access while you explore a path.",
    features: ["Core curriculum access", "Weekly live workshops", "Community forum access"],
  },
  {
    name: "Cohort",
    monthly: 149,
    blurb: "The full program with peers and weekly reviews.",
    featured: true,
    features: ["Everything in Starter", "Small-group cohort", "Mentor feedback weekly", "Real project portfolio"],
  },
  {
    name: "Career",
    monthly: 249,
    blurb: "For people who want placement support built in.",
    features: [
      "Everything in Cohort",
      "Dedicated career coach",
      "Interview preparation",
      "Job placement support",
      "Lifetime alumni network",
    ],
  },
];

export const programs: ProgramName[] = [
  "Web development",
  "Data analytics",
  "UI/UX design",
  "Product management",
];

export const defaultPlan = plans.find((p) => p.featured) ?? plans[1];

export function getPlan(name?: PlanName) {
  return plans.find((p) => p.name === name) ?? defaultPlan;
}

export function monthlyPrice(plan: Plan, billing: Billing) {
  return billing === "monthly" ? plan.monthly : Math.round(plan.monthly * (1 - YEARLY_DISCOUNT));
}

export function yearlyTotal(plan: Plan) {
  return monthlyPrice(plan, "yearly") * 12;
}
