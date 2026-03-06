import { Component, For } from "solid-js";

const Experience: Component = () => {
  return (
    <div class="space-y-12">
      <div>
        <h1 class="text-4xl font-extrabold text-nord-6 mb-8 tracking-tight pb-4">
          Experience
        </h1>
      </div>
      <div class="relative border-l border-nord-3 ml-4 md:ml-0 space-y-12 pb-8">
        {/* Experience Item */}
        <For
          each={[
            {
              title: "Software Engineer Intern",
              company: "Blue Cross Blue Shield of Arizona",
              period: "2025 - Present",
              description:
                "",
              skills: ["Python", "TypeScript", "Azure"],
            },
            {
              title: "Software Developer Intern",
              company: "Farmers Mutual Hail",
              period: "May 2024 - Aug 2024",
              description:
                "",
              skills: ["Java", "JavaScript", "SQL"],
            },
          ]}
        >
          {(item) => (
            <div class="relative pl-8 md:pl-0">
              <div class="md:hidden absolute w-3 h-3 bg-nord-8 rounded-full -left-1.5 top-2 border border-nord-0"></div>
              <div class="md:grid md:grid-cols-4 md:gap-8">
                <div class="md:col-span-1 md:text-right pt-1">
                  <span class="text-sm font-semibold text-nord-9 uppercase tracking-wider">
                    {item.period}
                  </span>
                  <div class="hidden md:block absolute w-3 h-3 bg-nord-9 rounded-full left-[calc(25%-6px)] top-2 border-2 border-nord-0 shadow-[0_0_8px_rgba(136,192,208,0.6)]"></div>
                </div>
                <div class="md:col-span-3">
                  <h3 class="text-2xl font-bold text-nord-6">{item.title}</h3>
                  <div class="text-nord-4 mb-4 font-medium">{item.company}</div>
                  <p class="text-nord-4 leading-relaxed mb-4">
                    {item.description}
                  </p>
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
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Experience;
