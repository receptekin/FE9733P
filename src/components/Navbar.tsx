
import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useFavoritesStore } from '../store/useFavoritesStore';

const NavbarComponent: React.FC = () => {
    const favoritePostsCount = useFavoritesStore((state) => state.favoritePosts.length);
    const favoritePhotosCount = useFavoritesStore((state) => state.favoritePhotos.length);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/users">
                    React JSON Placeholder
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/users">
                            Users
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/favorites">
                            Favorites{' '}
                            <Badge bg="secondary">{favoritePostsCount + favoritePhotosCount}</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
