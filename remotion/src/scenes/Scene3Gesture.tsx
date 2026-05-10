import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const Key = ({ label, delay, frame, fps }: { label: string; delay: number; frame: number; fps: number }) => {
  const keySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 250 },
    durationInFrames: 25,
  });
  const scale = interpolate(keySpring, [0, 1], [0.5, 1]);
  const opacity = interpolate(keySpring, [0, 1], [0, 1]);
  const y = interpolate(keySpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: label.length > 2 ? 80 : 64,
        height: 64,
        borderRadius: 12,
        background: "linear-gradient(180deg, #fff 0%, #f9fafb 100%)",
        border: "2px solid #e5e7eb",
        boxShadow: "0 4px 0 #d1d5db, 0 2px 8px rgba(0,0,0,0.08)",
        fontSize: label.length > 2 ? 14 : 20,
        fontWeight: 700,
        color: COLORS.neutral700,
        fontFamily,
        letterSpacing: label.length > 2 ? "-0.3px" : "0",
        padding: "0 12px",
      }}
    >
      {label}
    </div>
  );
};

export const Scene3Gesture = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Label above keys
  const labelSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);
  const labelY = interpolate(labelSpring, [0, 1], [20, 0]);

  // Plus signs fade in
  const plusOpacity1 = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const plusOpacity2 = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });

  // Subtitle — after keys appear
  const subSpring = spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 30 });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  // Glow pulse on the combo
  const glowSize = interpolate(
    Math.sin((frame / fps) * 2 * Math.PI * 0.5),
    [-1, 1],
    [20, 40]
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
      {/* Subtle center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)`,
          filter: `blur(${glowSize}px)`,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.orange,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        Universal Feedback Shortcut
      </div>

      {/* Keys row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Key label="Ctrl" delay={10} frame={frame} fps={fps} />
        <div style={{ opacity: plusOpacity1, fontSize: 28, fontWeight: 300, color: COLORS.neutral300 }}>+</div>
        <Key label="⇧" delay={20} frame={frame} fps={fps} />
        <div style={{ opacity: plusOpacity2, fontSize: 28, fontWeight: 300, color: COLORS.neutral300 }}>+</div>
        <Key label="F" delay={30} frame={frame} fps={fps} />
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 40,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.5px" }}>
          Press anywhere on any page
        </div>
        <div style={{ fontSize: 16, color: COLORS.neutral400, fontWeight: 400, marginTop: 8 }}>
          The feedback widget opens instantly — no hunting for a contact form.
        </div>
      </div>
    </AbsoluteFill>
  );
};
