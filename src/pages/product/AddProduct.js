

import { ProductProvider } from '../../context/ProductContext';
import ProductForm from '../../components/Products/ProductForm';

const AddProductPage = () => {
  return (
    <>
    <ProductProvider>
     
      <ProductForm />
    </ProductProvider>
    </>
  );
};

export default AddProductPage;
