import { FiMail, FiGithub, FiTwitter, FiLinkedin } from "solid-icons/fi";
import { Component } from "solid-js";

interface Project {
  name: string;
  intro: string;
  href: string;
  title: string;
  description: string;
  tags: string[];
  linkText: string;
  outro: string;
}

interface ContactInfo {
  name: string;
  href: string;
}

const projects : Project[] = [
  {
    name: "Whistleblower",
    intro: "AI agents that rat out their own creators, ",
    href: "",
    title: "Whistleblower",
    description:
      "A web extension that uses AI research agents, with a modern and simplistic design.",
    tags: ["React", "TailwindCSS", "Hono", "Neon", "Cloudflare Workers"],
    linkText: "Whistleblower",
    outro: " lets you stay informed and keep to your principles.",
  },
  {
    name: "clifc",
    intro: "Think FotMob, Sofascore, OneFootball, etc. but in your terminal.  ",
    href: "https://github.com/jacktheck02/clifc",
    title: "clifc",
    description:
      "A command-line interface for current football (soccer) data implemented in C++.",
    tags: ["C++", "CMake", "SQLite", "football-data.org API"],
    linkText: "clifc",
    outro:
      "  gives you up to date data on your favorite football (soccer) leagues.",
  },
  {
    name: "Mini Graph DB",
    intro:
      "This is to redeem myself from a project that I was not able to finish. I am going to convert a minibase to a",
    href: "",
    title: "Mini Graph DB",
    description:
      "A lightweight graph database implemented in Java from the Java version of minibase.",
    tags: ["Java", "Graph Databases", "Data Structures"],
    linkText: "graph database.",
    outro: "",
  },
];

const contactInfo: ContactInfo[] = [
  {
    name: "Email",
    href: "mailto:jacktheck02@proton.me",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jacktheck02/",
  },
  {
    name: "X",
    href: "https://x.com/JackHeckenlaib1",
  },
  {
    name: "GitHub",
    href: "https://github.com/jacktheck02",
  },
];

const mappingIcons: Record<string, Component> = {
  "Email": FiMail,
  "LinkedIn": FiLinkedin,
  "X": FiTwitter,
  "GitHub": FiGithub,
};

export { projects, contactInfo, mappingIcons };
