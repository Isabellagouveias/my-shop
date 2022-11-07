import styled from 'styled-components';

export const ProductContainer = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    gap: 4rem;
    max-width: 1180px;
    margin: 0 auto;
    padding: 2rem 0;
`

export const ImageContainer = styled.div`
    width: 100%;
    max-width: 576px;
    height: 656px;
    background: linear-gradient(100deg, #1ea483 0%, #7465d4 100%);
    border-radius: 8px;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        object-fit: cover;
    }

` 

export const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        color: ${props => props.theme['gray-300']};
        font-size: 2rem;
    }
    span {
        margin-top: 1rem;
        display: block;
        font-size: 2rem;
        color: ${props => props.theme['green-300']};
    }

    p {
        margin-top: 2.5rem;
        font-size: 1.125rem;
        line-height: 1.6;
        color: ${props => props.theme['gray-300']};
    }

    button {
        margin-top: auto;
        background-color: ${props => props.theme['green-500']};
        border: 0;
        color: ${props => props.theme.white};
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.125rem;
        padding: 1.25rem;
        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }
        &:not(:disabled):hover{
            background-color: ${props => props.theme['green-300']};
        }
    }
`