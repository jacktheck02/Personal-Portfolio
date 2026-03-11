import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const posts: string[] = [];

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
        {/* {posts.map(post => (
          <A href={`/blog/${post.id}`} class="block group">
            <article class="p-6 rounded-xl border border-nord-3 bg-nord-1 hover:border-nord-9 hover:shadow-[0_0_15px_rgba(136,192,208,0.2)] transition-all">
              <div class="flex items-center gap-4 text-sm text-nord-9 mb-3">
                <time>{post.date}</time>
                <div class="flex gap-2">
                  {post.tags.map(tag => (
                    <span class="px-2 py-0.5 rounded-full bg-nord-2 text-nord-4 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 class="text-2xl font-bold text-nord-6 mb-3 group-hover:text-nord-8 transition-colors">
                {post.title}
              </h2>
              <p class="text-nord-4 leading-relaxed">
                {post.summary}
              </p>
              <div class="mt-4 text-nord-9 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read article <span aria-hidden="true">&rarr;</span>
              </div>
            </article>
          </A>
        ))} */}
      </div>
    </div>
  );
};

export default Blog;