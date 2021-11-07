import { Link,useHistory } from 'react-router-dom'
import styled from 'styled-components'
import React, { useState } from 'react';
import PokemonLogo from '../../img/pokemon-logo.png'
import { getPokemonByName } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Form=styled.form`
    display:flex;
    justify-content:center;
    align-items:center;
`
const Butt=styled.button`
    background-color:rgba(255, 0, 0, 0);
    border:none;
    cursor:pointer;
    transition:0.5s;
    &:hover{
        transform:scale(1.2);
        transition:0.5s;
    }
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: red;
    border-bottom: .2em solid black;
    height: 6em;
`
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: .3s;
    &:hover {
        cursor: pointer;
        transform: scale(1.10);
        text-shadow: 3px 5px 8px black;
    }
`
const Icon = styled.img`
    height: 4em;
    width: 4em;
    border-radius: 50%;
`
const IconLogo = styled.img`
    height:3em;
    width:8em;
`



const NavBar = () => {
    const [search,setSearch]=useState('');
    const dispatch=useDispatch();
    let pok=useSelector(state=>state.pokemon);
    let history=useHistory();
    const onChange=(e)=>{
        e.preventDefault();
        setSearch(e.target.value);
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        dispatch(getPokemonByName(search)).then((a)=>{
            if(a==='success'){
                history.push(`/details/${pok[0].id}`)
            }            
        })
    }
    return (
        <>
            <Nav>
                <Link to='/home' style={{ textDecoration: 'none'}}>
                    <IconContainer>
                        <IconLogo src={PokemonLogo}/>
                    </IconContainer>
                </Link>
                <Form onSubmit={(e)=>onSubmit(e)}>
                    <input type="text" value={search} onChange={(e)=>onChange(e)}/>
                    <Butt type='submit'><Icon src='https://i.imgur.com/EAuw8J0.png'/></Butt>
                </Form>
            </Nav>
        </>
    )
}

export default NavBar
