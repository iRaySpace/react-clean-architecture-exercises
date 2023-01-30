import React from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface TodoType {
    id: number;
    title: string;
}

interface TodoTableProps {
    data?: TodoType[];
    onDelete?: (record: TodoType) => void;
}

function getColumns(onDelete?: (record: TodoType) => void): ColumnsType<TodoType> {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button danger onClick={() => {
                            onDelete && onDelete(record)
                        }}>
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];
}

function TodoTable({ data, onDelete }: TodoTableProps) {
    return (
        <Table
            rowKey="id"
            size="large"
            columns={getColumns(onDelete)}
            dataSource={data}
        />
    );
}

export default TodoTable;
