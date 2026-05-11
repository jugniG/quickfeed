import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brandFontFamily, displayFontFamily, fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const OrbitChip = ({
  label,
  top,
  left,
  frame,
  delay,
}: {
  label: string;
  top: number;
  left: number;
  frame: number;
  delay: number;
}) => {
  const float = interpolate(frame, [0, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bob = Math.sin((frame + delay) / 14) * 8;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        padding: "12px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#f8fafc",
        fontSize: 14,
        fontWeight: 700,
        transform: `translateY(${(1 - float) * 24 + bob}px)`,
        opacity: float,
      }}
    >
      {label}
    </div>
  );
};

export const Scene6Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
    durationInFrames: 18,
  });
  const title = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 120 },
    durationInFrames: 22,
  });
  const subtitle = spring({
    frame: frame - 22,
    fps,
    config: { damping: 18, stiffness: 140 },
    durationInFrames: 20,
  });
  const cta = spring({
    frame: frame - 34,
    fps,
    config: { damping: 18, stiffness: 170 },
    durationInFrames: 18,
  });
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [0.3, 0.52]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #090d1c 0%, #131a2e 46%, #26172c 100%)",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -180,
          background: `radial-gradient(circle at 50% 44%, rgba(249,115,22,${glow * 0.36}), transparent 24%),
            radial-gradient(circle at 28% 72%, rgba(96,165,250,0.18), transparent 22%),
            radial-gradient(circle at 76% 20%, rgba(251,191,36,0.16), transparent 20%)`,
        }}
      />

      <OrbitChip label="Universal gesture" top={138} left={126} frame={frame} delay={6} />
      <OrbitChip label="Page-aware by default" top={150} left={920} frame={frame} delay={10} />
      <OrbitChip label="One dashboard" top={534} left={200} frame={frame} delay={14} />
      <OrbitChip label="Zero friction" top={514} left={972} frame={frame} delay={18} />

      <div
        style={{
          position: "absolute",
          top: 112,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 16px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fdba74",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.16em",
          opacity: badge,
        }}
      >
        QUICKFEED
      </div>

      <div
        style={{
          position: "absolute",
          top: 188,
          width: "100%",
          textAlign: "center",
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [32, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 84,
            lineHeight: 0.92,
            fontWeight: 800,
            letterSpacing: "-0.07em",
            color: "#f8fafc",
            fontFamily: displayFontFamily,
          }}
        >
          It's time to capture
        </div>
        <div
          style={{
            fontSize: 84,
            lineHeight: 0.92,
            fontWeight: 800,
            letterSpacing: "-0.07em",
            marginTop: 10,
            background: "linear-gradient(90deg, #60a5fa 0%, #f97316 54%, #fbbf24 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: displayFontFamily,
          }}
        >
          every report.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 414,
          width: "100%",
          textAlign: "center",
          opacity: subtitle,
          transform: `translateY(${interpolate(subtitle, [0, 1], [24, 0])}px)`,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            fontSize: 24,
            lineHeight: 1.45,
            color: "rgba(248,250,252,0.72)",
          }}
        >
          Give your users one gesture, one moment, one place to tell you everything.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 500,
          width: "100%",
          textAlign: "center",
          color: "#f8fafc",
          fontSize: 34,
          letterSpacing: "-0.04em",
          fontFamily: brandFontFamily,
          opacity: subtitle,
        }}
      >
        QuickFeed
      </div>

      <div
        style={{
          position: "absolute",
          top: 566,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: cta,
          transform: `translateY(${interpolate(cta, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: "18px 30px",
            borderRadius: 22,
            background: "linear-gradient(90deg, #f97316 0%, #fbbf24 100%)",
            color: "#fff",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            boxShadow: `0 20px 42px rgba(249,115,22,${0.28 + glow * 0.18})`,
          }}
        >
          {"Add to your product ->"}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 84,
          width: "100%",
          textAlign: "center",
          fontSize: 16,
          color: "rgba(248,250,252,0.5)",
          letterSpacing: "0.22em",
          fontWeight: 700,
        }}
      >
        WE DON'T LET YOU MISS A SINGLE INCONVENIENCE OF YOUR USERS
      </div>
    </AbsoluteFill>
  );
};
