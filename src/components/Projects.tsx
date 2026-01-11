import { Component, For } from "solid-js";

interface ProjectInterface {
	projectName: string
	projectDescription: string
	moreInfoLink: string
}

const projects: ProjectInterface[] = [
	{
		projectName: "3D ML Environment",
		projectDescription: `
							A 3D learning environment that helps users understand machine 
							learning algorithms through interactive explanations and visualizations. It incorporates
							multiple supervised and unsupervised machine learning algorithms.
							`,
		moreInfoLink: "https://github.com/BaylorH/MachineLearningEnvironment"
	},
	{
		projectName: "Sentiment Analysis",
		projectDescription: `
							A Python-based tool that analyzes social media sentiment on 
							NVIDIA stock to suggest trading strategies based on user-defined thresholds. To ensure 
							accuracy, I incorporated a back-testing framework that evaluates these strategies.
							`,
		moreInfoLink: "https://www.linkedin.com/in/jacktheck02/details/projects/"
	},
	{
		projectName: "Face Recognition Pipeline",
		projectDescription: `
							The pipeline processes video input in the cloud and identifies 
							individuals using advanced face recognition techniques. I configured Python-based AWS Lambda 
							functions with ffmpeg and facenet-pytorch to enable video analysis.
							`,
		moreInfoLink: "https://www.linkedin.com/in/jacktheck02/details/projects/"
	}
]

const Projects: Component = () => {
	return (
		<section class="w-full my-0 mx-auto py-20 px-2.5 bg-[url(/src/assets/Background-Image.png)] bg-cover bg-no-repeat flex flex-row flex-wrap justify-center items-center gap-2 " id="projects">
			<For each={projects}>
				{(item, index) => 
					<div class="w-68 h-120 flex flex-col items-center" style={"background-color: var(--bg-color)"}>
						<div class="w-20 h-20 rounded-[50%] relative -top-6 mb-6" style={"background: var(--second-bg-color)"}>
							<h1 class="text-center text-5xl mt-3.75">{index() + 1}</h1>
						</div>
						<b class="text-center mt-0 mx-8 mb-10">{item.projectName}</b>
						<p class="my-0 mx-8 text-center text-sm/loose">{item.projectDescription}</p>
						<a class="btn" href={item.moreInfoLink} target="_blank">More Info</a>
					</div>
				}
			</For>
		</section>
	);
}

export default Projects;