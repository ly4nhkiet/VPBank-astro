/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-mode="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				'2xl': '1320px',
			},
		},
		extend: {
			colors: {
				'primary': '#FA4D09',
				'secondary': '#212529',
				'alert': '#F47D30',
				'warning': '#FFF5E8',
				'warning-light': '#FDFFBB',
				'success': '#9DA201',
				'gray': '#B3BBC2',
				'gray-light': '#F1F3F6',
				'gray-dark': '#5C5C5C',
				'gray-white': '#F6F6F7',
				'gradient-banner': 'linear-gradient(180deg, rgba(33, 37, 41, 0.00) 0%, rgba(33, 37, 41, 0.75) 54%, rgba(33, 37, 41, 0.94) 77.09%, #212529 100%)'
			},
		}
	},
	daisyui: {
		themes: ["light",],
	  },
	plugins: [
		require("daisyui"),
		require('@tailwindcss/typography')
	],
}
