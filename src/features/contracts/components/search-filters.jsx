import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import CompanySelect from "./company-select";

const SearchFilters = (props) => {
  const [form] = Form.useForm();
  return (
    <Form
      className="flex gap-x-3 items-center"
      layout="vertical"
      form={form}
      {...props}
    >
      <Form.Item
        className="w-full"
        label="Document Number"
        name="documentNumber"
      >
        <Input />
      </Form.Item>
      <Form.Item className="w-full" label="Social Reason" name="socialReason">
        <Input />
      </Form.Item>
      <Form.Item className="w-full" label="Company" name="company">
        <CompanySelect allowClear />
      </Form.Item>
      <Button className="mt-1.5" icon={<SearchOutlined />} htmlType="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchFilters;
