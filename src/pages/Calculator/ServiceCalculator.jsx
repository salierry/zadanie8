import React, { useState } from 'react';
import { Card, Form, InputNumber, Radio, Select, Checkbox, Space, Typography, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const ServiceCalculator = () => {
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState('1');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedProperty, setSelectedProperty] = useState(false);

  const basePrices = {
    '1': 2000, 
    '2': 4500, 
    '3': 25000  
  };

  const optionPrices = {
    'option1': 0,
    'option2': 500,
    'option3': 1000
  };

  const propertyPrice = 30000;

  const calculatePrice = () => {
    let price = basePrices[serviceType] * quantity;

    if (serviceType === '2') {
      price += optionPrices[selectedOption] * quantity;
    }

    if (serviceType === '3' && selectedProperty) {
      price += propertyPrice * quantity;
    }

    return price;
  };

  const totalPrice = calculatePrice();

  const handleServiceTypeChange = (e) => {
    const newType = e.target.value;
    setServiceType(newType);
    
    if (newType !== '2') setSelectedOption('option1');
    if (newType !== '3') setSelectedProperty(false);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value || 1);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.checked);
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>Калькулятор стоимости услуги</Title>
        </div>

        <Form layout="vertical">
          <Form.Item label="Количество:" style={{ marginBottom: 20 }}>
            <InputNumber
              min={1}
              max={100}
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: '120px' }}
              controls={false}
            />
          </Form.Item>

          <Form.Item label="Тип услуги:" style={{ marginBottom: 20 }}>
            <Radio.Group 
              onChange={handleServiceTypeChange} 
              value={serviceType}
            >
              <Space direction="vertical">
                <Radio value="1">Стандартный номер - 2000 руб.</Radio>
                <Radio value="2">Улучшенный номер - 4500 руб.</Radio>
                <Radio value="3">Президентский люкс - 25000 руб.</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* Опции для стандартной услуги */}
          {serviceType === '2' && (
            <Form.Item label="Опция услуги:" style={{ marginBottom: 20 }}>
              <Select
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ width: '100%' }}
              >
                <Option value="option1">стандарт (без доплаты)</Option>
                <Option value="option2">с видом на реку (+500 руб.)</Option>
                <Option value="option3">с балконом (+1000 руб.)</Option>
              </Select>
            </Form.Item>
          )}

          {serviceType === '3' && (
            <Form.Item style={{ marginBottom: 20 }}>
              <Checkbox
                checked={selectedProperty}
                onChange={handlePropertyChange}
              >
                банкет с оркестром (+30000 руб.)
              </Checkbox>
            </Form.Item>
          )}
        </Form>

        <Divider />

        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f6ffed', 
          border: '1px solid #b7eb8f',
          borderRadius: '6px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBotom: '8px' }}>
              Итоговая стоимость:
            </Text>
            <Text style={{ fontSize: '18px', color: '#389e0d', fontWeight: 'bold' }}>
              {totalPrice} руб.
            </Text>
          </div>
          
          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <Text type="secondary">
              {quantity} × {basePrices[serviceType]} руб.
              {serviceType === '2' && selectedOption !== 'option1' && 
                ` + ${optionPrices[selectedOption]} руб.`}
              {serviceType === '3' && selectedProperty && 
                ` + ${propertyPrice} руб.`}
            </Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default ServiceCalculator;