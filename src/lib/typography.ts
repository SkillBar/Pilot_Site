const RUSSIAN_SHORT_PREPOSITIONS =
  /(^|\s)(в|во|и|к|ко|с|со|у|о|об|от|до|за|из|на|по|под|над|для)(?=\s+)/giu;

/** Keeps short Russian prepositions with the following word in display titles. */
export function balanceDisplayTitle(title: string) {
  return title.replace(
    RUSSIAN_SHORT_PREPOSITIONS,
    (_match, prefix: string, word: string) => `${prefix}${word}\u00a0`,
  );
}
