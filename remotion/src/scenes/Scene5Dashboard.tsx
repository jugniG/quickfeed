import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const FEEDBACKS = [
  {
    message: "Checkout keeps resetting my cart...",
    email: "user@example.com",
    url: "/checkout",
    status: "pending",
    time: "just now",
    isNew: true,
  },
  {
    message: "The dark mode button isn't working on mobile.",
    email: "Anonymous",
    url: "/settings",
    status: "inprogress",
    time: "2h ago",
    isNew: false,
  },
  {
    message: "Filter dropdown doesn't close after selection.",
    email: "sarah@acme.com",
    url: "/dashboard",
    status: "unassigned",
    time: "5h ago",
    isNew: false,
  },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  pending: { label: "Pending", bg: "#fffbeb", text: "#d97706", dot: "#f59e0b" },
  inprogress: { label: "In Progress", bg: "#eff6ff", text: "#2563eb", dot: "#3b82f6" },
  unassigned: { label: "Unassigned", bg: "#f9fafb", text: "#6b7280", dot: "#9ca3af" },
  completed: { label: "Completed", bg: "#f0fdf4", text: "#16a34a", dot: "#22c55e" },
};

const FeedbackCardUI = ({
  feedback,
  delay,
  frame,
  fps,
  highlighted,
}: {
  feedback: typeof FEEDBACKS[0];
  delay: number;
  frame: number;
  fps: number;
  highlighted: boolean;
}) => {
  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });
  const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // New badge pulse
  const badgePulse = interpolate(
    Math.sin((frame / fps) * 2 * Math.PI * 1.2),
    [-1, 1],
    [0.6, 1]
  );

  const cfg = STATUS_CONFIG[feedback.status] ?? STATUS_CONFIG.unassigned;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        background: COLORS.white,
        borderRadius: 16,
        border: `1.5px solid ${highlighted ? "#fed7aa" : "#e5e7eb"}`,
        padding: "16px 18px",
        boxShadow: highlighted
          ? "0 4px 20px rgba(249,115,22,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        fontFamily,
      }}
    >
      {/* New indicator */}
      {feedback.isNew && (
        <div
          style={{
            position: "absolute",
            top: 14,
            left: -1,
            width: 3,
            height: 32,
            borderRadius: "0 3px 3px 0",
            background: "linear-gradient(180deg, #f97316, #fbbf24)",
            opacity: badgePulse,
          }}
        />
      )}

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, color: COLORS.neutral400 }}>{feedback.time}</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 999,
            background: cfg.bg,
            border: `1px solid ${cfg.dot}40`,
            fontSize: 11.5,
            fontWeight: 600,
            color: cfg.text,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: cfg.dot,
              flexShrink: 0,
            }}
          />
          {cfg.label}
        </span>
      </div>

      {/* Message */}
      <p style={{ fontSize: 13.5, color: COLORS.neutral800, lineHeight: 1.65, marginBottom: 12 }}>
        "{feedback.message}"
      </p>

      {/* Meta */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 11.5, color: COLORS.neutral400, display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="3.5" r="2.2" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1 10c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          {feedback.email}
        </span>
        <code
          style={{
            fontSize: 10.5,
            background: "#f3f4f6",
            color: COLORS.neutral500,
            padding: "2px 6px",
            borderRadius: 6,
            fontFamily: "monospace",
          }}
        >
          {feedback.url}
        </code>
      </div>
    </div>
  );
};

export const Scene5Dashboard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Header entrance
  const headerSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const headerY = interpolate(headerSpring, [0, 1], [30, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  // Notification dot pulse
  const dotPulse = interpolate(
    Math.sin((frame / fps) * 2 * Math.PI * 0.8),
    [-1, 1],
    [0.7, 1]
  );

  // Scroll down to reveal more cards
  const scrollY = interpolate(frame, [120, 220], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        fontFamily,
        opacity: sceneFade,
        overflow: "hidden",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          background: COLORS.white,
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #f97316, #fbbf24)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.3" />
              <path d="M7 2C7 2 5 4 5 7s2 5 2 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M7 2C7 2 9 4 9 7s-2 5-2 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M1.5 7h11" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>QuickFeed</span>
        </div>
        {/* Notification badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 999,
            background: "#fff7ed",
            border: "1.5px solid #fed7aa",
            fontSize: 12,
            fontWeight: 600,
            color: "#d97706",
            opacity: dotPulse,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f97316" }} />
          New feedback received!
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "28px 24px",
            transform: `translateY(-${scrollY}px)`,
          }}
        >
          {/* Page header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
              opacity: headerOpacity,
              transform: `translateY(${headerY}px)`,
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.5px" }}>
                yourproduct.com
              </div>
              <div style={{ fontSize: 13, color: COLORS.neutral400, marginTop: 2 }}>
                3 responses · updated just now
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 10,
                background: "linear-gradient(90deg, #f97316, #fbbf24)",
                color: "#fff",
                fontSize: 12.5,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 300 }}>+</span>
              All feedback live
            </div>
          </div>

          {/* Feedback cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FEEDBACKS.map((fb, i) => (
              <FeedbackCardUI
                key={i}
                feedback={fb}
                delay={10 + i * 15}
                frame={frame}
                fps={fps}
                highlighted={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
