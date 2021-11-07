import React from 'react'
import NavBar from '../NavBar/NavBar'
// import HomeAside from '../HomeAside'
import HomeContent from '../HomeContent/HomeContent'
import styled from 'styled-components'
import background from '../../img/background.png';

const Divider = styled.div`
    display: flex;
    flex-direction: row;
    background-image:url(${background});
    background-attachment:fixed;
    background-size:cover;
    background-position: center center;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`
const Caption = styled.p`
  text-align: center;
  font-size: 1.4em;
  border-radius: 1em;
  border: .2em solid var(--font-color);
  width: 50%;
  align-self: center;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background-color:white;
`
const Content = styled.div`
    flex-direction: column;
    width:100%;
    justify-content:center;
    align-items:center;
`

export const Home = () => {


    return (
        <div>
            <NavBar/>
            
            <Divider>
                <Content>
                    <Caption >Some wild Pokemon have appeared!</Caption>
                    <HomeContent key='home-content'/>
                </Content>
            </Divider>
            
        </div>
    )
}

export default Home