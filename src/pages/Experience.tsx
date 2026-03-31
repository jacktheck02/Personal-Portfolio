import { Component, For } from "solid-js";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

const Experience: Component = () => {
  const experience: ExperienceItem[] = [
    {
      title: "Software Engineer Intern",
      company: "Blue Cross Blue Shield of Arizona",
      period: "May 2025 - April 2026",
      description:
        "I spearheaded an internal proof of concept that aggregates code scan data much like Qlty or SonarQube.",
      skills: ["Python", "TypeScript", "Azure"],
    },
    {
      title: "Software Developer Intern",
      company: "Farmers Mutual Hail",
      period: "May 2024 - Aug 2024",
      description:
        "Worked on bugs, new features, and refactoring of internal app. Also created a job in a batch processor that automated a manual mailing process for accounting.",
      skills: ["Java", "JavaScript", "SQL"],
    },
  ];

  return (
    <div class="space-y-6">
      <div>
        <p class="text-4xl font-extrabold text-nord-6 tracking-tight">
          Experience
        </p>
      </div>
      <div class="relative border-l border-nord-3 ml-4 space-y-12 pb-8">
        <For each={experience}>
          {(item) => (
            <div class="relative pl-8">
              <div class="absolute w-3 h-3 bg-nord-8 rounded-full -left-1.5 top-3 border border-nord-0"></div>
              <div class="pt-1">
                <span class="text-xs font-semibold text-nord-9 uppercase tracking-wider">
                  {item.period}
                </span>
              </div>
              <h4 class="text-2xl font-bold text-nord-6">{item.title}</h4>
              <div class="text-nord-4 mb-4 font-medium">{item.company}</div>
              <p class="text-nord-4 leading-relaxed mb-4">{item.description}</p>
              <div class="flex flex-wrap gap-2">
                <For each={item.skills}>
                  {(skill) => (
                    <span class="px-2.5 py-1 text-xs rounded bg-nord-1 text-nord-9 border border-nord-3">
                      {skill}
                    </span>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Experience;
