import React,{useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import ThumbnailCard from './ThumbnailCard';
import GeneralForm from './GeneralForm';
import PricingCard from './PricingCard';
import MadeFromCard from './MadeFromCard';
import ColorCard from './ColorCard';
import ProductDetails from './ProductDetails';
import AdvancedDetails from './AdvancedDetails';
import { useProduct } from '../../context/ProductContext';
import { createProduct } from '../../services/productService';



const ProductForm = () => {
 const { product } = useProduct();

const handleSave = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      if (key !== 'imageFile' && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    if (product.imageFile) {
      formData.append('image', product.imageFile);
    }

    await createProduct(formData);
    alert('تمت إضافة المنتج بنجاح ✅');
    
  } catch (error) {
    console.error(error);
    alert('حدث خطأ أثناء إضافة المنتج ❌');
  }
};


  const handleCancel = () => {
    // 🧠 TODO: احذف التغييرات أو أرجع للصفحة السابقة
    console.log("تم الضغط على إلغاء");
  };
const [variants, setVariants] = useState([
  {
    quantity_rows: "",
    quantity_per_row: "",
    size_value: "",
    size_unit_id: null,
    location: "",
    warehouse_id: null,
  },
]);
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
          <AdvancedDetails variants={variants} setVariants={setVariants}/>
          
        </Col>
      </Row>


  <div className="d-flex justify-content-end gap-3">
    <Button variant="warning" size="s" onClick={handleSave}>
      💾 حفظ التغييرات
    </Button>
    <Button variant="secondary" size="s" onClick={handleCancel}>
      إلغاء
    </Button>
  </div>


    </Container>
  );
};

export default ProductForm;
