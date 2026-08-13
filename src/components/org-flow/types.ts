export type OrgFlowPerson = {
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt?: string;
  avatarPosition?: string;
};

export type OrgFlowCardData = {
  title: string;
  description?: string;
  tags?: string[];
  kind?: "company" | "project" | "department" | "person" | "leadership";
  /** Role badge for single person cards (CEO / COO …) */
  role?: string;
  /** Circular portrait for single person cards */
  avatarSrc?: string;
  avatarAlt?: string;
  /** object-position for face crop inside the circle */
  avatarPosition?: string;
  /** People row inside a shared leadership card */
  people?: OrgFlowPerson[];
  emphasis?: boolean;
  source?: boolean;
  target?: boolean;
};
