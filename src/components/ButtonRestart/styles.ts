import styled from 'styled-components'

export const Container = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  background: rgb(239,200,8);
  background: linear-gradient(90deg, rgba(239,200,8,1) 0%, rgba(199,10,32,1) 100%);
  border-radius: 10px;
  cursor: pointer;
  opacity: 1;
  transition: all ease 0.3s;

  &:hover {
    opacity: 0.8;
  }
`

export const IconArea = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba( 255, 255, 255, .2);
  padding: 0 15px;
`

export const Icon = styled.img`
  height: 20px;
`

export const Label = styled.div`
  height: inherit;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
`