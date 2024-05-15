import { styled, css } from "styled-components";


export const ButtonStyle = css`
border: 0;
padding: 5px 15px;
border-radius: 5px;
cursor:pointer;
display: inline-flex;
align-items:center;
text-decoration: none;
svg{
    height: 16px;
    margin-right: 5px;
}
${props => props.white && !props.outline && css`
background-color: #D60202;
color: #000;


`}
${props => props.white && props.outline && css`
background-color: transparent;
color: #fff;
border: 1px solid #fff;


`}
${props => props.primary && css`

background-color: #D60202;
border: 1px solid #D60202;

color:#fff;
`}
${props => props.size === 'l' && css`
font-size: 1.2 rem;
padding: 10px 20px;
svg{
    height: 16px;
}
`}`;
 export const StyleButton = styled.button`
${ButtonStyle}

`;


export default function Button({children,...rest}){
    return (

        <StyleButton {...rest}>{children}</StyleButton>
    );
}