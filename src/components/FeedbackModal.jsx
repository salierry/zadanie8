import React, { useEffect } from 'react';
import { Modal, Form, Input, Checkbox, Button, message } from 'antd';
import { sendFeedback } from '../services/formService';

const STORAGE_KEY = 'feedback_form_values';

const FeedbackModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  // восстановление из localStorage при открытии
  useEffect(() => {
    if (visible) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          form.setFieldsValue(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, [visible, form]);

  // автосохранение в localStorage при изменениях
  const handleValuesChange = (_, allValues) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allValues));
  };

  const onFinish = async (values) => {
    try {
      await sendFeedback(values);
      message.success('Сообщение отправлено');
      form.resetFields();
      localStorage.removeItem(STORAGE_KEY);
      onClose();
    } catch (err) {
      console.error(err);
      message.error('Ошибка при отправке. Попробуйте ещё раз.');
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="feedback-modal"
      styles={{ body: { padding: 20, maxHeight: '80vh', overflow: 'auto' } }}
      width={600}
    >
      <h2>Обратная связь</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <Form.Item name="name" label="ФИО" rules={[{ required: true, message: 'Введите ФИО' }]}>
          <Input placeholder="ФИО" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true, message: 'Введите корректный email' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите телефон' }]}>
          <Input placeholder="Телефон" inputMode="numeric" />
        </Form.Item>

        <Form.Item name="org" label="Организация">
          <Input placeholder="Организация" />
        </Form.Item>

        <Form.Item name="message" label="Сообщение" rules={[{ required: true, message: 'Напишите сообщение' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject('Нужно согласие') }]}
        >
          <Checkbox>Согласен(на) на обработку персональных данных</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;
