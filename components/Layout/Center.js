import { styled } from "styled-components";

const StyledDiv = styled.div`
  max-width: 1350px;
  margin: 0 40px;

  @media (max-width: 768px) {
    margin: 0 20px; /* Reduce margin for mobile view */
  }

  @media (max-width: 480px) {
    margin: 0 10px; /* Further reduce margin for smaller screens */
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
