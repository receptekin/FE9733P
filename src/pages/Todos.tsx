
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, ListGroup, Badge } from 'react-bootstrap';

// Todo arayüzünü tanımlıyoruz
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const Todos: React.FC = () => {
    // Loader'dan gelen todos verisini alıyoruz
    const todos = useLoaderData() as Todo[];

    return (
        <Container className="mt-3">
            <h3>Todos</h3>
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id}>
                        {todo.title}{' '}
                        {todo.completed ? (
                            <Badge bg="success">Completed</Badge>
                        ) : (
                            <Badge bg="warning">Pending</Badge>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Todos;
