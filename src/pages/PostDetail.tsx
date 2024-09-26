
import React from 'react';
import { useLoaderData, Link, useParams } from 'react-router-dom';
import { Container, Card, ListGroup } from 'react-bootstrap';

// Post ve Comment arayüzlerini tanımlıyoruz
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface LoaderData {
    post: Post;
    comments: Comment[];
}

const PostDetail: React.FC = () => {
    // Loader'dan gelen post ve yorum verilerini alıyoruz
    const { post, comments } = useLoaderData() as LoaderData;
    const { userId } = useParams();

    return (
        <Container className="mt-4">
            {/* Post bilgilerini gösteriyoruz */}
            <Card>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By User {post.userId}</Card.Subtitle>
                    <Card.Text>{post.body}</Card.Text>
                    {/* Kullanıcı profil sayfasına geri dönme linki */}
                    <Link to={`/users/${userId}`} className="card-link">
                        Back to User Profile
                    </Link>
                </Card.Body>
            </Card>

            {/* Yorumları listeliyoruz */}
            <h3 className="mt-4">Comments</h3>
            <ListGroup>
                {comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                        <h5>{comment.name} <small className="text-muted">({comment.email})</small></h5>
                        <p>{comment.body}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default PostDetail;
