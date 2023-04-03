// import { setCompodocJson } from "@storybook/addon-docs/angular";
// import docJson from "../documentation.json";
// setCompodocJson(docJson);

export const parameters = {
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
