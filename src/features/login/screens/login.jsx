import { Button, Form, Input, message } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../contexts/login-context";
import { api } from "../../../lib/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email: username, password });
      const token = response?.data?.token || "";
      setUser({ token });
      localStorage.setItem("token", token);
      message.success("Login bem-sucedido!");
      navigate("/");
    } catch (error) {
      message.error("Credenciais inválidas.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Informe o usuário" }]}
      >
        <Input placeholder="Usuário" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Informe a senha" }]}
      >
        <Input.Password placeholder="Senha" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Entrar
      </Button>
    </Form>
  );
};

export default Login;
