import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in the whole scene
  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Line 1: "Have you ever tried to report a broken experience"
  const line1Spring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const line1Y = interpolate(line1Spring, [0, 1], [40, 0]);
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1]);

  // Line 2: "— and couldn't find the way?"  starts at frame 18
  const line2Spring = spring({ frame: frame - 18, fps, config: { damping: 200 }, durationInFrames: 30 });
  const line2Y = interpolate(line2Spring, [0, 1], [40, 0]);
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1]);

  // Orange glow pulse
  const glowPulse = interpolate(
    Math.sin((frame / fps) * 2 * Math.PI * 0.3),
    [-1, 1],
    [0.15, 0.25]
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        opacity: sceneFade,
      }}
    >
      {/* Ambient orange blob top-right */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(251,146,60,${glowPulse}) 0%, rgba(249,115,22,0.08) 45%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      {/* Ambient blob bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1000,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          Have you ever tried to report a broken experience
        </div>

        {/* Line 2 with gradient */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginTop: 4,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #f97316, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            — and couldn't find the way?
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
