import { useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface User {
    id: number;
    name: string;
}

// Veriyi yüklemek için loader fonksiyonu
export const loader = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
};

const Home = () => {
    const users = useLoaderData() as User[];

    return (
        <div>
            <Navbar /> {/* Navbar ekleniyor */}
            <div className="container">
                <h1>Kullanıcılar</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <a href={`/users/${user.id}`}>{user.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
