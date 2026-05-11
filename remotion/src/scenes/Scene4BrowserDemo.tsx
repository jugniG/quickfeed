import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../components/fonts";
import { COLORS } from "../components/theme";

const Cursor = ({ x, y, opacity }: { x: number; y: number; opacity: number }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      transform: "translate(-6px, -6px)",
      pointerEvents: "none",
      zIndex: 30,
    }}
  >
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
      <path
        d="M5 3v23l5.4-5.2 4.5 8.6 3.1-1.7-4.2-8.1h8.2L5 3Z"
        fill="white"
        stroke="#0f172a"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Hotspot = ({
  top,
  left,
  width,
  delay,
  frame,
  fps,
  label,
}: {
  top: number;
  left: number;
  width: number;
  delay: number;
  frame: number;
  fps: number;
  label: string;
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 150 },
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        padding: "10px 12px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(249,115,22,0.2)",
        boxShadow: "0 16px 30px rgba(15,23,42,0.1)",
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.ink,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      {label}
    </div>
  );
};

const FeedbackWidget = ({ progress }: { progress: number }) => {
  const panelY = interpolate(progress, [0, 1], [70, 0]);
  const panelScale = interpolate(progress, [0, 1], [0.88, 1]);
  const panelOpacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fullText = "Checkout keeps resetting my cart...";
  const typed = Math.floor(
    interpolate(progress, [0.18, 0.68], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const pulse = interpolate(progress, [0.76, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 36,
        top: 88,
        width: 328,
        borderRadius: 26,
        border: "1px solid rgba(249,115,22,0.28)",
        background: "rgba(255,255,255,0.98)",
        boxShadow: "0 30px 80px rgba(249,115,22,0.22), 0 18px 40px rgba(15,23,42,0.14)",
        overflow: "hidden",
        opacity: panelOpacity,
        transform: `translateY(${panelY}px) scale(${panelScale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 18px",
          background: "linear-gradient(90deg, #fff7ed 0%, #eff6ff 100%)",
          borderBottom: "1px solid rgba(226,232,240,0.8)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          Q
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.ink }}>What went wrong?</div>
          <div style={{ fontSize: 12, color: COLORS.neutral500, marginTop: 2 }}>Help us fix it in seconds</div>
        </div>
      </div>

      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["Bug", "Confusing", "Idea"].map((chip, index) => (
            <div
              key={chip}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                background: index === 0 ? COLORS.orange : "#f8fafc",
                border: index === 0 ? "1px solid #ea580c" : "1px solid #e2e8f0",
                color: index === 0 ? "#fff" : COLORS.neutral500,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div
          style={{
            minHeight: 88,
            padding: "14px 14px 12px",
            borderRadius: 18,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            fontSize: 14,
            lineHeight: 1.55,
            color: COLORS.ink,
          }}
        >
          {fullText.slice(0, typed)}
          {typed < fullText.length ? (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 16,
                background: COLORS.orange,
                marginLeft: 2,
                verticalAlign: "middle",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            padding: "10px 12px",
            borderRadius: 16,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: COLORS.neutral500,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.blue,
            }}
          />
          Page-aware by default
        </div>

        <div
          style={{
            width: "100%",
            borderRadius: 18,
            background: "linear-gradient(90deg, #f97316 0%, #fbbf24 100%)",
            color: "#fff",
            padding: "14px 16px",
            fontSize: 14,
            fontWeight: 800,
            boxShadow: `0 14px 28px rgba(249,115,22,${0.24 + pulse * 0.2})`,
            transform: `scale(${1 + pulse * 0.025})`,
            textAlign: "center",
          }}
        >
          {"Send report ->"}
        </div>
      </div>
    </div>
  );
};

const SuccessPanel = ({ progress }: { progress: number }) => (
  <div
    style={{
      position: "absolute",
      left: 48,
      bottom: 32,
      padding: "16px 18px",
      borderRadius: 18,
      background: "rgba(15,23,42,0.94)",
      color: "#f8fafc",
      minWidth: 420,
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px) scale(${interpolate(progress, [0, 1], [0.94, 1])})`,
      boxShadow: "0 20px 48px rgba(15,23,42,0.24)",
    }}
  >
    <div style={{ fontSize: 13, color: "#fdba74", letterSpacing: "0.12em", fontWeight: 800 }}>FEEDBACK RECEIVED</div>
    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.05, marginTop: 10 }}>Landed in your QuickFeed dashboard.</div>
    <div style={{ fontSize: 14, color: "rgba(248,250,252,0.7)", marginTop: 10 }}>
      Screenshot, route, and context are all attached to the report.
    </div>
  </div>
);

export const Scene4BrowserDemo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
    durationInFrames: 26,
  });
  const cameraScale = interpolate(frame, [0, 90, 190, 255], [0.86, 1, 1.04, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraX = interpolate(frame, [0, 110, 255], [-40, 0, -22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraY = interpolate(frame, [0, 120, 255], [24, -8, -16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraRotate = interpolate(frame, [0, 255], [-4, -1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorX = interpolate(frame, [30, 70, 106, 128, 150], [360, 560, 460, 700, 906], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [30, 70, 106, 128, 150], [318, 216, 300, 188, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOpacity = interpolate(frame, [144, 160], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const widgetProgress = interpolate(frame, [140, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const successProgress = interpolate(frame, [202, 234], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shortcutFlash = interpolate(frame, [102, 120, 136, 152], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #eaf2ff 0%, #fff7ed 100%)",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 15% 20%, rgba(96,165,250,0.22), transparent 22%), radial-gradient(circle at 82% 74%, rgba(249,115,22,0.18), transparent 24%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 70,
          color: COLORS.ink,
          opacity: intro,
          transform: `translateY(${interpolate(intro, [0, 1], [24, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.14em", color: COLORS.orange }}>LIVE DEMO</div>
        <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 0.94, letterSpacing: "-0.06em", marginTop: 10 }}>
          See exactly what your
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: "-0.06em",
            background: "linear-gradient(90deg, #2563eb 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: 4,
          }}
        >
          users will see.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 106,
          top: 174,
          width: 1080,
          height: 470,
          borderRadius: 34,
          border: "1px solid rgba(148,163,184,0.22)",
          background: "rgba(255,255,255,0.84)",
          boxShadow: "0 36px 80px rgba(15,23,42,0.16)",
          overflow: "hidden",
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale}) rotate(${cameraRotate}deg)`,
        }}
      >
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 20px",
            background: "linear-gradient(180deg, rgba(248,250,252,0.96), rgba(241,245,249,0.92))",
            borderBottom: "1px solid rgba(226,232,240,0.9)",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fb7185" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fbbf24" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80" }} />
          </div>
          <div
            style={{
              marginLeft: 6,
              flex: 1,
              padding: "10px 16px",
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #e2e8f0",
              color: COLORS.neutral500,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            yourproduct.com/checkout
          </div>
        </div>

        <div style={{ position: "absolute", inset: "60px 0 0 0", padding: 32 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 26, width: "36%", borderRadius: 8, background: "#dbeafe" }} />
              <div style={{ height: 14, width: "54%", borderRadius: 8, background: "#e2e8f0", marginTop: 14 }} />
              <div style={{ height: 14, width: "44%", borderRadius: 8, background: "#e2e8f0", marginTop: 10 }} />
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                <div style={{ flex: 1, height: 66, borderRadius: 18, background: "#f8fafc", border: "1px solid #e2e8f0" }} />
                <div style={{ width: 180, height: 66, borderRadius: 18, background: "#fff7ed", border: "1px solid #fed7aa" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 28 }}>
                {[0, 1, 2, 3].map((item) => (
                  <div
                    key={item}
                    style={{
                      height: 112,
                      borderRadius: 22,
                      background: item === 1 ? "linear-gradient(135deg, #eff6ff, #dbeafe)" : "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                width: 240,
                borderRadius: 24,
                background: "linear-gradient(180deg, rgba(15,23,42,0.96), rgba(30,41,59,0.96))",
                padding: 18,
                color: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 13, letterSpacing: "0.12em", color: "#93c5fd", fontWeight: 800 }}>SIGNALS</div>
              <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
                {[
                    { label: "Screenshot", value: "Paste ready" },
                    { label: "Page URL", value: "/checkout" },
                    { label: "Identity", value: "Trackable" },
                  ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, color: "rgba(248,250,252,0.55)", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Hotspot top={104} left={108} width={170} delay={30} frame={frame} fps={fps} label="Users hesitate here" />
          <Hotspot top={214} left={254} width={170} delay={44} frame={frame} fps={fps} label="Confusing payment state" />
          <Hotspot top={274} left={98} width={166} delay={56} frame={frame} fps={fps} label="Bug report trigger" />

          <Cursor x={cursorX} y={cursorY} opacity={cursorOpacity} />
          {frame >= 136 ? <FeedbackWidget progress={widgetProgress} /> : null}
          {frame >= 204 ? <SuccessPanel progress={successProgress} /> : null}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 18px",
          borderRadius: 18,
          background: "rgba(15,23,42,0.94)",
          border: "1px solid rgba(249,115,22,0.2)",
          opacity: shortcutFlash,
        }}
      >
        {["Cmd", "+", "Shift", "+", "F"].map((key) => (
          <div
            key={key}
            style={{
              padding: key === "+" ? 0 : "8px 12px",
              borderRadius: 12,
              background: key === "+" ? "transparent" : "rgba(255,255,255,0.08)",
              color: key === "+" ? "rgba(255,255,255,0.5)" : "#f8fafc",
              fontSize: key === "+" ? 18 : 14,
              fontWeight: 800,
              letterSpacing: key === "+" ? "0" : "0.04em",
            }}
          >
            {key}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
