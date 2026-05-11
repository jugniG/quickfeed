import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brandFontFamily, fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const FEEDBACKS = [
  {
    title: '"Checkout keeps resetting my cart..."',
    route: "/checkout",
    owner: "alex@acme.com",
    status: "Pending",
    accent: "#f97316",
  },
  {
    title: '"I could not find the export button anywhere."',
    route: "/dashboard/settings",
    owner: "Anonymous",
    status: "In review",
    accent: "#2563eb",
  },
  {
    title: '"Tooltip blocks the submit button on signup."',
    route: "/signup",
    owner: "sarah@startup.com",
    status: "Resolved",
    accent: "#8b5cf6",
  },
];

const StatCard = ({
  label,
  value,
  delay,
  frame,
  fps,
}: {
  label: string;
  value: string;
  delay: number;
  frame: number;
  fps: number;
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 170 },
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        flex: 1,
        padding: "18px 20px",
        borderRadius: 22,
        background: "#fff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 16px 32px rgba(15,23,42,0.06)",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [26, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", color: COLORS.neutral400 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 900, color: COLORS.ink, marginTop: 10, letterSpacing: "-0.05em" }}>{value}</div>
    </div>
  );
};

const FeedbackCard = ({
  index,
  frame,
  fps,
}: {
  index: number;
  frame: number;
  fps: number;
}) => {
  const item = FEEDBACKS[index];
  const progress = spring({
    frame: frame - (22 + index * 10),
    fps,
    config: { damping: 20, stiffness: 160 },
    durationInFrames: 22,
  });
  const isPrimary = index === 0;
  const barWidth = interpolate(frame, [54 + index * 8, 120 + index * 8], [22, isPrimary ? 92 : 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        padding: isPrimary ? "22px 24px" : "18px 20px",
        borderRadius: 24,
        background: isPrimary ? "linear-gradient(180deg, #fff 0%, #fff7ed 100%)" : "#fff",
        border: `1px solid ${isPrimary ? "#fed7aa" : "#e2e8f0"}`,
        boxShadow: isPrimary ? "0 20px 40px rgba(249,115,22,0.12)" : "0 12px 28px rgba(15,23,42,0.05)",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [34, 0])}px) scale(${interpolate(progress, [0, 1], [0.94, 1])})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", color: COLORS.neutral400 }}>LIVE FEEDBACK</div>
          <div
            style={{
              fontSize: isPrimary ? 24 : 20,
              lineHeight: 1.15,
              fontWeight: 800,
              color: COLORS.ink,
              letterSpacing: "-0.04em",
              marginTop: 10,
            }}
          >
            {item.title}
          </div>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            background: `${item.accent}18`,
            color: item.accent,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {item.status}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
        <div style={{ fontSize: 13, color: COLORS.neutral500, fontWeight: 700 }}>{item.owner}</div>
        <div style={{ fontSize: 12, color: COLORS.neutral400 }}>Route {item.route}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ height: 10, borderRadius: 999, background: "#e2e8f0" }}>
          <div
            style={{
              width: `${barWidth}%`,
              height: "100%",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${item.accent}, ${isPrimary ? "#fbbf24" : "#93c5fd"})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Scene5Dashboard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 150 },
    durationInFrames: 22,
  });
  const cameraScale = interpolate(frame, [0, 100, 180], [0.94, 1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scrollY = interpolate(frame, [86, 180], [0, 86], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #eef4ff 100%)",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 84% 12%, rgba(96,165,250,0.16), transparent 22%), radial-gradient(circle at 12% 82%, rgba(249,115,22,0.14), transparent 20%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "56px 74px",
          borderRadius: 34,
          border: "1px solid rgba(148,163,184,0.18)",
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 34px 80px rgba(15,23,42,0.12)",
          overflow: "hidden",
          transform: `scale(${cameraScale})`,
        }}
      >
        <div
          style={{
            height: 72,
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
            background: "rgba(255,255,255,0.92)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              Q
            </div>
            <div>
              <div style={{ fontSize: 18, color: COLORS.ink }}>
                <span style={{ fontFamily: brandFontFamily }}>QuickFeed</span>
                <span style={{ fontWeight: 700 }}> dashboard</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.neutral400, marginTop: 2 }}>Single source of input</div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.22)",
              color: COLORS.orange,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.12em",
            }}
          >
              LIVE FEEDBACK
            </div>
          </div>

        <div
          style={{
            padding: "26px 28px 34px",
            transform: `translateY(-${scrollY}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 18,
              opacity: header,
              transform: `translateY(${interpolate(header, [0, 1], [24, 0])}px)`,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.12em", color: COLORS.orange }}>ONE DASHBOARD</div>
              <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: "-0.06em", color: COLORS.ink, marginTop: 8 }}>
                Every report captured.
              </div>
            </div>

            <div
              style={{
                padding: "14px 18px",
                borderRadius: 20,
                background: "rgba(15,23,42,0.94)",
                color: "#f8fafc",
                minWidth: 220,
              }}
            >
              <div style={{ fontSize: 12, color: "#fdba74", letterSpacing: "0.12em", fontWeight: 800 }}>PROMISE</div>
              <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, marginTop: 8 }}>3 new</div>
              <div style={{ fontSize: 13, color: "rgba(248,250,252,0.7)", marginTop: 8 }}>Nothing scattered. Nothing missed.</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
            <StatCard label="SCREENSHOT PASTE" value="Cmd+V" delay={8} frame={frame} fps={fps} />
            <StatCard label="PAGE-AWARE" value="URL tagged" delay={16} frame={frame} fps={fps} />
            <StatCard label="IDENTIFY WHO" value="Real user" delay={24} frame={frame} fps={fps} />
          </div>

          <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
            {[0, 1, 2].map((index) => (
              <FeedbackCard key={index} index={index} frame={frame} fps={fps} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
