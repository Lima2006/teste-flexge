import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import CompanySelect from "./company-select";
import ProductsField from "./products-field";

const ContractForm = ({ className, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = React.useState(initialValues?.products || []);
  const [selectedCountry, setSelectedCountry] = React.useState("");

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dates: {
          ...initialValues.dates,
          contractStartsIn: initialValues.dates?.contractStartsIn
            ? dayjs(initialValues.dates.contractStartsIn)
            : null,
          contractEndsIn: initialValues.dates?.contractEndsIn
            ? dayjs(initialValues.dates.contractEndsIn)
            : null,
        },
      });
    }
  }, [initialValues, form]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    form.setFieldsValue({ state: "" });
  };

  const handleFinish = (values) => {
    onSubmit({
      ...values,
      products: products.map((product) => ({
        ...product,
        beginningOfTerm: product.beginningOfTerm?.toISOString?.(),
      })),
      dates: {
        ...values.dates,
        contractStartsIn: values.dates?.contractStartsIn?.toISOString?.(),
        contractEndsIn: values.dates?.contractEndsIn?.toISOString?.(),
      },
    });
  };
  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form
      className={className}
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <div className="flex gap-x-3">
        <Form.Item
          className="w-full"
          label="Country"
          name="country"
          rules={[{ required: true, message: "Enter the country" }]}
        >
          <Select placeholder="Select a country" onChange={handleCountryChange}>
            {countries.map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="w-full"
          label="State"
          name="state"
          rules={[{ required: !!selectedCountry, message: "Enter the state" }]}
        >
          <Select placeholder="Select a state" disabled={!selectedCountry}>
            {countries
              .find((country) => country.value === selectedCountry)
              ?.states?.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="w-full"
          label="City"
          name="city"
          rules={[{ required: true, message: "Enter the state" }]}
        >
          <Input placeholder="Example: São Paulo" />
        </Form.Item>
      </div>
      <div className="flex gap-x-3">
        <Form.Item
          className="w-full"
          label="Document Number"
          name="documentNumber"
          rules={[{ required: true, message: "Enter a document number" }]}
        >
          <Input placeholder="Example: 44556677889" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Social Reason"
          name="socialReason"
          rules={[{ required: true, message: "Enter a social reason" }]}
        >
          <Input placeholder="Example: Bright Solutions Ltda" />
        </Form.Item>
      </div>
      <div className="flex gap-x-3">
        <Form.Item
          className="w-full"
          label="Address"
          name="address"
          rules={[{ required: true, message: "Enter a address" }]}
        >
          <Input placeholder="Example: Avenida Sete de Setembro, 1234" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="District"
          name="district"
          rules={[{ required: true, message: "Enter a district" }]}
        >
          <Input placeholder="Example: Barra" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Number"
          name="number"
          rules={[{ required: true, message: "Enter a number" }]}
        >
          <Input placeholder="Example: 1234" />
        </Form.Item>
      </div>
      <div className="flex gap-x-3">
        <Form.Item
          className="w-full"
          label="Zip code"
          name="zipCode"
          rules={[{ required: true, message: "Enter a zip code" }]}
        >
          <Input placeholder="Example: 40140-110" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Enter a valid email" },
            { required: true, message: "Enter a email" },
          ]}
        >
          <Input placeholder="Example: contact@bright-solutions.com" />
        </Form.Item>

        <Form.Item className="w-full" label="Phone" name="phone">
          <Input placeholder="Example: +55 71 91234-5678" />
        </Form.Item>
      </div>
      <div className="flex gap-x-3">
        <Form.Item
          className="w-full"
          label="Contracts starts in"
          name={["dates", "contractStartsIn"]}
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" placeholder="Select a start date" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Contracts ends in"
          name={["dates", "contractEndsIn"]}
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" placeholder="Select a end date" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Due day"
          name={["dates", "dueDay"]}
        >
          <InputNumber
            min={1}
            max={31}
            placeholder="Example: 10"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          label="Upload the contract"
          name="fileUrl"
        >
          <Input placeholder="Remote file url" />
        </Form.Item>
      </div>
      <Form.Item
        label="Company"
        name="company"
        rules={[{ required: true, message: "Select a company" }]}
      >
        <CompanySelect placeholder="Select a company" />
      </Form.Item>
      <span className="text-2xl font-bold">Contract's Products</span>
      <hr className="mb-4 mt-2" />
      <ProductsField value={products} onChange={setProducts} />
      <div className="flex justify-end gap-x-3 mt-4">
        <Button
          icon={<RollbackOutlined />}
          type="secondary"
          htmlType="button"
          onClick={handleReset}
        >
          Discard Changes
        </Button>
        <Button icon={<EditOutlined />} type="primary" htmlType="submit">
          {initialValues ? "Edit Contract" : "Create Contract"}
        </Button>
      </div>
    </Form>
  );
};

export default ContractForm;

const countries = [
  {
    value: "Brazil",
    label: "Brazil",
    states: [
      { value: "Bahia", label: "Bahia" },
      { value: "São Paulo", label: "São Paulo" },
      { value: "Rio de Janeiro", label: "Rio de Janeiro" },
    ],
  },
  {
    value: "USA",
    label: "USA",
    states: [
      { value: "California", label: "California" },
      { value: "Texas", label: "Texas" },
      { value: "New York", label: "New York" },
    ],
  },
  {
    value: "Canada",
    label: "Canada",
    states: [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "Rio de Janeiro" },
    ],
  },
];
