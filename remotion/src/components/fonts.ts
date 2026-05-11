import { loadFont as loadBodyFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDisplayFont } from "@remotion/google-fonts/Syne";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

export const { fontFamily } = loadBodyFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const { fontFamily: displayFontFamily } = loadDisplayFont("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

export const brandFontFamily = '"Cal Sans", "Plus Jakarta Sans", sans-serif';

if (typeof document !== "undefined") {
  const handle = delayRender("Loading Cal Sans");
  const calSans = new FontFace(
    "Cal Sans",
    `url('${staticFile("fonts/CalSans-SemiBold.woff2")}') format('woff2')`
  );

  calSans
    .load()
    .then(() => {
      document.fonts.add(calSans);
      continueRender(handle);
    })
    .catch((err) => {
      cancelRender(err);
    });
}
