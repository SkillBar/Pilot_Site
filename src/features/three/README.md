# Pilot 3D feature

This directory is the client-side 3D runtime boundary. It owns the React Three
Fiber canvas, scenes, input adapter, track configuration, and scene utilities.

Consumers must import from `@/features/three` instead of reaching into internal
folders. Static runtime assets are namespaced under `public/three` so the module
does not collide with the site's existing assets.

The feature intentionally contains no landing-page layout, navigation, theme,
or marketing components from the source project.
