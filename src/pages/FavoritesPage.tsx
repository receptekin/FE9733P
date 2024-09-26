import { useFavoritesStore } from '../store/useFavoritesStore';
import Navbar from '../components/Navbar';

const FavoritesPage = () => {
    const photos = useFavoritesStore((state) => state.photos);
    const posts = useFavoritesStore((state) => state.posts);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Favoriler</h1>
                <h2>Fotoğraflar</h2>
                <ul>
                    {photos.map((photo) => (
                        <li key={photo.id}>{photo.title}</li>
                    ))}
                </ul>
                <h2>Postlar</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.postId}>{post.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FavoritesPage;
