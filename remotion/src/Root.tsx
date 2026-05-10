import { Composition } from "remotion";
import { QuickFeedLaunch } from "./QuickFeedLaunch";

// 45 seconds @ 30fps = 1350 frames
const TOTAL_FRAMES = 1350;

export const RemotionRoot = () => {
  return (
    <Composition
      id="QuickFeedLaunch"
      component={QuickFeedLaunch}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
