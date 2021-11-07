import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import background from '../../img/background.png';
import logo from '../../img/pokemon-logo.png';
import pokeball from '../../img/pokeball.png';
import pikachu from '../../img/pikachu.png';

const ContentAll=styled.div`
    background-image: url(${background});    
    height:85vh;
    padding:3em;
    background-size:cover;
    background-position: center center;
    display:flex;
    align-items:center;
    justify-content:center;
`
const Pokeball=styled.img`
    width:10em;
    animation: rotation 5s infinite linear;
    transition: 1s;
     &:hover{
        transform:scale(1.1);
        transition:1s}
    @keyframes rotation {
        0% {
          transform:rotate(0deg);
        }
        100% {
          transform:rotate(360deg);
        }    
    }
   
`
const Pika=styled.img`
    width:10em;
    animation: arrow 3s infinite linear;
    @keyframes arrow {
        0% {
        transform: translate(0px, 0px);
        }
        50% {
        transform: translate(0px, 20px);
        }
        100% {
        transform: translate(0px, 0px);
        }
        }
`
const Logo=styled.img`
    animation: palp 2s infinite linear;
    @keyframes palp {
        0% {
            -webkit-transform:scale(1.0);
            }
        50% {
            -webkit-transform:scale(1.1);
            }
        100% {
            -webkit-transform:scale(1.0);
            }
    }
`
const Cont=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const Mess=styled.p`
    background-color:white;
    border: solid 2px black;
    border-radius:2em;
`

export const Landing = () => {
    return (
        <ContentAll>
            <Cont>
                <Logo src={logo} alt='logo' />
                <Pokeball src={pokeball} alt="pokeball" />
                <Mess>Click on Pikachu to continue</Mess>
            <NavLink to='/home'><Pika src={pikachu} alt='pika' /></NavLink>
            </Cont>
            
        </ContentAll>
    )
}
