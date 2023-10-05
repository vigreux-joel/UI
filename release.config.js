module.exports = {
  npmPublish: true,
  repositoryUrl: 'https://github.com/Udixio/UI.git',
  branches: ['master', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          'dist/index.js',
          'dist/ui.cjs.development.js',
          'dist/ui.cjs.production.min.js',
          'dist/ui.esm.js',
        ],
      },
    ],

    '@semantic-release/git',
  ],
};
