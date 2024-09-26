
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useFavoritesStore } from '../store/useFavoritesStore';


// Album ve Photo arayüzlerini tanımlıyoruz
interface Album {
    userId: number;
    id: number;
    title: string;
}

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface LoaderData {
    album: Album;
    photos: Photo[];
}

const AlbumDetail: React.FC = () => {
    // Loader'dan gelen albüm ve fotoğraf verilerini alıyoruz
    const { album, photos } = useLoaderData() as LoaderData;
    const { userId } = useParams();

    // Favorilere ekleme ve kaldırma fonksiyonlarını alıyoruz
    const addPhoto = useFavoritesStore((state) => state.addPhoto);
    const removePhoto = useFavoritesStore((state) => state.removePhoto);
    const favoritePhotos = useFavoritesStore((state) => state.favoritePhotos);

    // Bir fotoğrafın favoride olup olmadığını kontrol ediyoruz
    const isFavorited = (photoId: number) => {
        return favoritePhotos.some((photo) => photo.id === photoId);
    };

    return (
        <Container className="mt-4">
            {/* Albüm bilgilerini gösteriyoruz */}
            <h2>{album.title}</h2>
            <Row>
                {photos.map((photo) => (
                    <Col md={3} key={photo.id} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />
                            <Card.Body>
                                <Card.Text>{photo.title}</Card.Text>
                                {/* Favori ekleme/kaldırma butonu */}
                                <Button
                                    variant={isFavorited(photo.id) ? 'danger' : 'outline-danger'}
                                    className="ms-2"
                                    onClick={() => {
                                        if (isFavorited(photo.id)) {
                                            removePhoto(photo.id);
                                        } else {
                                            addPhoto(photo);
                                        }
                                    }}
                                >
                                    {isFavorited(photo.id) ? 'Unfavorite' : 'Favorite'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AlbumDetail;
