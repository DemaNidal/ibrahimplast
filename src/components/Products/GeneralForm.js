import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useProduct } from '../../context/ProductContext'; // استخدام الـ context

const GeneralForm = () => {
  const { product, setProduct } = useProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card
      className="outline-card border-0" 
    >
      <Card.Body >
        <h5 className="mb-3">عام</h5>
        <Form>
          {/* اسم المنتج */}
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>
              اسم المنتج <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name || ''}
              onChange={handleChange}
              placeholder="ادخل اسم مناسب للمنتج"
            />
            <Form.Text className="text-muted">
              هذا الحقل مطلوب. يساعدك لاحقا في عمليات البحث
            </Form.Text>
          </Form.Group>

          {/* وصف المنتج */}
          <Form.Group controlId="productDescription">
            <Form.Label>وصف المنتج</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              placeholder="اكتب نصك هنا ...."
            />
            <Form.Text className="text-muted">
              قم بإضافة وصف لهذا المنتج
            </Form.Text>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default GeneralForm;
