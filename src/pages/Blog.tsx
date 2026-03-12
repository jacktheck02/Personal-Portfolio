import { Component } from 'solid-js';

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
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default Blog;