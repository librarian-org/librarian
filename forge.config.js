module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'danilolutz',
            name: 'librarian'
          },
          prerelease: true
        }
      }
    ]
  }
