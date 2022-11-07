import styled from 'styled-components'

export const HomeContainer = styled.main`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem 1rem;
    gap: 2rem;
    margin: 0 auto;
    min-height: 656px;
`

export const Product = styled.div`
    max-width: 400px;
    transition: all .2s ease-in-out;
    background: linear-gradient(180deg, #1ea483 0%, #7465d4 100%);
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        object-fit: cover;
    }
    footer {
        display: flex;
        position: absolute;
        bottom: 0.25rem;
        left: 0.25rem;
        right: 0.25rem;
        padding: 2rem;
        border-radius: 6px;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(0,0,0,0.6);
        strong {
            font-size: 1.25rem;
            color: ${props => props.theme['gray-100']}
        }
        span {
            font-size: 1.5rem;
            font-weight: bold;
            color: ${props => props.theme['green-300']}
        }
    }
    &:hover {
        transform: scale(1.1);
    }
`