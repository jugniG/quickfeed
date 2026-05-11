import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brandFontFamily, fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const FloatingCard = ({
  delay,
  frame,
  fps,
  top,
  left,
  width,
  label,
}: {
  delay: number;
  frame: number;
  fps: number;
  top: number;
  left: number;
  width: number;
  label: string;
}) => {
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 },
    durationInFrames: 26,
  });

  const x = interpolate(entrance, [0, 1], [80, 0]);
  const y = interpolate(entrance, [0, 1], [20, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        padding: "14px 16px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(9, 13, 28, 0.74)",
        backdropFilter: "blur(12px)",
        color: "rgba(255,255,255,0.92)",
        fontFamily,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        transform: `translate(${x}px, ${y}px)`,
        opacity,
        boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
      }}
    >
      {label}
    </div>
  );
};

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const backgroundShift = interpolate(frame, [0, 84], [0, 1]);
  const badgeEntrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
    durationInFrames: 20,
  });
  const titleA = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, stiffness: 140 },
    durationInFrames: 24,
  });
  const titleB = spring({
    frame: frame - 18,
    fps,
    config: { damping: 18, stiffness: 140 },
    durationInFrames: 24,
  });
  const footer = spring({
    frame: frame - 32,
    fps,
    config: { damping: 20, stiffness: 160 },
    durationInFrames: 22,
  });

  const stripeOffset = interpolate(frame, [0, 84], [-140, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.ink} 0%, #11172d 45%, #1d1630 100%)`,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -200,
          background: `radial-gradient(circle at ${20 + backgroundShift * 30}% 20%, rgba(249,115,22,0.34), transparent 28%),
            radial-gradient(circle at 78% 72%, rgba(96,165,250,0.22), transparent 24%),
            radial-gradient(circle at 50% 60%, rgba(251,191,36,0.12), transparent 28%)`,
        }}
      />

      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 100 + index * 132,
            left: -120 + stripeOffset - index * 80,
            width: 420,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "rotate(-16deg)",
          }}
        />
      ))}

      <FloatingCard delay={14} frame={frame} fps={fps} top={112} left={880} width={250} label="No feedback button" />
      <FloatingCard delay={20} frame={frame} fps={fps} top={188} left={918} width={224} label="No obvious email" />
      <FloatingCard delay={26} frame={frame} fps={fps} top={500} left={120} width={258} label="Users shrug and leave" />

      <div
        style={{
          position: "absolute",
          inset: "86px 92px 76px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32,
          background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 124,
          left: 112,
          padding: "10px 16px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          color: "#f8fafc",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.14em",
          opacity: badgeEntrance,
          transform: `translateY(${interpolate(badgeEntrance, [0, 1], [16, 0])}px)`,
        }}
      >
          BUILDING A UNIVERSAL GESTURE
        </div>

      <div
        style={{
          position: "absolute",
          left: 112,
          top: 206,
          maxWidth: 760,
        }}
      >
        <div
          style={{
            fontSize: 74,
            lineHeight: 0.95,
            fontWeight: 900,
            color: "#f8fafc",
            letterSpacing: "-0.06em",
            opacity: titleA,
            transform: `translateY(${interpolate(titleA, [0, 1], [42, 0])}px)`,
          }}
        >
          Have you ever tried to
        </div>
        <div
          style={{
            fontSize: 74,
            lineHeight: 0.95,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            marginTop: 10,
            opacity: titleB,
            transform: `translateY(${interpolate(titleB, [0, 1], [42, 0])}px)`,
            background: "linear-gradient(90deg, #f97316 0%, #fbbf24 52%, #fb7185 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          report a broken experience?
        </div>
        <div
          style={{
            fontSize: 38,
            lineHeight: 1.02,
            fontWeight: 800,
            color: "rgba(248,250,252,0.86)",
            letterSpacing: "-0.05em",
            marginTop: 18,
            opacity: titleB,
            transform: `translateY(${interpolate(titleB, [0, 1], [42, 0])}px)`,
          }}
        >
          And couldn't find the way?
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 114,
          bottom: 110,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: footer,
          transform: `translateY(${interpolate(footer, [0, 1], [24, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            borderRadius: 18,
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.32)",
            color: "#fff7ed",
            minWidth: 176,
          }}
        >
          <div style={{ fontSize: 14, letterSpacing: "0.12em", color: "#fdba74" }}>SHORTCUT</div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, marginTop: 10 }}>Cmd+Shift+F</div>
        </div>
        <div style={{ maxWidth: 520, color: "rgba(255,255,255,0.78)", fontSize: 24, lineHeight: 1.35 }}>
          We don't let you miss a single inconvenience of your users.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 108,
          bottom: 96,
          color: "rgba(248,250,252,0.9)",
          fontSize: 26,
          fontFamily: brandFontFamily,
          letterSpacing: "-0.04em",
        }}
      >
        QuickFeed
      </div>
    </AbsoluteFill>
  );
};
