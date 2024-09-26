
import React from 'react';
import { useLoaderData, Link, Outlet, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useFavoritesStore } from '../store/useFavoritesStore';


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Posts: React.FC = () => {
    const posts = useLoaderData() as Post[];
    const { userId } = useParams();

    const addPost = useFavoritesStore((state) => state.addPost);
    const removePost = useFavoritesStore((state) => state.removePost);
    const favoritePosts = useFavoritesStore((state) => state.favoritePosts);

    const isFavorited = (postId: number) => {
        return favoritePosts.some((post) => post.id === postId);
    };

    return (
        <Container className="mt-3">
            <Row>
                {posts.map((post) => (
                    <Col md={6} key={post.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <Link to={`/users/${userId}/posts/${post.id}`} className="card-link">
                                    View Comments
                                </Link>
                                <Button
                                    variant={isFavorited(post.id) ? 'danger' : 'outline-danger'}
                                    className="ms-2"
                                    onClick={() => {
                                        if (isFavorited(post.id)) {
                                            removePost(post.id);
                                        } else {
                                            addPost(post);
                                        }
                                    }}
                                >
                                    {isFavorited(post.id) ? 'Unfavorite' : 'Favorite'}
                                </Button>
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

export default Posts;
