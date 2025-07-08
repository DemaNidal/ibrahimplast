import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import ThumbnailCard from './ThumbnailCard';
import GeneralForm from './GeneralForm';
import PricingCard from './PricingCard';
import MadeFromCard from './MadeFromCard';
import ColorCard from './ColorCard';
import ProductDetails from './ProductDetails';
import AdvancedDetails from './AdvancedDetails';
import BarcodeCard from './Barcode';

const ProductForm = () => {
  // مستقبلاً: هنا ممكن تضيف useState لتجميع formData من كل كرت

  const handleSave = () => {
    // 🧠 TODO: اجمع كل البيانات وارسِلها للـ API
    console.log("تم الضغط على حفظ التغييرات");
  };

  const handleCancel = () => {
    // 🧠 TODO: احذف التغييرات أو أرجع للصفحة السابقة
    console.log("تم الضغط على إلغاء");
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
    >
      <Row className="mb-4 g-4">
        <Col md={3}>
          <ThumbnailCard />
          <MadeFromCard />
          <ColorCard />
          <ProductDetails />
        </Col>

        <Col md={9} className="d-flex flex-column" style={{ gap: '20px' }}>
          <GeneralForm />
          <PricingCard />
          <AdvancedDetails />
          <BarcodeCard itemId={null} /> {/* مرر itemId إذا المنتج محفوظ */}
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end" style={{ gap: '16px' }}>
          <Button variant="primary" size="lg" onClick={handleSave}>
            💾 حفظ التغييرات
          </Button>
          <Button variant="secondary" size="lg" onClick={handleCancel}>
            إلغاء
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
