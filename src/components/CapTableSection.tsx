"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/i18n/client";
import type { MessageKey } from "@/i18n/getMessage";

type CapRow = {
  id: string;
  name: string;
  roleKey?: MessageKey;
  /** Share %; null = уточняется */
  share: number | null;
  accent: string;
};

/** Ownership holders — set share % when confirmed. */
const CAP_ROWS: CapRow[] = [
  {
    id: "zarubin",
    name: "Денис Зарубин",
    share: null,
    accent: "#7857ff",
  },
  {
    id: "egor",
    name: "Егор X",
    share: null,
    accent: "#2b71ff",
  },
  {
    id: "astankovich",
    name: "Кирилл Астанкович",
    share: null,
    accent: "#00a6e8",
  },
  {
    id: "chikurov",
    name: "Антон Чикуров",
    share: null,
    accent: "#ef5a16",
  },
];

function PlusMarks({ className = "dist-plus" }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function CapTableSection() {
  const t = useTranslations();
  const pending = t("capTable.pending");
  const knownShares = CAP_ROWS.filter((row) => row.share !== null);
  const total = knownShares.reduce((sum, row) => sum + (row.share ?? 0), 0);
  const allKnown = knownShares.length === CAP_ROWS.length;

  return (
    <section
      id="cap-table"
      className="cap-section relative overflow-hidden border-t border-black/10 px-5 py-16 md:px-8 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t("capTable.title")}
          description={t("capTable.description")}
          descriptionClassName="max-w-xl text-black/55"
        />

        {knownShares.length > 0 ? (
          <div className="cap-stack mt-12 md:mt-16" aria-hidden>
            {CAP_ROWS.map((row) => (
              <span
                key={row.id}
                className="cap-stack-seg"
                style={{
                  flexGrow: row.share ?? 1,
                  backgroundColor: row.accent,
                  opacity: row.share === null ? 0.25 : 1,
                }}
              />
            ))}
          </div>
        ) : null}

        <div
          className={`dist-board cap-board${knownShares.length > 0 ? " mt-8" : " mt-12 md:mt-16"}`}
        >
          <PlusMarks className="dist-plus dist-plus--board" />

          <div className="dist-board-inner">
            <table className="cap-table" aria-label={t("capTable.title")}>
              <thead>
                <tr className="cap-head">
                  <th scope="col" className="cap-cell cap-cell--who">
                    <PlusMarks className="dist-plus dist-plus--row" />
                    {t("capTable.colHolder")}
                  </th>
                  <th scope="col" className="cap-cell cap-cell--role">
                    {t("capTable.colRole")}
                  </th>
                  <th scope="col" className="cap-cell cap-cell--share">
                    {t("capTable.colShare")}
                  </th>
                </tr>
              </thead>
              <tbody className="cap-body">
              {CAP_ROWS.map((row) => (
                <tr key={row.id} className="cap-row">
                  <td className="cap-cell cap-cell--who">
                    <PlusMarks className="dist-plus dist-plus--row" />
                    <span
                      className="cap-dot"
                      style={{ backgroundColor: row.accent }}
                      aria-hidden
                    />
                    <span>{row.name}</span>
                  </td>
                  <td className="cap-cell cap-cell--role cap-cell--muted">
                    {row.roleKey ? t(row.roleKey) : pending}
                  </td>
                  <td
                    className={`cap-cell cap-cell--share${
                      row.share === null ? " cap-cell--muted" : ""
                    }`}
                  >
                    {row.share === null ? pending : `${row.share}%`}
                  </td>
                </tr>
              ))}

              <tr className="cap-row cap-row--total">
                <td className="cap-cell cap-cell--who">
                  <PlusMarks className="dist-plus dist-plus--row" />
                  {t("capTable.total")}
                </td>
                <td className="cap-cell cap-cell--role" />
                <td
                  className={`cap-cell cap-cell--share${
                    allKnown ? "" : " cap-cell--muted"
                  }`}
                >
                  {allKnown ? `${total}%` : pending}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
