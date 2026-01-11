import { Component } from "solid-js";

const About: Component = () => {
	return (
    <section class="pt-32 pb-8" id="about" style={"background: var(--second-bg-color);"}>
      <div class="about-area">
        <div class="ml-20 mr-60">
          <h1 class="pb-3.5 font-bold text-4xl">About</h1>
          <h4 class="pb-3.5 font-bold text-xl">I'm Jack,</h4>
          <p>a computer science graduate student at Arizona State University, where I also 
              received my bachelor's in computer systems engineering. I was a Software Developer Intern
              at Farmers Mutual Hail, working with a team of full-stack developers on an internal 
              application. Born in Des Moines, Iowa, and raised in Ankeny, I've always had a love for 
              problem-solving and thinking outside the box. Aside from work and studies, I enjoy 
              playing soccer and video games and exploring the latest movies and shows. I'm excited to 
              connect and collaborate on creating impactful technology!</p>
        </div>
        <img class="max-w-full h-80" src="/src/assets/IMG_0905.JPG" alt="About Photo" />
      </div>
    </section>
	);
}

export default About;