
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Users from '../pages/User';
import UserDetail from '../pages/UserDetail';
import Posts from '../pages/Posts';
import PostDetail from '../pages/PostDetail';
import Albums from '../pages/Albums';
import AlbumDetail from '../pages/AlbumDetail';
import Favorites from '../pages/Favorites';
import Todos from '../pages/Todos';



// Rotaları tanımlıyoruz
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Navbar ve genel düzeni içeren Layout bileşeni
        children: [
            {
                path: 'users',
                element: <Users />,
                loader: async () => {
                    const res = await fetch('https://jsonplaceholder.typicode.com/users');
                    if (!res.ok) {
                        throw new Error('Kullanıcılar yüklenemedi');
                    }
                    return res.json();
                },
            },
            {
                path: 'users/:userId',
                element: <UserDetail />,
                loader: async ({ params }) => {
                    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`);
                    if (!res.ok) {
                        throw new Error('Kullanıcı bilgisi yüklenemedi');
                    }
                    return res.json();
                },
                children: [
                    // Posts rotaları
                    {
                        path: 'posts',
                        element: <Posts />,
                        loader: async ({ params }) => {
                            const res = await fetch(
                                `https://jsonplaceholder.typicode.com/users/${params.userId}/posts`
                            );
                            if (!res.ok) {
                                throw new Error('Postlar yüklenemedi');
                            }
                            return res.json();
                        },
                    },
                    {
                        path: 'posts/:postId',
                        element: <PostDetail />,
                        loader: async ({ params }) => {
                            const postRes = await fetch(
                                `https://jsonplaceholder.typicode.com/posts/${params.postId}`
                            );
                            const commentsRes = await fetch(
                                `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
                            );
                            if (!postRes.ok || !commentsRes.ok) {
                                throw new Error('Post veya yorumlar yüklenemedi');
                            }
                            const post = await postRes.json();
                            const comments = await commentsRes.json();
                            return { post, comments };
                        },
                    },
                    // Albums rotaları
                    {
                        path: 'albums',
                        element: <Albums />,
                        loader: async ({ params }) => {
                            const res = await fetch(
                                `https://jsonplaceholder.typicode.com/users/${params.userId}/albums`
                            );
                            if (!res.ok) {
                                throw new Error('Albüm yüklenemedi');
                            }
                            return res.json();
                        },
                    },
                    {
                        path: 'albums/:albumId',
                        element: <AlbumDetail />,
                        loader: async ({ params }) => {
                            const albumRes = await fetch(
                                `https://jsonplaceholder.typicode.com/albums/${params.albumId}`
                            );
                            const photosRes = await fetch(
                                `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
                            );
                            if (!albumRes.ok || !photosRes.ok) {
                                throw new Error('Albüm veya fotoğraflar yüklenemedi');
                            }
                            const album = await albumRes.json();
                            const photos = await photosRes.json();
                            return { album, photos };
                        },
                    },
                    // Todos rotası
                    {
                        path: 'todos',
                        element: <Todos />,
                        loader: async ({ params }) => {
                            const res = await fetch(
                                `https://jsonplaceholder.typicode.com/users/${params.userId}/todos`
                            );
                            if (!res.ok) {
                                throw new Error('Todos yüklenemedi');
                            }
                            return res.json();
                        },
                    },
                ],
            },
            {
                path: 'favorites',
                element: <Favorites />,
            },
            {
                path: '*',
                element: <div className="text-center mt-5">404 - Sayfa Bulunamadı</div>,
            },
        ],
    },
]);

export default router;
