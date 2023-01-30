import { TodoEntity } from "../domain/entities/todo";
import { TodoRepository } from "../domain/repositories/todo";

let _id = 0;

function _getTodosFromLocal(): any[] {
    const todosUnserialized = localStorage.getItem("todos");
    return todosUnserialized ? JSON.parse(todosUnserialized) : [];
}

function _setTodosToLocal(data: any[]) {
    localStorage.setItem("todos", JSON.stringify(data));
}

export class TodoLocalDataRepository implements TodoRepository {
    addTodo(title: string): Promise<TodoEntity> {
        const entity = new TodoEntity(_id, title);
        const todos = _getTodosFromLocal();
        todos.push(TodoEntity.toJSON(entity));
        _setTodosToLocal(todos);
        _id = _id + 1;
        return Promise.resolve(entity);
    }

    removeTodo(id: number): Promise<void> {
        const todos = _getTodosFromLocal();
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        _setTodosToLocal(filteredTodos);
        return Promise.resolve();
    }

    updateTodo(changedTodo: TodoEntity): Promise<void> {
        const todos = _getTodosFromLocal();
        const oldTodo = todos.find((todo) => todo.getId() === changedTodo.getId());
        if (oldTodo) {
            oldTodo.replaceWith(changedTodo);
        }
        return Promise.resolve();
    }

    getAllTodos(): Promise<TodoEntity[]> {
        const todos = _getTodosFromLocal().map((todo) => TodoEntity.fromJSON(todo));
        return Promise.resolve(todos);
    }

    getTodo(id: number): Promise<TodoEntity | null> {
        const todos = _getTodosFromLocal().map((todo) => TodoEntity.fromJSON(todo));
        const existingTodo = todos.find((todo) => todo.getId() === id);
        return existingTodo ? Promise.resolve(existingTodo) : Promise.resolve(null);
    }

    reset(): Promise<void> {
        _id = 0;
        _setTodosToLocal([]);
        return Promise.resolve();
    }
}