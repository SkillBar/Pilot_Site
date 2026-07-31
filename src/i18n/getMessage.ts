import type { Dictionary } from "./dictionaries";

type Primitive = string | number | boolean | null | undefined;

type NestedKey<T> = {
  [K in keyof T]: T[K] extends Primitive
    ? K & string
    : {
        [K2 in keyof T[K]]: T[K][K2] extends Primitive
          ? `${K & string}.${K2 & string}`
          : {
              [K3 in keyof T[K][K2]]: T[K][K2][K3] extends Primitive
                ? `${K & string}.${K2 & string}.${K3 & string}`
                : {
                    [K4 in keyof T[K][K2][K3]]: T[K][K2][K3][K4] extends Primitive
                      ? `${K & string}.${K2 & string}.${K3 & string}.${K4 & string}`
                      : never;
                  }[keyof T[K][K2][K3]];
            }[keyof T[K][K2]];
      }[keyof T[K]];
}[keyof T];

export type MessageKey = NestedKey<Dictionary>;

export function getMessage(
  dictionary: Dictionary,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  if (typeof value !== "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] Missing message: ${key}`);
    }
    return key;
  }

  if (!vars) return value;

  return value.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
}
