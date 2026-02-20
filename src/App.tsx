import type { Component } from 'solid-js';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

const App: Component = () => {
  return (
    <>
      <Header />
      <main class="font-(family-name:--font-display)">
        <About />
        <Experience />
        <div class="w-full m-0 font-bold text-center text-[2.75rem] p-2">
            <h1>Projects</h1>
        </div>
        <Projects />
        <Blog />
        <Contact />
      </main>
    </>
  );
};

export default App;
