import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Barcode from 'react-barcode';

const BarcodeCard = ({ itemId }) => {
  const [generated, setGenerated] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateBarcode = () => {
    if (!itemId) {
      setMessage('يجب حفظ المنتج أولًا قبل إنشاء الباركود.');
      return;
    }

    setMessage('');
    setGenerated(true);
  };

  return (
    <Card
      className="mt-3"
      style={{
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Card.Body>
        <Card.Title>الباركود</Card.Title>

        {message && <Alert variant="warning">{message}</Alert>}

        <Form.Group controlId="barcode">
          <Form.Label>رقم الباركود</Form.Label>
          <Form.Control
            type="text"
            placeholder="سيظهر بعد الحفظ"
            value={itemId || ''}
            readOnly
          />
        </Form.Group>

        <Button
          className="mt-3"
          onClick={handleGenerateBarcode}
          disabled={!itemId}
        >
          حفظ وإنشاء باركود
        </Button>

        {generated && itemId && (
          <div className="mt-3 text-center">
            <Barcode value={itemId} />
            <p className="text-muted mt-3">تم إنشاء الباركود: {itemId}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BarcodeCard;
