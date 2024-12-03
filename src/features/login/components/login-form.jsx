import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { useLogin } from "../../core/hooks/use-login";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const onSuccess = () => {
    message.success("Login successful!");
    navigate("/");
  };
  const onError = () => message.error("Invalid Credentials.");

  return (
    <Form
      onFinish={(params) => login({ ...params, onSuccess, onError })}
      layout="vertical"
      {...props}
    >
      <Form.Item
        label="Usuário"
        name="username"
        rules={[{ required: true, message: "Informe o usuário" }]}
      >
        <Input placeholder="Usuário" />
      </Form.Item>
      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: "Informe a senha" }]}
      >
        <Input.Password placeholder="Senha" />
      </Form.Item>
      <Button
        className="w-full"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        Entrar
      </Button>
    </Form>
  );
};

export default LoginForm;
