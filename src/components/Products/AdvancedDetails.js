import React from 'react';
import { Card, Form, Row, Col,Button } from 'react-bootstrap';
import CustomDropDown from '../dropdown/CustomDropDown';
//import { useLookupData } from '../../hooks/useLookupData';
// import { fetchUnits, fetchSizeUnits,fetchwarehouse } from '../../services/lookupService';
// import { useProduct } from '../../context/ProductContext'; // ← أهم سطر
import '../../styles/advanceproductCard.css';

const AdvancedDetails = ({ variants, setVariants}) => {
//  const unitOptions = useLookupData(fetchUnits, 'unit_id', 'unit_name');
  // const sizeUnitOptions = useLookupData(fetchSizeUnits, 'size_unit_id', 'size_unit_name');

  // const warehouseOptions = useLookupData(fetchwarehouse, 'id', 'name');
 // const { product, setProduct } = useProduct(); // ← استدعاء الـ context

  // const handleInputChange = (e) => {
  //   setProduct(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }));
  // };

  // const handleUnitChange = (selected) => {
  //   setProduct(prev => ({ ...prev, unit: selected?.value }));
  // };
  //  const handleWarehouseChange = (selected) => {
  //   setProduct(prev => ({ ...prev, warehouse: selected?.value }));
  // };

  // const handleSizeUnitChange = (selected) => {
  //   setProduct(prev => ({ ...prev, size_unit: selected?.value }));
  // };
   const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };
   const addVariant = () => {
    setVariants([
      ...variants,
      {
        quantity_rows: "",
        quantity_per_row: "",
        size_value: "",
        size_unit_id: null,
        location: "",
        warehouse_id: null,
      },
    ]);
  };
  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };


  // const handleChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value,
  //   });
  // };

  return (
    <Card className="outline-card border-0">
      <Card.Body>
        <h5 className="mb-3">تفاصيل إضافية</h5>
        {variants.map((variant, index) => (
          <div key={index} className="mb-4 border rounded p-3 bg-light">
            <Row className="mb-3">
              <Col md={6}>
<Form.Group className="mb-3">
  <Form.Label>الكمية</Form.Label>
  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
    <Form.Control
      type="number"
      value={variant.quantity_rows}
      onChange={(e) => handleVariantChange(index, "quantity_rows", e.target.value)}
      placeholder="عدد الصفوف"
      style={{ maxWidth: "100px" }}
    />
    <span style={{ fontSize: "1.5rem" }}>×</span>
    <Form.Control
      type="number"
      value={variant.quantity_per_row}
      onChange={(e) => handleVariantChange(index, "quantity_per_row", e.target.value)}
      placeholder="عدد القطع"
      style={{ maxWidth: "100px" }}
    />
    <span style={{ fontSize: "1rem", marginInlineStart: "12px" }}>
      الرصيد: <strong>
        {(parseInt(variant.quantity_rows) || 0) * (parseInt(variant.quantity_per_row) || 0)}
      </strong>
    </span>
  </div>
</Form.Group>


              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId={`size_value_${index}`}>
                  <Form.Label>الحجم</Form.Label>
                  <Form.Control
                    type="number"
                    value={variant.size_value}
                    onChange={(e) => handleVariantChange(index, "size_value", e.target.value)}
                    placeholder="أدخل الحجم"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <CustomDropDown
                 
                  label="وحدة الحجم"
                  placeholder="اختر وحدة الحجم"
                  value={variant.size_unit_id}
                  onChange={(val) => handleVariantChange(index, "size_unit_id", val)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId={`location_${index}`}>
                  <Form.Label>الموقع</Form.Label>
                  <Form.Control
                    type="text"
                    value={variant.location}
                    onChange={(e) => handleVariantChange(index, "location", e.target.value)}
                    placeholder="أدخل الموقع"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <CustomDropDown
                 
                  label="المخزن"
                  placeholder="اختر المخزن"
                  value={variant.warehouse_id}
                  onChange={(val) => handleVariantChange(index, "warehouse_id", val)}
                />
              </Col>
            </Row>

            <div className="text-end">
              {variants.length > 1 && (
                <Button variant="danger" size="sm" onClick={() => removeVariant(index)}>
                  حذف المتغير
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button variant="outline-primary" onClick={addVariant}>
          ➕ إضافة متغير جديد
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdvancedDetails;
