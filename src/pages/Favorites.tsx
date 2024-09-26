
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/useFavoritesStore';


const Favorites: React.FC = () => {
    const favoritePosts = useFavoritesStore((state) => state.favoritePosts);
    const favoritePhotos = useFavoritesStore((state) => state.favoritePhotos);
    const removePost = useFavoritesStore((state) => state.removePost);
    const removePhoto = useFavoritesStore((state) => state.removePhoto);

    return (
        <Container className="mt-4">
            <h2>Favorites</h2>

            {/* Favori Postlar */}
            <h3 className="mt-4">Favorite Posts</h3>
            {favoritePosts.length === 0 ? (
                <p>No favorite posts.</p>
            ) : (
                <Row>
                    {favoritePosts.map((post) => (
                        <Col md={6} key={post.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.body}</Card.Text>
                                    <Link to={`/users/${post.userId}/posts/${post.id}`} className="card-link">
                                        View Post
                                    </Link>
                                    <Button variant="danger" className="ms-2" onClick={() => removePost(post.id)}>
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Favori Fotoğraflar */}
            <h3 className="mt-4">Favorite Photos</h3>
            {favoritePhotos.length === 0 ? (
                <p>No favorite photos.</p>
            ) : (
                <Row>
                    {favoritePhotos.map((photo) => (
                        <Col md={3} key={photo.id} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />
                                <Card.Body>
                                    <Card.Text>{photo.title}</Card.Text>
                                    <Link to={`/users/${photo.albumId}/albums/${photo.albumId}`} className="card-link">
                                        View Album
                                    </Link>
                                    <Button variant="danger" className="ms-2" onClick={() => removePhoto(photo.id)}>
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Favorites;
