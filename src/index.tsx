import "./index.css";
import { render } from "solid-js/web";

if (import.meta.env.DEV) {
  import("solid-devtools");
}
import { Router, Route } from "@solidjs/router";
import App from "./App.mdx";
import Layout from "./components/Layout";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={App} />
      <Route path="/experience" component={Experience} />
      <Route path="/blog" component={Blog} />
    </Router>
  ),
  root!,
);
