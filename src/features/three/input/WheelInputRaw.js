let gamepadIndex = null;
let opts = {
  steerAxis: 0,
  throttleAxis: 2,
  brakeAxis: 5,
  clutchAxis: 2,
  autoMapAxes: false,
  deadzone: 0.08,
  debug: false,
};
let lastLogAt = 0;
let lastNoPadLogAt = 0;

function onGamepadConnected(e) {
  console.log("Gamepad connected:", e.gamepad.id);
  gamepadIndex = e.gamepad.index;
}

function onGamepadDisconnected() {
  gamepadIndex = null;
}

function deadzone(v, dz = 0.08) {
  return Math.abs(v) < dz ? 0 : v;
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function applyThreshold(v, t = 0.05) {
  return v < t ? 0 : v;
}

function pedalCurve(x) {
  return Math.pow(x, 1.5);
}

export function initWheelInput(next = {}) {
  opts = { ...opts, ...next };
  window.addEventListener("gamepadconnected", onGamepadConnected);
  window.addEventListener("gamepaddisconnected", onGamepadDisconnected);

  const pads = navigator.getGamepads?.() ?? [];
  for (let i = 0; i < pads.length; i++) {
    if (pads[i]) {
      gamepadIndex = pads[i].index;
      break;
    }
  }
}

export function destroyWheelInput() {
  window.removeEventListener("gamepadconnected", onGamepadConnected);
  window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);
  gamepadIndex = null;
}

export function getWheelInput() {
  const pads = navigator.getGamepads?.() ?? [];
  let pad = gamepadIndex != null ? pads[gamepadIndex] : null;

  // Fallback: some browsers don't emit gamepadconnected until interaction.
  if (!pad) {
    for (let i = 0; i < pads.length; i++) {
      if (pads[i]) {
        gamepadIndex = pads[i].index;
        pad = pads[i];
        if (opts.debug) {
          console.log("[wheeldebug] gamepad found via fallback:", {
            index: gamepadIndex,
            id: pad.id,
          });
        }
        break;
      }
    }
  }

  if (!pad) {
    if (opts.debug) {
      const now = performance.now();
      if (now - lastNoPadLogAt > 1000) {
        lastNoPadLogAt = now;
        console.log("[wheeldebug] no gamepad yet");
      }
    }
    return { steer: 0, throttle: 0, brake: 0 };
  }

  const steerRaw = pad.axes[opts.steerAxis] ?? 0;
  const throttleRaw = pad.axes[opts.throttleAxis] ?? 1;
  const brakeRaw = pad.axes[opts.brakeAxis] ?? 1;
  const steer = deadzone(steerRaw, opts.deadzone);
  const throttle = applyThreshold(pedalCurve(clamp01((1 - throttleRaw) / 2)), 0.05);
  const brake = applyThreshold(pedalCurve(clamp01((1 - brakeRaw) / 2)), 0.05);

  if (opts.debug) {
    const now = performance.now();
    if (now - lastLogAt > 250) {
      lastLogAt = now;
      console.log("[wheeldebug]", {
        id: pad.id,
        axes: [...pad.axes].map((v) => Number(v.toFixed(3))),
        buttons: pad.buttons.map((b) => b.value),
        steerRaw: Number(steerRaw.toFixed(3)),
        throttleRaw: Number(throttleRaw.toFixed(3)),
        brakeRaw: Number(brakeRaw.toFixed(3)),
        steer,
        throttle,
        brake,
      });
    }
  }

  return {
    steer,
    throttle,
    brake,
  };
}
