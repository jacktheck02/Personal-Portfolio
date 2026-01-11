import type { Component } from 'solid-js';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: Component = () => {
  return (
    <>
      <Header />
      <main class="font-(family-name:--font-display)">
        <About />
        {/* TODO: Expirence Section */}
        <div class="w-full m-0 font-bold text-center text-[2.75rem] p-2">
            <h1>Projects</h1>
        </div>
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default App;
