import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { Menu } from '@mui/icons-material';
import useWindowDimensions from './../../hooks/useWindowDimensions';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../../globals';

import { StyledLink, StyledButton } from "../../ReuseableComponents/ReuseableComponents";
import { AuthContext } from "../../context/AuthContext";
import { authApi } from "./../../api/api";

import Chad from "./../../assets/img/chad.png";

const StyledNavbar = styled.div`
    position: fixed;
    width: 100%;
    height: 120px;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${GlobalColors.hardGrey};
    padding: 20px 6vw;

    h2 {
        font-size: 2rem;
    }
    
    p {
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
        color: ${GlobalColors.green};
    }
`


const NavbarAdmin = styled.nav`
    font-family: ${GlobalFonts.primary};
    width: 200px;
    height: 100vh;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding: 50px 0px;
    background: ${GlobalColors.hardGrey};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    h2 {
        font-size: 2rem;
    }
    
    p {
        font-size: 1.5rem;
        text-align: center;
        color: ${GlobalColors.green};
    }

    .NavbarLinkContainer {
        display: flex;
        flex-direction: column;
        font-size: 1.25rem;
        width: 100%; 

        ${StyledLink} {
            padding: 10px;
            width: 100%;
            text-align: center;
        }
    }

    @media (max-width: 768px) {
        width: 50%;
        /* align-items: flex-start; */
        padding: 120px 0 20px 0;
        transform: ${props => props.isHidden ? "translateX(-100%)" : "translateX(0%)"};
        transition: 0.5s;
    }
`

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    p {
        font-size: 20px;
        color: white;
        margin: 5px 0 20px 0;
        font-family: ${GlobalFonts.secondary};
        word-break: break-all;
        white-space: normal;
    }
`

const StyledNavbarAdmin = () => {
    const location = useLocation();
    const { width: windowWidth } = useWindowDimensions();
    const { isLoading, dispatch, user } = useContext(AuthContext);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        if(location.pathname.includes('/admin/') && isHidden == false ) {
            setIsHidden(false);
        }
    }, [location])

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT_START", payload: user });
        try {
            let refreshToken = localStorage.getItem("refreshToken");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            await authApi.logout(refreshToken);
            dispatch({ type: "LOGOUT_SUCCESS" });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            { windowWidth < 769  &&
                <StyledNavbar bg="dark" variant="dark">
                    {/* <Container> */}
                    <Menu style={{ 
                        fontSize: 35, 
                        cursor: "pointer", 
                        color: 'white' 
                    }} onClick={() => setIsHidden(!isHidden)} />
                    <StyledLink to="/admin/dashboard">
                        <h2>SEWA AULA</h2>
                        <p>{user.role ? user.role : 'admin'}</p>
                    </StyledLink>
                    <div style={{ width: '35px', }}></div>
                    {/* </Container> */}
                </StyledNavbar>
            }
            <NavbarAdmin isHidden={isHidden} >
                { windowWidth > 768 &&
                    <StyledLink to="/admin/dashboard">
                        <h2>SEWA AULA</h2>
                        <p>ADMIN</p>
                    </StyledLink>
                }
                <div className="NavbarLinkContainer">
                    <StyledLink to="/admin/dashboard" 
                        style={{ 
                            backgroundColor: location.pathname == '/admin/dashboard' ? GlobalColors.violet : '', 
                        }}>Dashboard</StyledLink>
                    <StyledLink to="/admin/order-queue"
                         style={{ 
                            backgroundColor: location.pathname == '/admin/order-queue' ? GlobalColors.violet : '', 
                        }}>Order Antrean</StyledLink>
                    <StyledLink to="/admin/order-done"
                         style={{ 
                            backgroundColor: location.pathname == '/admin/order-done' ? GlobalColors.violet : '', 
                        }}>Order Selesai</StyledLink>
                    <StyledLink to="/admin/order-cancel"
                         style={{ 
                            backgroundColor: location.pathname == '/admin/order-cancel' ? GlobalColors.violet : '', 
                        }}>Order Batal</StyledLink>
                    <StyledLink to="/admin/packet"
                         style={{ 
                            backgroundColor: location.pathname == '/admin/packet' ? GlobalColors.violet : '', 
                        }}>Paket</StyledLink>
                </div>
                <ProfileContainer>
                    <img src={Chad} alt="" />
                    <p>{user && user.username}</p>
                    <StyledButton 
                        variant="danger"
                        color={GlobalColors.white}
                        background={GlobalColors.red}
                        fontSize="1.4"
                        height="50"
                        width="140"
                        borderRadius="30"
                        type="submit"
                        onClick={handleLogout}>
                            {isLoading ? 
                                <CircularProgress 
                                    color="inherit" 
                                    style={{fontSize: '1rem' }} /> 
                                : 
                                "Logout"
                            }
                    </StyledButton>
                </ProfileContainer>
            </NavbarAdmin>
        </>
    )
}

export default StyledNavbarAdmin;
