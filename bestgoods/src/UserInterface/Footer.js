import React from "react";
import {
	Box,
	Container1,
	Container2,
	Container,
	Row,
	Column1,
	Column2,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { Divider } from "@mui/material";
import { withStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { InputAdornment } from "@mui/material";
import { TextField, InputBase } from "@mui/material";
import { IconButton } from "@mui/material";


const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'white',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white',
			},
			'&:hover fieldset': {
				borderColor: 'white',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'yellow',
			},
		},
	},
})(TextField);



function Copyright(props) {
	return (
		<Typography variant="body2" color="#000" align="center" {...props} style={{ fontSize: 10 }}>
			{'Copyright © '}
			<Link color="#000" href="https://mui.com/" style={{ fontSize: 10 }}>
				BestGoods All rights reserved to Numeric Infosystems Pvt Ltd.
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
export default function Footer(props) {
	const classes = withStyles(props);
	return (
		<Box>
			<Container>
				<Row>
					<Column>
						<Heading style={{ color: '#000', fontWeight: 'bold', fontSize: '30px' }}>Contact Us</Heading>

						<Row>
							<Column style={{ marginRight: '400px', width: '300px' }}>
								<Heading style={{ color: '#000', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'left' }}>For Complaints</Heading>
								<div style={{ color: '#000', fontSize: '15px', marginBottom: 10 }}>E-Mail - <FooterLink href="#" style={{ color: '#000', fontSize: '15px' }}>help@bestgoods.com</FooterLink></div>
								<div style={{ color: '#000', fontSize: '15px', marginBottom: 10 }}>Phone - <FooterLink href="#" style={{ color: '#000', fontSize: '15px' }}> (+91)9555-245-245</FooterLink></div>
								<div style={{ color: '#000', fontSize: '15px', marginBottom: 10 }}>Need Help - <FooterLink href="#" style={{ color: '#000', fontSize: '15px' }}>Click Here</FooterLink></div>
							</Column>
							<Column>
								<Heading style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>For Business Queries</Heading>
								<FooterLink href="#" style={{ color: '#000', fontSize: '15px' }}>sales@bestgoods.com</FooterLink>
								<div style={{ color: '#000', fontSize: '15px', marginBottom: 10 }}>Track Order : <FooterLink href="#" style={{ color: '#000', fontSize: '15px' }}>Click Here</FooterLink></div>
							</Column>
						</Row>
					</Column>
				</Row>
			</Container>
			<Container1>
				<Row>
					<Column1>
						<Heading>Join the Club</Heading>
						<div style={{ color: '#fff', fontSize: 12, letterSpacing: 1, fontFamily: "inherit" }}>Subscribe today to hear about our newest offers, new products, collaborations, everything Portronics - Directly to your inbox.</div>
						<Row>

							<CssTextField

								//label="Username"
								placeholder="Enter your email"
								className="username"
								name="username"
								//onChange={this.onChange}
								type="email"
								autoComplete="current-password"
								margin="normal"
								InputProps={{
									endAdornment: (
										<InputAdornment>
											<IconButton>
												<MailOutlineSharpIcon style={{ color: '#fff' }} />
											</IconButton>
										</InputAdornment>
									),
									style: { fontFamily: 'monospace', color: 'white',width:'400px',paddingBottom:8 }
								}}
								variant="standard"
								focused
                                style={{padding:10}}
							/>
						</Row>
					</Column1>
				</Row>

			</Container1>
			<Container2>
				<Row style={{ paddingBottom: "30px" }}>
					<InstagramIcon style={{ width: 40, height: 40, marginRight: 20 }} />
					<FacebookSharpIcon style={{ width: 40, height: 40, marginRight: 20 }} />
					<TwitterIcon style={{ width: 40, height: 40, marginRight: 20 }} />
					<PinterestIcon style={{ width: 40, height: 40, marginRight: 20 }} />
					<YouTubeIcon style={{ width: 40, height: 40, marginRight: 20 }} />
				</Row>
				<Row style={{ paddingBottom: "15px" }}>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Blogs</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Support</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Privacy Policy</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>E-Waste Management</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Term and Conditions</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Warranty,Return and Fund</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Track</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>About Us</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Become Partner</FooterLink>
					<FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Brochure</FooterLink>
				</Row>
				<Row style={{ paddingBottom: "20px" }}>
					<img src="/airtel.png" style={{ width: 25, height: 25, paddingRight: 15 }} />
					<img src="/amex.png" style={{ width: 20, height: 20, paddingRight: 15 }} />
					<img src="/freecharge.png" style={{ width: 25, height: 25 }} />
					<img src="/gpay.png" style={{ width: 40, height: 25 }} />
					<img src="/mastercard.png" style={{ width: 25, height: 25, paddingRight: 15 }} />
					<img src="/mobikwik.png" style={{ width: 25, height: 20, paddingRight: 15 }} />
					<img src="/bank.png" style={{ width: 30, height: 20, paddingRight: 15 }} />
					<img src="/olamoney.png" style={{ width: 30, height: 27, paddingRight: 15 }} />
					<img src="/paytm.png" style={{ width: 40, height: 14, paddingRight: 15 }} />
					<img src="/hdfc.png" style={{ width: 22, height: 18, paddingRight: 15 }} />
					<img src="/rupay.png" style={{ width: 40, height: 15, paddingRight: 15 }} />
					<img src="/visa.png" style={{ width: 40, height: 15 }} />
				</Row>
				<Copyright sx={{ pt: 4 }} />
			</Container2>
		</Box>
	);

};