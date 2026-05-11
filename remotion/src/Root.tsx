import { Composition } from "remotion";
import { QUICKFEED_LAUNCH_FRAMES, QuickFeedLaunch } from "./QuickFeedLaunch";

export const RemotionRoot = () => {
  return (
    <Composition
      id="QuickFeedLaunch"
      component={QuickFeedLaunch}
      durationInFrames={QUICKFEED_LAUNCH_FRAMES}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
