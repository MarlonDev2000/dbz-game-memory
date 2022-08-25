import styled from "styled-components"

type ContainerProps = {
  showBackground: boolean
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => props.showBackground === true ? '#e2e3e3' : '#e2e3e3'};
  height: 200px;
  width: 200px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1060px){
    height: 150px;
    width: 150px;
  }


  @media (max-width: 750px){
    height: 100px;
    width: 100px;
  }
`

type IconProps = {
  opacity?: number
}

export const Icon = styled.img<IconProps>`
  width: 150px;
  height: 150px;
  opacity: ${props => props.opacity ? props.opacity : 1};

  @media (max-width: 1060px){
    height: 120px;
    width: 120px;
  }

  @media (max-width: 750px){
    height: 80px;
    width: 80px;
  }

`