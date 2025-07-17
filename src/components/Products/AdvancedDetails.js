import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
import { useLookupData } from '../../hooks/useLookupData';
import { fetchUnits, fetchSizeUnits,fetchwarehouse } from '../../services/lookupService';
import { useProduct } from '../../context/ProductContext'; // ← أهم سطر
import '../../styles/advanceproductCard.css';

const AdvancedDetails = () => {
  const unitOptions = useLookupData(fetchUnits, 'unit_id', 'unit_name');
  const sizeUnitOptions = useLookupData(fetchSizeUnits, 'size_unit_id', 'size_unit_name');

  const warehouseOptions = useLookupData(fetchwarehouse, 'id', 'name');
  const { product, setProduct } = useProduct(); // ← استدعاء الـ context

  const handleInputChange = (e) => {
    setProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUnitChange = (selected) => {
    setProduct(prev => ({ ...prev, unit: selected?.value }));
  };
   const handleWarehouseChange = (selected) => {
    setProduct(prev => ({ ...prev, warehouse: selected?.value }));
  };

  const handleSizeUnitChange = (selected) => {
    setProduct(prev => ({ ...prev, size_unit: selected?.value }));
  };

  return (
    <Card className="outline-card border-0">
      <Card.Body>
        <h5 className="mb-3">تفاصيل المنتج</h5>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>الكمية</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                  placeholder="أدخل الكمية"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <CustomDropDown
                options={unitOptions}
                label="وحدة الكمية"
                placeholder="اختر الوحدة"
                onChange={handleUnitChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="size_value">
                <Form.Label>الحجم</Form.Label>
                <Form.Control
                  type="number"
                  name="size_value"
                  value={product.size_value}
                  onChange={handleInputChange}
                  placeholder="أدخل الحجم"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <CustomDropDown
                options={sizeUnitOptions}
                label="وحدة الحجم"
                placeholder="اختر الوحدة"
                onChange={handleSizeUnitChange}
              />
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={6} >
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>الموقع</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={product.location}
                  onChange={handleInputChange}
                  placeholder="أدخل موقع المنتج"
                />

              </Form.Group>
            </Col>
            <Col md={6}>
              <CustomDropDown
                options={warehouseOptions}
                label="المخزن"
                placeholder="اختر المخزن"
                onChange={handleWarehouseChange}
              />
            </Col>

          </Row>

        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdvancedDetails;
