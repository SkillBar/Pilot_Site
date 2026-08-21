"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

type LauncherPlan = {
  amount: number;
  nameKey: MessageKey;
  infoKey: MessageKey;
  periodKey: MessageKey;
  featureKeys: MessageKey[];
};

const LAUNCHER: LauncherPlan = {
  amount: 990,
  nameKey: "subscription.plans.launcher.name",
  infoKey: "subscription.plans.launcher.info",
  periodKey: "subscription.plans.launcher.period",
  featureKeys: [
    "subscription.plans.launcher.f1",
    "subscription.plans.launcher.f2",
    "subscription.plans.launcher.f3",
    "subscription.plans.launcher.f4",
  ],
};

const PILOT_ROWS = [
  { minutes: 8, solo: 400, perMin: 50, duo: 650, save: 150, hit: false },
  { minutes: 10, solo: 450, perMin: 45, duo: 750, save: 150, hit: false },
  { minutes: 15, solo: 650, perMin: 43, duo: 1050, save: 250, hit: true },
  { minutes: 20, solo: 800, perMin: 40, duo: 1200, save: 400, hit: false },
  { minutes: 25, solo: 900, perMin: 36, duo: 1300, save: 500, hit: false },
  { minutes: 30, solo: 1050, perMin: 35, duo: 1500, save: 600, hit: false },
] as const;

const UNIOR_ROWS = [
  { id: "solo", amount: 500, labelKey: "subscription.uniorBoard.solo" as const },
  {
    id: "parent",
    amount: 700,
    labelKey: "subscription.uniorBoard.withParent" as const,
    accent: true,
  },
] as const;

const rub = (n: number) =>
  n.toLocaleString("ru-RU", { maximumFractionDigits: 0 });

export function SubscriptionSection() {
  const t = useTranslations();

  return (
    <section
      id="subscription"
      className="subscription-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="landing-pricing-head">
          <h2 className="landing-pricing-title">{t("subscription.title")}</h2>
          <p className="landing-pricing-desc">{t("subscription.description")}</p>
        </div>

        <article className="sub-pilot-board mt-12 md:mt-16">
          <div className="sub-pilot-head">
            <div>
              <h3>{t("subscription.plans.pilot.name")}</h3>
              <p>{t("subscription.plans.pilot.info")}</p>
            </div>
          </div>

          <div className="sub-price-table-wrap">
            <table className="sub-price-table">
              <thead>
                <tr>
                  <th>{t("subscription.pilotBoard.colTime")}</th>
                  <th>{t("subscription.pilotBoard.colSolo")}</th>
                  <th>{t("subscription.pilotBoard.colPerMin")}</th>
                  <th>{t("subscription.pilotBoard.colDuo")}</th>
                  <th>{t("subscription.pilotBoard.colSave")}</th>
                </tr>
              </thead>
              <tbody>
                {PILOT_ROWS.map((row) => (
                  <tr
                    key={row.minutes}
                    className={row.hit ? "sub-price-row--hit" : undefined}
                  >
                    <td data-label={t("subscription.pilotBoard.colTime")}>
                      <span className="sub-price-time">
                        {t("subscription.pilotBoard.minutes", {
                          n: row.minutes,
                        })}
                      </span>
                      {row.hit ? (
                        <span className="sub-price-hit">
                          {t("subscription.pilotBoard.hit")}
                        </span>
                      ) : null}
                    </td>
                    <td data-label={t("subscription.pilotBoard.colSolo")} className="sub-price-solo">{rub(row.solo)}</td>
                    <td data-label={t("subscription.pilotBoard.colPerMin")}>{rub(row.perMin)}</td>
                    <td data-label={t("subscription.pilotBoard.colDuo")}>{rub(row.duo)}</td>
                    <td data-label={t("subscription.pilotBoard.colSave")}>{rub(row.save)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="landing-pricing-grid landing-pricing-grid--side mt-4">
          <article className="sub-unior-board">
            <div className="sub-unior-head">
              <p className="sub-unior-kicker">{t("subscription.uniorBoard.kicker")}</p>
              <h3>{t("subscription.plans.unior.name")}</h3>
              <p>{t("subscription.plans.unior.info")}</p>
            </div>

            <div className="sub-unior-rows">
              {UNIOR_ROWS.map((row) => (
                <div
                  key={row.id}
                  className={`sub-unior-row${
                    "accent" in row && row.accent ? " sub-unior-row--accent" : ""
                  }`}
                >
                  <div>
                    <span className="sub-unior-time">
                      {t("subscription.uniorBoard.minutes", { n: 12 })}
                    </span>
                    <p>{t(row.labelKey)}</p>
                  </div>
                  <strong>
                    {rub(row.amount)} ₽
                  </strong>
                </div>
              ))}
            </div>
          </article>

          <article className="landing-pricing-card">
            <div className="landing-pricing-card-header">
              <div className="landing-pricing-card-title">
                {t(LAUNCHER.nameKey)}
              </div>
              <p className="landing-pricing-card-info">{t(LAUNCHER.infoKey)}</p>

              <div className="landing-pricing-price-row">
                <span className="landing-pricing-price">
                  {rub(LAUNCHER.amount)} ₽
                </span>
                <span className="landing-pricing-period">
                  {t(LAUNCHER.periodKey)}
                </span>
              </div>
            </div>

            <ul className="landing-pricing-features">
              {LAUNCHER.featureKeys.map((key) => (
                <li key={key}>
                  <CheckCircle2 aria-hidden />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
