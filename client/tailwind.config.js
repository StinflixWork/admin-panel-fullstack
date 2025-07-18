import { COLORS } from './src/constants/color.constants'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: COLORS,
			backgroundImage: {
				'primary-gradient': 'linear-gradient(to right, #ea9e4d, #FF825C)',
				'secondary-gradient': 'linear-gradient(to right, #DA45AF, #FA5A87)'
			}
		}
	},
	plugins: []
}
