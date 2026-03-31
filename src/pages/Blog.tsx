import { Component } from "solid-js";
import { A } from "@solidjs/router";

const posts = [
  {
    id: "post-1",
    title: "The Current Attempt to Monetize Intelligence",
    date: "Oct 24, 2023",
    summary:
      "A brief introduction to reactive programming with SolidJS and why it might be the right choice for your next project.",
  },
];

const Blog: Component = () => {
  return (
    <div class="space-y-6">
      <div>
        <p class="text-4xl font-extrabold text-nord-6 tracking-tight">Blog</p>
        <p class="text-xl text-nord-4 leading-relaxed max-w-2xl mb-8">
          My thoughts on anything.
        </p>
      </div>

      <div class="grid gap-8">
        {posts.map((post) => (
          <A href={`/blog/${post.id}`} class="block group">
            <article class="p-6 rounded-xl border border-nord-3 bg-nord-1 hover:border-nord-9 hover:shadow-[0_0_15px_rgba(136,192,208,0.2)] transition-all">
              <div class="flex items-center gap-4 text-sm text-nord-9">
                <time>{post.date}</time>
              </div>
              <h3 class="text-2xl font-bold text-nord-6 mb-3 group-hover:text-nord-8 transition-colors">
                {post.title}
              </h3>
              <p class="text-nord-4 leading-relaxed">{post.summary}</p>
            </article>
          </A>
        ))}
      </div>
    </div>
  );
};

export default Blog;
