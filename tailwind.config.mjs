/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ["light"],
		styled: true,
		base: true,
		utils: true,
		logs: false,
		rtl: false,
	},
	plugins: [daisyui],
}