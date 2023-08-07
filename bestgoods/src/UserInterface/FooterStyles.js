import styled from 'styled-components';

export const Box = styled.div`
/*padding: 30px 10px;*/
/*background: black;*/
bottom: 0;
width: 100%;


@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	/*max-width: 1000px;*/
	height:300px;
	width:100%;
    margin: 0 auto;
	background: #ecf0f1;
`

export const Column = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
margin-left: 10px;
`;



export const Container1 = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	/*max-width: 1000px;*/
	height:300px;
	width:100%;
    margin: 0 auto;
	background: black;
`

export const Column1 = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
margin-left: 10px;
`;

export const Container2 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/*max-width: 1000px;*/
	width:100%;
	height:400px;
    margin: 0 auto;
	background: white;
`

export const Column2 = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 10px;
`;

export const Row = styled.div`
display: flex;
justify-content:center;
/*grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));*/
/*grid-gap: 50px;*/

/*@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}*/
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: lightblue;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
display:flex;
justify-content:center;
font-size: 24px;
color: #fff;
margin-bottom: 20px;
font-weight: 18px;
letter-spacing:2px;
font-family:Monospace;
`;
