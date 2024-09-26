
import React from 'react';
import { useLoaderData, Outlet, NavLink, useParams } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

const UserDetail: React.FC = () => {
    const user = useLoaderData() as User;
    const { userId } = useParams();

    return (
        <Container className="mt-4">
            <h2>
                {user.name} (@{user.username})
            </h2>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Phone:</strong> {user.phone}
            </p>
            <p>
                <strong>Website:</strong>{' '}
                <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
                    {user.website}
                </a>
            </p>

            <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                    <Nav.Link as={NavLink} to={`/users/${userId}/posts`}>
                        Posts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to={`/users/${userId}/albums`}>
                        Albums
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to={`/users/${userId}/todos`}>
                        Todos
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <Outlet />
        </Container>
    );
};

export default UserDetail;
