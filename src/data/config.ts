const config = {
  title: "Mohammed Zaid | Multi-Domain Creative Tech Builder",
  description: {
    long: "Explore the portfolio of Mohammed Zaid, a multi-domain creative tech builder and AI/ML student specializing in app development, web development, game design, and AI systems. Discover my latest work, including SportQ, SignalSense, Neuro.py, and more. Let's build something impactful together!",
    short:
      "Discover the portfolio of Mohammed Zaid, a creative tech builder building innovative apps, websites, games, and AI systems.",
  },
  keywords: [
    "Mohammed Zaid",
    "portfolio",
    "creative tech builder",
    "AI/ML developer",
    "app development",
    "web development",
    "game development",
    "artificial intelligence",
    "SportQ",
    "SignalSense",
    "Neuro.py",
    "Python",
    "Next.js",
    "React",
    "machine learning",
    "full-stack development",
  ],
  author: "Mohammed Zaid",
  email: "zaid60704@gmail.com",
  site: "https://zaid-portfolio.site",

  // for github stars button
  githubUsername: "Coder-Zaid",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/mohammed-zaid-ab4786371/",
    instagram: "https://www.instagram.com/livin._with._zaid/",
    facebook: "",
    github: "https://github.com/Coder-Zaid",
  },
};
export { config };
