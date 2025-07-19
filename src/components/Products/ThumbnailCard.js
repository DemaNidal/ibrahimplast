import React, { useRef } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useProduct } from '../../context/ProductContext';

const ThumbnailCard = () => {
  const { product, setProduct } = useProduct();
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);

      setProduct(prev => ({
        ...prev,
        image: imageUrl,       // 👈 هذا فقط للعرض
        imageFile: file,       // ✅ هذا هو اللي رح نرسله للباك
      }));
    } else {
      alert('يرجى اختيار صورة بصيغة PNG أو JPG أو JPEG');
    }
  };


  return (
    <Card

      className="mb-4 outline-card border-0"
    >
      <Card.Body className="text-center">
        <Card.Title>صورة المنتج</Card.Title>

        <div
          className="position-relative mx-auto mb-3"
          style={{
            width: '170px',
            height: '170px',
            backgroundColor: '#f1f1f1',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {product.image ? (
            <img
              src={product.image}
              alt="Thumbnail"
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                backgroundColor: 'white', borderRadius: '16px'
              }}
            />
          ) : (
            <i className="bi bi-image" style={{ fontSize: '80px', color: '#cccccc' }}></i>
          )}

          <div
            className="position-absolute top-0 end-0"
            style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
            }}
          >
            <i className="bi bi-pencil" style={{ fontSize: '14px', color: '#555' }}></i>
          </div>
        </div>

        {/* input مخفي */}
        <Form.Group controlId="imageUpload" className="mb-3" style={{ display: 'none' }}>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </Form.Group>

        <small className="text-muted">
          قم بوضع صورة مصغرة للمنتج. يدعم فقط الملفات بامتداد *png, *jpg, *jpeg.
        </small>
      </Card.Body>
    </Card>
  );
};

export default ThumbnailCard;
