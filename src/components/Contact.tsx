import { Component } from "solid-js";

const About: Component = () => {
  return (
    <footer class="bg-(--nav-bg-color) text-(--nav-text-color) pt-8" id="contact">
      <section class="border block mx-12 "></section>
      <div class="flex justify-center items-center pb-1 pt-3 gap-50">
        <div class="pb-10 items-center">
          <h1 class="text-3xl">Contact</h1>
				</div>
        <div class="">
          <ul>
            <li>
              <a>Email</a>
            </li>
            <li>
              <a>LinkedIn</a>
            </li>
            <li>
              <a>GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default About;