import React from 'react'
import NavBar from '../NavBar/NavBar'
import DetailCard from '../DetailCard/DetailCard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import background from '../../img/background.png';

const Divider = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-image:url(${background});
    background-attachment:fixed;
    background-size:cover;
    background-position: center center;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto 0 auto;
    width: 68vw;
    @media (max-width: 900px) {
        width: 100%;
    }
`
const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 2em 0 0 0;
    height: 4em;
    width: 12em;
    border-radius: 2em;
    background: #CE1131;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: .3s;
    &.glass {
        background: rgba( 255, 255, 255, 0.25 );
        backdrop-filter: blur( .4em );
        -webkit-backdrop-filter: blur( .4em );
    }
    &:hover {
        transform: scale(1.10);
        cursor: pointer;
    }
    @media (max-width: 900px) {
        margin: 2em auto 0;
    }
`
const Caption = styled.p`
    font-size: 1.2em;
    color: white;
`
const Icon = styled.img`
    width: 3em;
    height: 3em;
    margin-right: 1em;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
`

export const Details = () => {
    const pokemon = useSelector(state => state.pokemon)
    
    return (
        <div>
            <NavBar/>
            <Divider>
                <Content>
                    <Link to='/home' style={{ textDecoration: 'none' }}>
                    <Button>
                    <Icon src='https://api.iconify.design/mdi:run-fast.svg'/>
                        <Caption>RUN</Caption>
                    </Button>
                    </Link>
                    <DetailCard pokemon={pokemon}/>
                </Content>
            </Divider>
        </div>
    )
}

export default Details
