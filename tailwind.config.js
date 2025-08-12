export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/styles/Spinner.css", // Custom, pal Spinner "Customizable"
	],
	theme: {
		extend: {
			spacing: {
				"sidebar-collapsed": "4rem",
				"sidebar-expanded": "16rem",
			},
			colors: {
				bg: {
					main: "#F8F9FA",
					nav: "#2C3E50",
					secondary: "#ECF0F1",
				},
				bgButton: {
					primary: "#3498DB",
					secondary: "#2980B9",
					delete: "#E74C3C",
					deleteHover: "#C0392B",
				},
				text: "#34495E",
				success: "#27AE60",
				item: "#A5A8A9",
				accent: "#F59E0B",
			},
			fontFamily: {
				bangers: ["Bangers", "sans-serif"],
			},
		},
	},
	plugins: [],
};
