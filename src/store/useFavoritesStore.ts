
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Favori durum arayüzü
interface FavoritesState {
    photos: any;
    posts: any;
    favoritePosts: Post[];
    favoritePhotos: Photo[];
    addPost: (post: Post) => void;
    removePost: (postId: number) => void;
    addPhoto: (photo: Photo) => void;
    removePhoto: (photoId: number) => void;
}

// Post ve Photo arayüzlerini tanımlayın
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoritePosts: [],
            favoritePhotos: [],

            addPost: (post) => {
                set({ favoritePosts: [...get().favoritePosts, post] });
            },
            removePost: (postId) => {
                set({
                    favoritePosts: get().favoritePosts.filter((post) => post.id !== postId),
                });
            },
            addPhoto: (photo) => {
                set({ favoritePhotos: [...get().favoritePhotos, photo] });
            },
            removePhoto: (photoId) => {
                set({
                    favoritePhotos: get().favoritePhotos.filter((photo) => photo.id !== photoId),
                });
            },
        }),
        {
            name: 'favorites-storage', // localStorage'da kullanılacak isim
            // storage: createJSONStorage(() => localStorage), // Gerekli değil, varsayılan olarak localStorage kullanır
        }
    )
);
