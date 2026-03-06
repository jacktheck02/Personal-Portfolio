/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'solid-devtools';

import { Router, Route } from "@solidjs/router";
import App from './App.mdx';
import Layout from './components/Layout';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import Post1 from './pages/blog/post-1.mdx';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router root={Layout}>
    <Route path="/" component={App} />
    <Route path="/experience" component={Experience} />
    <Route path="/blog" component={Blog} />
    <Route path="/blog/post-1" component={Post1} />
  </Router>
), root!);
