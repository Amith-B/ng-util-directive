module.exports = {
  stories: [
    "../projects/ng-util-directive/**/*.stories.mdx",
    "../projects/ng-util-directive/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/angular",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
