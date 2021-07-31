import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  background-color: #4c688b;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 50vh;
`;

export const ImageContainer = styled.div`
  width: 50vw;
`;

export const TextContainer = styled.div`
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
