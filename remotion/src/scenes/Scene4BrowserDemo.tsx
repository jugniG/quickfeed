import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

// Animated cursor component
const Cursor = ({ x, y, opacity }: { x: number; y: number; opacity: number }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      pointerEvents: "none",
      zIndex: 100,
      transform: "translate(-2px, -2px)",
    }}
  >
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <path
        d="M3 2L3 20L7.5 15.5L10.5 22L13 21L10 14.5L16 14.5L3 2Z"
        fill="white"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// The feedback widget
const FeedbackWidget = ({ progress }: { progress: number }) => {
  const widgetY = interpolate(progress, [0, 1], [40, 0]);
  const widgetOpacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter effect on message text
  const fullText = "Checkout keeps resetting my cart...";
  const charCount = Math.floor(interpolate(progress, [0.2, 0.8], [0, fullText.length], { extrapolateRight: "clamp" }));
  const displayText = fullText.slice(0, charCount);
  const showCursor = charCount < fullText.length;

  // Submit button glow
  const btnGlow = interpolate(progress, [0.85, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity: widgetOpacity,
        transform: `translateY(${widgetY}px)`,
        position: "absolute",
        right: 40,
        top: "50%",
        marginTop: -180,
        width: 300,
        borderRadius: 20,
        border: "1.5px solid #fed7aa",
        background: COLORS.white,
        boxShadow: `0 16px 48px rgba(249,115,22,0.22), 0 2px 12px rgba(0,0,0,0.08)`,
        overflow: "hidden",
        fontFamily,
      }}
    >
      {/* Widget header */}
      <div
        style={{
          padding: "12px 16px",
          background: "linear-gradient(90deg, #fff7ed, #fffbeb)",
          borderBottom: "1px solid #fed7aa",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "linear-gradient(135deg, #f97316, #fbbf24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.3" />
            <path d="M7 2.5C7 2.5 5 4.5 5 7s2 4.5 2 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M7 2.5C7 2.5 9 4.5 9 7s-2 4.5-2 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M1.5 7h11" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.neutral800, lineHeight: 1.2 }}>
            What went wrong?
          </div>
          <div style={{ fontSize: 11, color: COLORS.neutral400, lineHeight: 1.2 }}>
            Help us fix it in seconds
          </div>
        </div>
      </div>

      {/* Widget body */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Chips */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          {[
            { label: "🐛 Bug", active: true },
            { label: "😕 Confusing", active: false },
            { label: "💡 Idea", active: false },
          ].map((chip) => (
            <span
              key={chip.label}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                border: `1.5px solid ${chip.active ? "#f97316" : "#e5e7eb"}`,
                background: chip.active ? "#f97316" : "#fff",
                color: chip.active ? "#fff" : COLORS.neutral400,
              }}
            >
              {chip.label}
            </span>
          ))}
        </div>

        {/* Text input */}
        <div
          style={{
            padding: "9px 12px",
            borderRadius: 12,
            border: "1.5px solid #e5e7eb",
            background: "#f9fafb",
            fontSize: 11.5,
            color: COLORS.neutral800,
            lineHeight: 1.65,
            minHeight: 44,
          }}
        >
          {displayText}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 14,
                background: "#f97316",
                marginLeft: 1,
                verticalAlign: "middle",
              }}
            />
          )}
        </div>

        {/* URL row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            borderRadius: 8,
            background: "#f9fafb",
            border: "1px solid #f3f4f6",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M4.5 5.5a2.5 2.5 0 003.5 0l1-1a2.5 2.5 0 00-3.5-3.5L4.5 2"
              stroke="#9ca3af"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M5.5 4.5a2.5 2.5 0 00-3.5 0l-1 1a2.5 2.5 0 003.5 3.5L5.5 8"
              stroke="#9ca3af"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
          <code style={{ fontSize: 10, color: COLORS.neutral400, fontFamily: "monospace" }}>
            /checkout
          </code>
        </div>

        {/* Submit button */}
        <button
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 12,
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontFamily,
            boxShadow: `0 4px 14px rgba(249,115,22,${0.3 + btnGlow * 0.3})`,
            transform: `scale(${1 + btnGlow * 0.02})`,
          }}
        >
          Send report →
        </button>
      </div>
    </div>
  );
};

// Success toast
const SuccessToast = ({ opacity }: { opacity: number }) => (
  <div
    style={{
      position: "absolute",
      bottom: 70,
      left: "50%",
      transform: `translateX(-50%) translateY(${interpolate(opacity, [0, 1], [20, 0])}px)`,
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 20px",
      borderRadius: 14,
      background: COLORS.white,
      border: "1.5px solid #e5e7eb",
      boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
      fontFamily,
      minWidth: 340,
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#dcfce7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6.5l2.5 2.5 5.5-5.5"
          stroke="#16a34a"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div style={{ flex: 1 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.neutral700 }}>
        Feedback received
      </span>
      <span style={{ fontSize: 12, color: COLORS.neutral400, marginLeft: 8 }}>
        landed in your QuickFeed dashboard
      </span>
    </div>
    <span style={{ fontSize: 11, color: COLORS.neutral300 }}>just now</span>
  </div>
);

export const Scene4BrowserDemo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Phase timing:
  // 0-30: Browser zooms in
  // 30-90: Cursor moves toward top of page (searching for contact)
  // 90-120: Cursor stops, "frustrated" pause  
  // 120-150: Keys flash (Ctrl+Shift+F)
  // 150-300: Widget opens, user types, fills, submits
  // 300-390: Success toast + browser fades

  // Browser entrance
  const browserSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const browserY = interpolate(browserSpring, [0, 1], [60, 0]);
  const browserOpacity = interpolate(browserSpring, [0, 1], [0, 1]);
  const browserScale = interpolate(browserSpring, [0, 1], [0.92, 1]);

  // Cursor movement phase 1: wandering (searching)
  const cursorX1 = interpolate(frame, [30, 90], [400, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  });
  const cursorY1 = interpolate(frame, [30, 90], [300, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  });

  // Cursor phase 2: stays still (frustrated)
  const cursorX = frame < 90 ? cursorX1 : frame < 150 ? 200 : interpolate(frame, [150, 180], [200, 380], { extrapolateRight: "clamp" });
  const cursorY = frame < 90 ? cursorY1 : frame < 150 ? 150 : interpolate(frame, [150, 180], [150, 320], { extrapolateRight: "clamp" });

  // Cursor opacity: visible during phases, fades during widget interaction
  const cursorOpacity = interpolate(frame, [150, 170], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Keyboard shortcut flash
  const keyFlash1 = interpolate(frame, [120, 130, 140, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Widget progress (0→1 over frames 150→300)
  const widgetProgress = interpolate(frame, [150, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Success toast
  const toastOpacity = interpolate(frame, [295, 315], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        opacity: sceneFade,
      }}
    >
      {/* Browser window */}
      <div
        style={{
          opacity: browserOpacity,
          transform: `translateY(${browserY}px) scale(${browserScale})`,
          width: 900,
          borderRadius: 16,
          border: "1.5px solid #e5e7eb",
          background: COLORS.white,
          boxShadow: "0 20px 80px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderBottom: "1px solid #f3f4f6",
            background: "#f9fafb",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f87171", opacity: 0.8 }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fbbf24", opacity: 0.8 }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80", opacity: 0.8 }} />
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: 8,
              padding: "5px 12px",
              borderRadius: 8,
              background: COLORS.white,
              border: "1px solid #e5e7eb",
              fontSize: 11,
              color: COLORS.neutral400,
              fontFamily: "monospace",
            }}
          >
            yourproduct.com/checkout
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: 28, minHeight: 420, position: "relative" }}>
          {/* Blurred/mocked page */}
          <div style={{ opacity: 0.35 }}>
            <div style={{ height: 22, background: COLORS.neutral300, borderRadius: 6, width: "40%", marginBottom: 12 }} />
            <div style={{ height: 12, background: COLORS.neutral200, borderRadius: 4, width: "70%", marginBottom: 8 }} />
            <div style={{ height: 12, background: COLORS.neutral200, borderRadius: 4, width: "55%", marginBottom: 20 }} />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, height: 48, background: COLORS.neutral200, borderRadius: 10 }} />
              <div style={{ width: 100, height: 48, background: "#fed7aa", borderRadius: 10 }} />
            </div>
            <div style={{ height: 12, background: COLORS.neutral200, borderRadius: 4, width: "45%", marginTop: 16, marginBottom: 8 }} />
            <div style={{ height: 12, background: COLORS.neutral200, borderRadius: 4, width: "35%", marginBottom: 8 }} />
          </div>

          {/* Cursor */}
          <Cursor x={cursorX} y={cursorY} opacity={cursorOpacity} />

          {/* Widget */}
          {frame >= 148 && <FeedbackWidget progress={widgetProgress} />}

          {/* Success toast */}
          {frame >= 295 && <SuccessToast opacity={toastOpacity} />}
        </div>
      </div>

      {/* Keyboard shortcut hint that flashes */}
      {frame >= 115 && frame <= 155 && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: keyFlash1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            borderRadius: 12,
            background: "rgba(249,115,22,0.08)",
            border: "1.5px solid #fed7aa",
            fontFamily,
          }}
        >
          {["Ctrl", "+", "⇧", "+", "F"].map((k, i) => (
            <span
              key={i}
              style={{
                fontSize: k === "+" ? 16 : 13,
                fontWeight: k === "+" ? 300 : 700,
                color: k === "+" ? COLORS.neutral300 : COLORS.orange,
                padding: k === "+" ? "0" : "4px 8px",
                borderRadius: k === "+" ? 0 : 6,
                background: k === "+" ? "transparent" : "#fff7ed",
                border: k === "+" ? "none" : "1px solid #fed7aa",
              }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
