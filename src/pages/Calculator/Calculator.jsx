import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Alert, Card, Space, Typography, Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import ServiceCalculator from './ServiceCalculator'; 

const { Title, Text } = Typography;
const { Option } = Select;

const Calculator = () => {
  const [quantity, setQuantity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'биг мак', price: 240 },
    { id: 2, name: 'чикенбургер', price: 80 },
    { id: 3, name: 'чизбургер', price: 100 },
    { id: 4, name: 'картошока', price: 140 },
    { id: 5, name: 'кола', price: 130 },
  ];

  const quantityRegex = /^\d+$/;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleCalculate = () => {
    setError('');
    setTotal(null);

    if (!quantity) {
      setError('Введите количество товара');
      return;
    }

    if (!quantityRegex.test(quantity)) {
      setError('нормально вводи');
      return;
    }

    if (!selectedProduct) {
      setError('Выберите товар');
      return;
    }

    const quantityNum = parseInt(quantity, 10);
    
    if (quantityNum <= 0) {
      setError('Количество должно быть больше 0');
      return;
    }

    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (product) {
      const calculatedTotal = quantityNum * product.price;
      setTotal(calculatedTotal);
    }
  };

  const handleReset = () => {
    setQuantity('');
    setSelectedProduct('');
    setTotal(null);
    setError('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Калькулятор стоимости заказа</Title>
          </div>

          <Form layout="vertical">
            <Form.Item 
              label="Количество товара:" 
              required
              validateStatus={error && !quantityRegex.test(quantity) ? 'error' : ''}
              help={error && !quantityRegex.test(quantity) ? error : ''}
            >
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Введите количество"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item 
              label="Выберите товар:" 
              required
              validateStatus={error && !selectedProduct ? 'error' : ''}
              help={error && !selectedProduct ? error : ''}
            >
              <Select
                value={selectedProduct}
                onChange={setSelectedProduct}
                placeholder="Выберите товар из списка"
                style={{ width: '100%' }}
              >
                {products.map(product => (
                  <Option key={product.id} value={product.id}>
                    {product.name} - {product.price} руб.
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
              <Space size="middle">
                <Button 
                  type="primary" 
                  onClick={handleCalculate}
                  size="large"
                >
                  Рассчитать стоимость
                </Button>
                <Button 
                  onClick={handleReset}
                  size="large"
                >
                  Сбросить
                </Button>
              </Space>
            </Form.Item>
          </Form>

          {error && error.includes('Выберите товар') && (
            <Alert message={error} type="error" showIcon />
          )}

          {total !== null && (
            <Alert
              message={
                <div>
                  <Text strong>Стоимость заказа: </Text>
                  <Text style={{ fontSize: '18px', color: '#1890ff' }}>
                    {total} руб.
                  </Text>
                  <br />
                  <Text type="secondary">
                    ({quantity} × {
                      products.find(p => p.id === parseInt(selectedProduct))?.price
                    } руб.)
                  </Text>
                </div>
              }
              type="success"
              showIcon
            />
          )}
        </Space>
      </Card>

      <Divider />

      <ServiceCalculator />
    </div>
  );
};

export default Calculator;