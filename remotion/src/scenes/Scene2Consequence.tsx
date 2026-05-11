import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const PulseChip = ({
  label,
  frame,
  fps,
  delay,
  top,
  left,
}: {
  label: string;
  frame: number;
  fps: number;
  delay: number;
  top: number;
  left: number;
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 150 },
    durationInFrames: 24,
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        padding: "12px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 18px 38px rgba(15,23,42,0.09)",
        color: COLORS.ink,
        fontFamily,
        fontSize: 16,
        fontWeight: 700,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [26, 0])}px) scale(${interpolate(progress, [0, 1], [0.84, 1])})`,
      }}
    >
      {label}
    </div>
  );
};

export const Scene2Consequence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
    durationInFrames: 28,
  });
  const subtitle = spring({
    frame: frame - 16,
    fps,
    config: { damping: 18, stiffness: 140 },
    durationInFrames: 24,
  });
  const ringScale = interpolate(frame, [0, 90], [0.8, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 40, 90], [0.22, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineSweep = interpolate(frame, [0, 90], [-220, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #fffaf5 0%, #fff2e8 48%, #fef3c7 100%)",
        overflow: "hidden",
        fontFamily,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 92,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 68%)",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(110deg, transparent 0%, transparent 44%, rgba(255,255,255,0.75) 50%, transparent 56%, transparent 100%)`,
          transform: `translateX(${lineSweep}px)`,
          opacity: 0.9,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 98,
          left: 104,
          padding: "10px 16px",
          borderRadius: 999,
          background: "rgba(15,23,42,0.06)",
          color: COLORS.orange,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.14em",
        }}
      >
        THE PROBLEM
      </div>

      <div
        style={{
          position: "absolute",
          left: 104,
          top: 188,
          maxWidth: 700,
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [40, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 74,
            lineHeight: 0.94,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: COLORS.ink,
          }}
        >
          Don't let this
        </div>
        <div
          style={{
            fontSize: 74,
            lineHeight: 0.94,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            background: "linear-gradient(90deg, #f97316 0%, #fb7185 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: 6,
          }}
        >
          happen to your product.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 104,
          top: 390,
          maxWidth: 620,
          color: "rgba(15,23,42,0.72)",
          fontSize: 23,
          lineHeight: 1.4,
          opacity: subtitle,
          transform: `translateY(${interpolate(subtitle, [0, 1], [28, 0])}px)`,
        }}
      >
        No feedback button. No obvious email. No Discord link. Users hit a broken flow, shrug, and leave.
      </div>

      <PulseChip label="No feedback button" frame={frame} fps={fps} delay={10} top={130} left={864} />
      <PulseChip label="No obvious email" frame={frame} fps={fps} delay={18} top={232} left={944} />
      <PulseChip label="No Discord link" frame={frame} fps={fps} delay={28} top={350} left={846} />
      <PulseChip label="Users leave silently" frame={frame} fps={fps} delay={36} top={474} left={926} />

      <div
        style={{
          position: "absolute",
          right: 124,
          bottom: 98,
          width: 248,
          padding: "20px 22px",
          borderRadius: 24,
          background: "rgba(15,23,42,0.94)",
          color: "#fff7ed",
          boxShadow: "0 22px 42px rgba(15,23,42,0.18)",
        }}
      >
        <div style={{ fontSize: 13, letterSpacing: "0.12em", color: "#fdba74" }}>WHY QUICKFEED</div>
        <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.02, marginTop: 10 }}>Single source of input.</div>
        <div style={{ fontSize: 16, lineHeight: 1.45, color: "rgba(255,247,237,0.8)", marginTop: 12 }}>
          Zero friction. One dashboard.
        </div>
      </div>
    </AbsoluteFill>
  );
};
