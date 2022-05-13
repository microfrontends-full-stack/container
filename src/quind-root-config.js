import {
	constructRoutes,
	constructApplications,
	constructLayoutEngine,
} from "single-spa-layout";
import { registerApplication, start } from "single-spa";

// registerApplication({
// 	name: "@quind/mf-navbar",
// 	app: () => System.import("@quind/mf-navbar"),
// 	activeWhen: ["/"],
// });

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
	loaders: {
		topNav: "<h1>Hello world</h1>",
	},
	errors: {
		topNav: "<h1>Failed to load topnav</h1>",
	},
});
const applications = constructApplications({
	routes,
	loadApp: ({ name }) => System.import(name),
});
const layoutEngine = constructLayoutEngine({
	routes,
	applications,
	active: false,
});

applications.forEach(registerApplication);

System.import("@quind/mf-styleguide").then(() => {
	// Activate the layout engine once the styleguide CSS is loaded
	layoutEngine.activate();
	start();
});
