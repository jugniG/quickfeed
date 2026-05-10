import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

export const Scene6Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Logo entrance — bouncy
  const logoSpring = spring({ frame, fps, config: { damping: 12, stiffness: 200 }, durationInFrames: 40 });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Brand name
  const nameSpring = spring({ frame: frame - 15, fps, config: { damping: 200 }, durationInFrames: 30 });
  const nameOpacity = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameY = interpolate(nameSpring, [0, 1], [20, 0]);

  // Tagline
  const taglineSpring = spring({ frame: frame - 35, fps, config: { damping: 200 }, durationInFrames: 30 });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // CTA button
  const ctaSpring = spring({ frame: frame - 55, fps, config: { damping: 200 }, durationInFrames: 30 });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
  const ctaY = interpolate(ctaSpring, [0, 1], [20, 0]);

  // URL
  const urlSpring = spring({ frame: frame - 70, fps, config: { damping: 200 }, durationInFrames: 25 });
  const urlOpacity = interpolate(urlSpring, [0, 1], [0, 1]);

  // Ambient glow pulse
  const glowA = interpolate(Math.sin((frame / fps) * 2 * Math.PI * 0.25), [-1, 1], [0.15, 0.28]);
  const glowB = interpolate(Math.sin((frame / fps) * 2 * Math.PI * 0.18 + 1), [-1, 1], [0.08, 0.18]);

  // Button hover effect (subtle pulsing glow)
  const btnGlow = interpolate(Math.sin((frame / fps) * 2 * Math.PI * 0.8), [-1, 1], [0.25, 0.45]);

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
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(251,146,60,${glowA}) 0%, rgba(249,115,22,0.06) 45%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(251,191,36,${glowB}) 0%, transparent 65%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Logo icon */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "linear-gradient(135deg, #f97316, #fbbf24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(249,115,22,0.35)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="white" strokeWidth="2.5" />
            <path d="M18 6C18 6 13 10 13 18s5 12 5 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 6C18 6 23 10 23 18s-5 12-5 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 18h28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          fontSize: 52,
          fontWeight: 900,
          color: COLORS.text,
          letterSpacing: "-2.5px",
          marginBottom: 14,
        }}
      >
        QuickFeed
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 20,
          fontWeight: 500,
          color: COLORS.neutral500,
          letterSpacing: "-0.3px",
          textAlign: "center",
          maxWidth: 600,
          lineHeight: 1.5,
          marginBottom: 36,
        }}
      >
        Don't let this happen with your product.
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: 14,
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            boxShadow: `0 8px 24px rgba(249,115,22,${btnGlow})`,
            letterSpacing: "-0.3px",
          }}
        >
          Start collecting feedback →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          fontSize: 14,
          color: COLORS.neutral300,
          fontWeight: 400,
          letterSpacing: "0.02em",
        }}
      >
        quickfeed.app
      </div>
    </AbsoluteFill>
  );
};
