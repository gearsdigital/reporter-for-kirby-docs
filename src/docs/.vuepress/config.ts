module.exports = {
  base: '/reporter-for-kirby-docs/',
  locales: {
    "/": {
      lang: "en-US",
      title: "Reporter for Kirby",
      description: "Gather feedback directly out of the Panel!"
    }
  },
  themeConfig: {
    displayAllHeaders: true,
    darkMode: false,
    contributors: false,
    lastUpdated: false,
    locales: {
      "/": {
        logo: "/images/reporter-logo_en-US.svg",
        selectLanguageName: "English",
        sidebar: [
          {
            text: "Guide",
            children: ["/guide/", "/guide/installation.md"]
          }
        ]
      }
    }
  }
};
