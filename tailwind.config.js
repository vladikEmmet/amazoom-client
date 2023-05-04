/** @type {import('tailwindcss').Config} */
const twColors = require('tailwindcss/colors');

const colors = {
	transparent: twColors.transparent,
	black: '#2E3239',
	white: twColors.white,
	gray: '#CDCDCD',
	blue: '#268697',
	primary: '#FF9902',
	secondary: '#161D25',
	warning: twColors.red[400],
	'bg-color': '#F2F2F5',
};

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors,
		extend: {
			keyframes: {
				animationOpacity: {
					from: { opacity: 0.2 },
					to: { opacity: 1 },
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: 0.3,
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
			},
		},
	},
	plugins: [],
};
