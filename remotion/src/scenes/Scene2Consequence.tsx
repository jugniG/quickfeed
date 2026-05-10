import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

export const Scene2Consequence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Main text entrance
  const textSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 35 });
  const textY = interpolate(textSpring, [0, 1], [50, 0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Sad face / X icon — appears at frame 20
  const iconSpring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 200 }, durationInFrames: 30 });
  const iconScale = interpolate(iconSpring, [0, 1], [0.4, 1]);
  const iconOpacity = interpolate(iconSpring, [0, 1], [0, 1]);

  // Subtitle line
  const subSpring = spring({ frame: frame - 35, fps, config: { damping: 200 }, durationInFrames: 25 });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 60%, #fff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        opacity: sceneFade,
      }}
    >
      {/* Icon */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fee2e2, #fecaca)",
            border: "2px solid #fca5a5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" stroke="#ef4444" strokeWidth="2" />
            <path d="M11 11l14 14M25 11L11 25" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Main text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          maxWidth: 900,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: "-2.5px",
            lineHeight: 1.1,
          }}
        >
          They just leave.
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-2.5px",
            lineHeight: 1.1,
            marginTop: 4,
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Silently.
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 28,
          fontSize: 20,
          color: COLORS.neutral500,
          fontWeight: 500,
          letterSpacing: "-0.3px",
          textAlign: "center",
        }}
      >
        Don't let this happen with your product.
      </div>
    </AbsoluteFill>
  );
};
