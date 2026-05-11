import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const Keycap = ({
  label,
  frame,
  fps,
  delay,
  width,
}: {
  label: string;
  frame: number;
  fps: number;
  delay: number;
  width: number;
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 220 },
    durationInFrames: 22,
  });

  return (
    <div
      style={{
        width,
        height: 92,
        borderRadius: 24,
        background: "linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)",
        border: "1px solid rgba(148,163,184,0.34)",
        boxShadow: "0 24px 40px rgba(15,23,42,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.ink,
        fontSize: label.length > 1 ? 26 : 34,
        fontWeight: 800,
        transform: `translateY(${interpolate(progress, [0, 1], [38, 0])}px) scale(${interpolate(progress, [0, 1], [0.72, 1])})`,
        opacity: progress,
      }}
    >
      {label}
    </div>
  );
};

export const Scene3Gesture = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180 },
    durationInFrames: 20,
  });
  const subtitle = spring({
    frame: frame - 24,
    fps,
    config: { damping: 18, stiffness: 150 },
    durationInFrames: 20,
  });
  const burst = interpolate(frame, [16, 44, 90], [0.4, 1, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const streakOpacity = interpolate(frame, [0, 18, 40], [0, 0.6, 0.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #eef4ff 0%, #f8fafc 42%, #fff7ed 100%)",
        overflow: "hidden",
        fontFamily,
      }}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 200 + index * 120,
            top: 120 - index * 10,
            width: 2,
            height: 420,
            opacity: streakOpacity,
            transform: "rotate(24deg)",
            background: "linear-gradient(180deg, transparent, rgba(249,115,22,0.35), transparent)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(96,165,250,0.12) 38%, transparent 68%)",
            transform: `scale(${burst})`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 92,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 16px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(148,163,184,0.25)",
          color: COLORS.orange,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.14em",
        }}
      >
        UNIVERSAL GESTURE
      </div>

      <div
        style={{
          position: "absolute",
          top: 164,
          width: "100%",
          textAlign: "center",
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [28, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 900, letterSpacing: "-0.06em", color: COLORS.ink }}>
          Cmd+Shift+F
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            marginTop: 4,
            background: "linear-gradient(90deg, #2563eb 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          should trigger feedback.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 330,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Keycap label="Cmd" frame={frame} fps={fps} delay={10} width={164} />
        <div style={{ fontSize: 34, color: "rgba(15,23,42,0.22)", fontWeight: 700, marginTop: 4 }}>+</div>
        <Keycap label="Shift" frame={frame} fps={fps} delay={18} width={164} />
        <div style={{ fontSize: 34, color: "rgba(15,23,42,0.22)", fontWeight: 700, marginTop: 4 }}>+</div>
        <Keycap label="F" frame={frame} fps={fps} delay={26} width={92} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 108,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          borderRadius: 22,
          background: "rgba(15,23,42,0.92)",
          color: "#f8fafc",
          minWidth: 720,
          justifyContent: "space-between",
          opacity: subtitle,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em" }}>Building a universal gesture</div>
          <div style={{ fontSize: 15, color: "rgba(248,250,252,0.72)", marginTop: 6 }}>
            On every product, Cmd+Shift+F should trigger a feedback input.
          </div>
        </div>
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(249,115,22,0.14)",
            border: "1px solid rgba(249,115,22,0.3)",
            color: "#fdba74",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          ZERO FRICTION
        </div>
      </div>
    </AbsoluteFill>
  );
};
