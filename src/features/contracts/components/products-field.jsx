import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Table } from "antd";
import { format } from "date-fns";
import React from "react";

const ProductsField = ({ onChange, value }) => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    amount: null,
    installments: null,
    paidInstallments: null,
    finalUnitPrice: 0,
    beginningOfTerm: null,
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.finalUnitPrice) {
      // eslint-disable-next-line no-loop-func
      onChange([...value, newProduct]);
      setNewProduct({ name: "", amount: 1 });
    }
  };

  const handleRemoveProduct = (productName) => {
    onChange(value.filter((product) => product.name !== productName));
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Form.Item className="w-full" label="Product Name">
          <Input
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item className="w-full" label="Amount">
          <InputNumber
            min={1}
            className="w-full"
            value={newProduct.amount}
            onChange={(amount) => setNewProduct({ ...newProduct, amount })}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          label="Final Unit Price (R$)"
          rules={[{ required: true, message: "Enter a final unit price" }]}
        >
          <InputNumber
            className="w-full"
            addonBefore="R$"
            min={0}
            value={newProduct.finalUnitPrice}
            onChange={(finalUnitPrice) =>
              setNewProduct({ ...newProduct, finalUnitPrice })
            }
            precision={2}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Installments">
          <InputNumber
            min={1}
            className="w-full"
            value={newProduct.installments}
            onChange={(installments) =>
              setNewProduct({ ...newProduct, installments })
            }
          />
        </Form.Item>
        <Form.Item className="w-full" label="Paid Installments">
          <InputNumber
            min={1}
            className="w-full"
            value={newProduct.paidInstallments}
            onChange={(paidInstallments) =>
              setNewProduct({ ...newProduct, paidInstallments })
            }
          />
        </Form.Item>
        <Form.Item className="w-full" label="Beginning of Term">
          <DatePicker
            value={newProduct.beginningOfTerm}
            onChange={(beginningOfTerm) =>
              setNewProduct({ ...newProduct, beginningOfTerm })
            }
            className="w-full"
          />
        </Form.Item>
        <Button
          className="mt-1.5"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Add
        </Button>
      </div>
      <Table
        dataSource={value}
        columns={[
          { title: "Product", dataIndex: "name", key: "name" },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text) => text || "-",
          },
          {
            title: "Final Unit Price",
            dataIndex: "finalUnitPrice",
            key: "finalUnitPrice",
            render: (price) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(price),
          },
          {
            title: "Installments",
            dataIndex: "installments",
            key: "installments",
            render: (text) => text || "N/A",
          },
          {
            title: "Paid Installments",
            dataIndex: "paidInstallments",
            key: "paidInstallments",
            render: (text) => text || "N/A",
          },
          {
            title: "Beginning of Term",
            dataIndex: "beginningOfTerm",
            key: "beginningOfTerm",
            render: (isoString) => format(isoString, "dd/MM/yyyy"),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Button danger onClick={() => handleRemoveProduct(record.name)}>
                <DeleteOutlined />
              </Button>
            ),
          },
        ]}
        rowKey="name"
        pagination={false}
      />
    </div>
  );
};

export default ProductsField;
