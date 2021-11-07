import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons } from '../../Redux/actions';
import styled from 'styled-components';
import HomeCards from '../HomeCards/HomeCards';

const NumbersContainer = styled.ul`
    align-self: center;
    color: black;
    display: flex;
    list-style: none;
    padding: 0;
    margin:auto;
    margin-top: -2em;
    @media (max-width: 900px) {
        margin-top: 0;
    }
    
`
const PageNumbers = styled.li`
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 500;
    text-align: center;
    padding: 1.6em;
    border-radius: 50%;
    transition: all .3s linear;
    &:hover {
        color: #ff1744;
        transform: scale(1.15);
    }
    &.active {
        background-color: #ff1744;
        color: #000000;
    }
    @media (max-width: 900px) {
        display: none;
    }
`
const Button = styled.button`
    font-size: 1.2em;
    text-align: center;
    padding: 1.6em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all .3s linear;
    border-radius:1em;
    &:hover {
        background: #ff1744;
        color: #000000;
    }
    &:focus {
        outline: none;
    }
`
const ButtonN = styled.button`
    font-size: 1.2em;
    text-align: center;
    padding: 1.6em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all .3s linear;
    border-radius:1em;
    &:hover {
        background: #ff1744;
        color: #000000;
    }
    &:focus {
        outline: none;
    }
    @media (max-width: 900px) {
        display: none;
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`
const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    width: 100%;
    h2 {
        text-align: center;
    }
    @media (max-width: 900px) {
        width: 100vw;
    }
`
const LoadingImg = styled.img`
    margin-top: 4em;
    height: 40em;
    width: 40em;
    border-radius: 50%;
    align-self: center;
`
const AllCont=styled.div`
display: flex;
flex-direction:column;
align-items: center;
justify-content:center;
`
const UpButtonContainer = styled.div`
    background: #ff1744;
    border-radius: 50%;
    align-self: center;
    padding: -6em;
    visibility: hidden;
    @keyframes static-vertical {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(.5em);
        }
        100% {
            transform: translateY(0);
        }
    }
    animation: static-vertical 1000ms infinite;
    &.glass {
        background: rgba( 255, 255, 255, 0.25 );
        backdrop-filter: blur( .4em );
        -webkit-backdrop-filter: blur( .4em );
    }
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 900px) {
        visibility: visible;
        padding: 1em;
    }
`
const UpButton = styled.img`
    height: 2.5em;
    width: 2.5em;
    object-fit: contain;
`

export const HomeContent = () => {
    const dispatch=useDispatch();
    const pokemons=useSelector(state=>state.pokemons);
    const loading = useSelector(state => state.pokemon.loading)


    useEffect(() => {
        if (pokemons.length > 0) return
        dispatch(getAllPokemons(151, 0))
    }, [dispatch,pokemons]);

    // Página actual, inicializada en 1
    const [currentPage, setCurrentPage] = useState(1)
    // Cards o Items que voy a mostrar por página
    const [itemsPerPage] = useState(12)
    // Número de páginas que quiero mostrar
    const [pageNumberLimit] = useState(5)
    // Máximo de páginas
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    // Mínimo de páginas
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    // En cada página voy a insertar las cards
    const pages = [];
    for (let i = 1; i <= Math.ceil(pokemons.length / itemsPerPage); i++) {
        pages.push(i)
    }

    // Información de los items que voy a mostrar en cada página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem)

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    let pageIncrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <ButtonN onClick={handleNextBtn}>&hellip;</ButtonN>
    }

    let pageDecrementBtn = null
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <Button onClick={handlePrevBtn}>&hellip;</Button>
    }
    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            const active = currentPage === number ? 'active' : null
            return (
                <PageNumbers
                    className={`${active}`} key={number} id={number} onClick={handleClick}>
                    {number}
                </PageNumbers>
            )
        } else {
            return null;
        }
    })
        // ******************** Paginado ********************

        if (loading) {
            return(
                <Content key='home-content'>
                    <LoadingImg src='https://i.imgur.com/hN8NZYh.gif'/>                
                </Content>
            )
        } else {
            return (
                <AllCont>
                    <Container>
                        <Content key='home-content'>
                            {currentItems.map(pokemon => (
                                <HomeCards pokemon={pokemon} key={pokemon.id}/>
                            ))}
                        </Content>
                    </Container>
                    
                    <UpButtonContainer  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        <UpButton src='https://api.iconify.design/ant-design:caret-up-filled.svg'/>
                    </UpButtonContainer>
        
                    <NumbersContainer  >
                        <Button  onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</Button>
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        <Button  onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</Button>
                    </NumbersContainer>
                </AllCont>
            )
        }
    
}
export default HomeContent;
