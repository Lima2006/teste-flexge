import { Button, Form, Input, message } from "antd";
import React from "react";

import { useLogin } from "../../core/hooks/use-login";

const Login = () => {
  const { login, isLoading } = useLogin();

  const onSuccess = () => message.success("Login bem-sucedido!");
  const onError = () => message.error("Credenciais inválidas.");

  return (
    <Form onFinish={(params) => login({ ...params, onSuccess, onError })}>
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
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Entrar
      </Button>
    </Form>
  );
};

export default Login;
