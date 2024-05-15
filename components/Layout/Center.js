import { styled } from "styled-components";

const StyledDiv = styled.div`
max-width: 1350px;
margin: 0 40px;


`;

export default function Center({children}){
    return (
<StyledDiv>
    {children}
</StyledDiv>
    );
}