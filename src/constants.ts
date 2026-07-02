import { FiMail, FiGithub, FiTwitter, FiLinkedin } from "solid-icons/fi";
import { Component } from "solid-js";

interface ContactInfo {
  name: string;
  href: string;
}

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
  Email: FiMail,
  LinkedIn: FiLinkedin,
  X: FiTwitter,
  GitHub: FiGithub,
};

export { contactInfo, mappingIcons };
