import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Consequence } from "./scenes/Scene2Consequence";
import { Scene3Gesture } from "./scenes/Scene3Gesture";
import { Scene4BrowserDemo } from "./scenes/Scene4BrowserDemo";
import { Scene5Dashboard } from "./scenes/Scene5Dashboard";
import { Scene6Outro } from "./scenes/Scene6Outro";

const TRANSITION_FRAMES = 10;

export const QUICKFEED_LAUNCH_FRAMES = 784;

export const QuickFeedLaunch = () => {
  return (
    <AbsoluteFill style={{ background: "#0b1020" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={84}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={90}>
          <Scene2Consequence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={90}>
          <Scene3Gesture />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={255}>
          <Scene4BrowserDemo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene5Dashboard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={135}>
          <Scene6Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
