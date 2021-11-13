module.exports = {
  packagerConfig: {
    icon: `${__dirname}/src/assets/images/librarian`,
    appCopyright: "Danilo Lutz"
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "librarian",
        iconUrl: `file:///${__dirname}/src/assets/images/librarian.ico`,
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        name: "librarian",
        iconUrl: `file:///${__dirname}/src/assets/images/librarian.png`,
      },
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/index.html",
              js: "./src/renderer.ts",
              name: "main_window",
            },
          ],
        },
      },
    ],
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "danilolutz",
          name: "librarian",
        },
        prerelease: true,
      },
    },
  ],
};
