import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Button, Input, Typography, Row, Col, notification } from 'antd';
import TodoTable, { TodoType } from '../components/todo/TodoTable';

let todoId = 0;

function TodoPage() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (!title) {
      notification.error({
        message: 'Unable to submit',
        description: 'Please input the title of the ToDo',
      });
      return;
    }

    todoId = todoId + 1;
    const newTodo = {
      id: todoId,
      title,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const handleDelete = (record: TodoType) => {
    const filteredTodos = todos.filter((todo) => todo.id !== record.id);
    setTodos(filteredTodos);
  }

  return (
    <div>
      <Row style={{ padding: 15 }}>
        <Col span={24}>
          <Typography.Title>
            ToDo App
          </Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: 15, padding: 15 }}>
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 200px)' }}
            value={title}
            onChange={handleOnChangeTitle}
          />
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Input.Group>
      </Row>
      <Row style={{ padding: 15 }}>
        <TodoTable data={todos} onDelete={handleDelete} />
      </Row>
    </div>
  );
}

export default TodoPage;
