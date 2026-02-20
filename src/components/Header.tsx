import type { Component } from 'solid-js';

const Header: Component = () => {
	return(
		<header class="w-full pb-8 fixed z-50 font-(family-name:--font-display)" style={"background: var(--nav-bg-color); color: var(--nav-text-color);"}>
				<div class="flex justify-between items-center pt-1 pb-3">
					<div class="pt-4 pl-20">
						<h1 class="text-4xl tracking-widest"><span class="first-name">JACK</span>&nbsp<span class="pb-3">HECKENLAIBLE</span></h1>
					</div>
					<nav class="w-1/2 flex justify-evenly flex-wrap items-center h-full m-auto navbar px-4">
						<a href="#about"><b>About</b></a>
						<a href="#experience"><b>Experience</b></a>
						<a href="#projects"><b>Projects</b></a>
						<a href="#blog"><b>Blog</b></a>
						<a href="#contact"><b>Contact</b></a>
					</nav>
				</div>
				<section class="border block mx-12"></section>
			</header>
    );
};

export default Header;