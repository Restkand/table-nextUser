"use client";

import React, { useEffect, useState } from 'react';
import { Spin, Input, Button, Row, Col, Table } from 'antd';
import axios from 'axios';

interface User {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
}

const { Search } = Input;

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Gunakan parameter default untuk results dan page
      const response = await axios.get('http://localhost:3000/api/users', {
        params: { results: 10, page: 1 },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter data berdasarkan nilai searchTerm pada properti name
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Umur',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Alamat',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'No Telepon 1',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'No Telepon 2',
      dataIndex: 'cell',
      key: 'cell',
    },
    {
      title: 'Gambar',
      dataIndex: 'picture',
      key: 'picture',
      render: (pictures: string[]) => (
        <div>
          {pictures.map((pic, idx) => (
            <img key={idx} src={pic} alt="User Pic" style={{ width: '50px', marginRight: '5px' }} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Search
            placeholder="Search Name"
            enterButton="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={(value) => setSearchTerm(value)}
          />
        </Col>
        <Col>
          <Button onClick={fetchUsers}>Reload Data</Button>
        </Col>
      </Row>

      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="email"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Home;
