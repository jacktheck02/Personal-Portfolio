import { A } from '@solidjs/router';
import { ParentComponent } from 'solid-js';

const Layout: ParentComponent = (props) => {
  return (
    <div class="min-h-screen py-12 md:py-24 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto bg-nord-0/80 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(46,52,64,0.6)] border-2 border-nord-4 overflow-visible p-6 sm:p-12">
        <nav class="flex items-center justify-between border-b border-nord-3 pb-6 mb-8">
          <A href="/" class="text-xl font-bold text-nord-9 hover:text-nord-6 transition-colors">JH</A>
          <div class="flex gap-6 text-sm font-medium">
            <A href="/" class="text-nord-4 hover:text-nord-6 transition-colors">About</A>
            <A href="/experience" class="text-nord-4 hover:text-nord-6 transition-colors">Experience</A>
            <A href="/blog" class="text-nord-4 hover:text-nord-6 transition-colors">Blog</A>
          </div>
        </nav>
        <div class="mdx-content">
          {props.children}
        </div>
        <footer class="mt-12 pt-8 border-t border-nord-3 text-center text-nord-4 text-sm" />
      </div>
    </div>
  );
}

export default Layout;
