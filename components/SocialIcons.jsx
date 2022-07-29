import IconButton from '@mui/material/IconButton'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function SocialIcons(props) {
	const { color } = props
	return (
		<>
			<IconButton aria-label='menu' color={color}>
				<TwitterIcon />
			</IconButton>
			<IconButton aria-label='menu' color={color}>
				<InstagramIcon />
			</IconButton>
			<IconButton aria-label='menu' color={color}>
				<svg
					fill='none'
					height='24'
					viewBox='0 0 28 28'
					width='24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g fill='currentColor'>
						<path d='m17.5903 3c2.183 0 3.2327.20271 4.3234.78602.9891.52897 1.7713 1.31118 2.3003 2.30027.5833 1.09068.786 2.14042.786 4.32341v7.1806c0 2.183-.2027 3.2327-.786 4.3234-.529.9891-1.3112 1.7713-2.3003 2.3003-1.0907.5833-2.1404.786-4.3234.786h-7.1806c-2.18299 0-3.23273-.2027-4.32341-.786-.98909-.529-1.7713-1.3112-2.30027-2.3003-.58331-1.0907-.78602-2.1404-.78602-4.3234v-7.1806c0-2.18299.20271-3.23273.78602-4.32341.52897-.98909 1.31118-1.7713 2.30027-2.30027 1.09068-.58331 2.14042-.78602 4.32341-.78602zm0 2h-7.1806c-1.88106 0-2.61888.14248-3.38022.54964-.64054.34257-1.13727.8393-1.47984 1.47984-.40716.76134-.54964 1.49916-.54964 3.38022v7.1806c0 1.8811.14248 2.6189.54964 3.3802.34257.6406.8393 1.1373 1.47984 1.4799.76134.4071 1.49916.5496 3.38022.5496h7.1806c1.8811 0 2.6189-.1425 3.3802-.5496.6406-.3426 1.1373-.8393 1.4799-1.4799.4071-.7613.5496-1.4991.5496-3.3802v-7.1806c0-1.88106-.1425-2.61888-.5496-3.38022-.3426-.64054-.8393-1.13727-1.4799-1.47984-.7613-.40716-1.4991-.54964-3.3802-.54964z' />
						<path d='m14.759 18.33c-4.5125 0-7.25024-3.1275-7.35751-8.33h2.28546c.07125 3.8216 1.80995 5.437 3.14285 5.77v-5.77h2.1902v3.3c1.2856-.1425 2.6312-1.6445 3.0835-3.3h2.1558c-.345 2.0357-1.8099 3.5312-2.845 4.15 1.0359.5003 2.7025 1.8113 3.3453 4.18h-2.3695c-.5003-1.5834-1.7259-2.8035-3.3693-2.97v2.97z' />
					</g>
				</svg>
			</IconButton>
		</>
	)
}