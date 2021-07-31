import styled from "styled-components";
import { Link } from "react-router-dom";

export const AccountButton = styled(Link)`
  text-transform: uppercase;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #4c688b;
  padding: 1rem;
  color: #4c688b;

  &:hover {
    color: white;
    background-color: #051b38;
    border-color: #051b38;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 90vh;
`;

export const Image = styled.img`
  width: 100%;
  height: 40vh;
`;

export const ImageContainer = styled.div`
  width: 50vw;
`;

export const MarketButton = styled(Link)`
  text-transform: uppercase;
  font-size: 1rem;
  border: 1px solid #4c688b;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #051b38;
  border-color: #051b38;
  color: white;

  &:hover {
    background-color: #4c688b;
    border-color: #4c688b;
    color: white;
  }
`;

export const TextContainer = styled.div`
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
