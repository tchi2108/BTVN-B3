import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Alert, Row, Col, Typography } from "antd";
import "./App.css";

const { Title, Text } = Typography;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Title level={2} className="title">
        Danh sách người dùng
      </Title>

      {/* Loading */}
      {loading && (
        <div className="center">
          <Spin size="large" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert message={error} type="error" showIcon />
      )}

      {/* Danh sách users */}
      {!loading && !error && (
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <Card hoverable className="user-card">
                <Title level={4}>{user.name}</Title>
                <Text>Email: {user.email}</Text>
                <br />
                <Text>Phone: {user.phone}</Text>
                <br />
                <Text>Website: {user.website}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default App;
