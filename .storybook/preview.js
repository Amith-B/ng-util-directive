// import { setCompodocJson } from "@storybook/addon-docs/angular";
// import docJson from "../documentation.json";
// setCompodocJson(docJson);
import "!style-loader!css-loader!sass-loader!./preview.scss";

const prodStorybook = process.env.NODE_ENV === "prod";

export const parameters = {
  viewMode: prodStorybook ? "docs" : "story",
  previewTabs: {
    canvas: {
      hidden: prodStorybook,
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  options: {
    storySort: {
      order: [
        "Directives",
        [
          "NgSkeleton",
          [
            "Basic Full Size",
            "Circle",
            "Rectangle",
            "Square",
            "Custom Color",
            "Guide: Usage guide",
            "Guide: Custom skeleton component creation",
          ],
        ],
      ],
      locales: "en-US",
    },
  },
};
