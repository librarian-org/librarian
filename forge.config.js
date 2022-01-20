module.exports = {
  packagerConfig: {
    icon: `${__dirname}/src/assets/images/librarian`,
    appCopyright: "Librarian Org"
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
              html: "./src/electron/index.html",
              js: "./src/electron/renderer.ts",
              name: "main_window",
              preload: {
                js: "./src/electron/preload.ts"
              }
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
          owner: "librarian-org",
          name: "librarian",
        },
        draft: true,
      },
    },
  ],
};
