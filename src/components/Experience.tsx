import { Component, For } from "solid-js";

interface ExperienceItem {
  company: string;
  role: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Palantir",
    role: "Software Engineer Intern",
  },
  {
    company: "Raytheon Technologies",
    role: "Software Engineer Intern",
  },
];

const Experience: Component = () => {
  return (
    <section
      class="pt-32 pb-8"
      id="experience"
      style={"background: var(--second-bg-color);"}
    >
      <div class="ml-20 mr-60">
        <h1 class="pb-3.5 font-bold text-4xl">Experience</h1>
        <ul class="list-disc ml-6">
          <For each={experiences}>
            {(item) => (
              <li class="text-xl mb-2">
                <b>{item.role}</b> - {item.company}
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
