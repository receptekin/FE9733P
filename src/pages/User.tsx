
import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';


interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!res.ok) {
                    throw new Error('Kullanıcılar yüklenemedi');
                }
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Loader />; // Yükleniyor ekranı göster
    }

    return (
        <Container className="mt-4">
            <h1>Users</h1>
            <Row>
                {users.map((user) => (
                    <Col md={4} key={user.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
                                <Card.Text>Email: {user.email}</Card.Text>
                                <Link to={`/users/${user.id}`} className="card-link">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Users;
