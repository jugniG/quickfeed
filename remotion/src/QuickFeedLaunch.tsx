import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Consequence } from "./scenes/Scene2Consequence";
import { Scene3Gesture } from "./scenes/Scene3Gesture";
import { Scene4BrowserDemo } from "./scenes/Scene4BrowserDemo";
import { Scene5Dashboard } from "./scenes/Scene5Dashboard";
import { Scene6Outro } from "./scenes/Scene6Outro";

// Scene durations (frames @ 30fps)
// S1: 4s=120, S2: 5s=150, S3: 5s=150, S4: 12s=360, S5: 10s=300, S6: 9s=270
// Transitions: 5 * 15 = 75
// Total: 120+150+150+360+300+270-75 = 1275 (close to 1350 — pad S4 a bit)

const TRANS = 15;

export const QuickFeedLaunch = () => {
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene2Consequence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene3Gesture />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={390}>
          <Scene4BrowserDemo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene5Dashboard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Scene6Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
