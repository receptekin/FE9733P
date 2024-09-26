
import React from 'react';
import { useLoaderData, Link, Outlet, useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Album arayüzünü tanımlıyoruz
interface Album {
    userId: number;
    id: number;
    title: string;
}

const Albums: React.FC = () => {
    // Loader'dan gelen albüm verisini alıyoruz
    const albums = useLoaderData() as Album[];
    const { userId } = useParams();

    return (
        <Container className="mt-3">
            <Row>
                {albums.map((album) => (
                    <Col md={4} key={album.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{album.title}</Card.Title>
                                {/* Albüm detay sayfasına yönlendiren link */}
                                <Link to={`/users/${userId}/albums/${album.id}`} className="card-link">
                                    View Photos
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* Alt rota içeriklerini render ediyoruz */}
            <Outlet />
        </Container>
    );
};

export default Albums;
