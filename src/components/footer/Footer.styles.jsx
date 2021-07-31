import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #051c38;
  height: 25vh;
  color: white;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export const TextLink = styled.a`
  color: white;

  &:hover {
    color: #748aa6;
  }
`;
