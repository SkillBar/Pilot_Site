/**
 * Kenney Starter Kit Racing — mesh library indices (see models/Library/mesh-library.tres).
 * `track-ramp` is referenced in Godot but this checkout has no track-ramp.glb; use bump as stand-in.
 * GLB files reference **external** `Textures/colormap.png` next to each model — keep
 * `public/kenney/starter-racing/Textures/colormap.png` in sync (from Starter Kit `models/Textures`).
 */

export const KENNEY_STARTER_RACING_GLB: Record<number, string> = {
  0: "/three/kenney/starter-racing/decoration-empty.glb",
  1: "/three/kenney/starter-racing/decoration-forest.glb",
  2: "/three/kenney/starter-racing/decoration-tents.glb",
  3: "/three/kenney/starter-racing/track-corner.glb",
  4: "/three/kenney/starter-racing/track-finish.glb",
  5: "/three/kenney/starter-racing/track-bump.glb",
  6: "/three/kenney/starter-racing/track-straight.glb",
};

export const KENNEY_STARTER_RACING_PRELOAD_URLS: readonly string[] = Array.from(
  new Set(Object.values(KENNEY_STARTER_RACING_GLB))
);
