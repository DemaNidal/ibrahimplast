import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import CustomDropDown from "../dropdown/CustomDropDown";
import "../../styles/advanceproductCard.css";
import { useLookupData } from "../../hooks/useLookupData";
import {
  fetchSizeUnits,
  fetchwarehouse,
  fetchUnits,
} from "../../services/lookupService";
import { useProduct } from "../../context/ProductContext";
import QuantityManager from "./QuantityManager";

const AdvancedDetails = () => {
  const sizeUnitOptions = useLookupData(
    fetchSizeUnits,
    "size_unit_id",
    "size_unit_name"
  );
  const warehouseOptions = useLookupData(fetchwarehouse, "id", "name");
  const unitsOptions = useLookupData(fetchUnits, "unit_id", "unit_name");

  const { product, setProduct } = useProduct();

  const addQuantity = () => {
    setProduct((prev) => ({
      ...prev,
      quantities: [
        ...(prev.quantities || []),
        {
          rows: "",
          perRow: "",
          unit_id: null,
          locations: [], // ✅ locations belong to this quantity
        },
      ],
    }));
  };

  const removeQuantity = (index) => {
    const updated = product.quantities.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, quantities: updated }));
  };

  const handleQuantityChange = (index, field, value) => {
    const updated = [...product.quantities];
    updated[index][field] = value;
    setProduct((prev) => ({ ...prev, quantities: updated }));
  };

  const addLocationToQuantity = (qtyIndex) => {
    const updated = [...product.quantities];
    updated[qtyIndex].locations.push({
      location: "",
      warehouse_id: null,
    });
    setProduct((prev) => ({ ...prev, quantities: updated }));
  };

  const removeLocationFromQuantity = (qtyIndex, locIndex) => {
    const updated = [...product.quantities];
    updated[qtyIndex].locations = updated[qtyIndex].locations.filter(
      (_, i) => i !== locIndex
    );
    setProduct((prev) => ({ ...prev, quantities: updated }));
  };

  const handleLocationChange = (qtyIndex, locIndex, field, value) => {
    const updated = [...product.quantities];
    updated[qtyIndex].locations[locIndex][field] = value;
    setProduct((prev) => ({ ...prev, quantities: updated }));
  };

  return (
    <Card className="outline-card border-0">
      <Card.Body>
        <h5 className="mb-3">الحجم</h5>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>قيمة الحجم</Form.Label>
              <Form.Control
                type="number"
                value={product.size_value || ""}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    size_value: e.target.value,
                  }))
                }
                placeholder="أدخل قيمة الحجم"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <CustomDropDown
                options={sizeUnitOptions}
                value={
                  sizeUnitOptions.find(
                    (opt) => opt.value === product.size_unit_id
                  ) || null
                }
                onChange={(selected) =>
                  setProduct((prev) => ({
                    ...prev,
                    size_unit_id: selected?.value || null,
                  }))
                }
                placeholder="اختر وحدة الحجم"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <CustomDropDown
            options={unitsOptions}
            value={
              unitsOptions.find((opt) => opt.value === product.unit_id) || null
            }
            onChange={(selected) =>
              setProduct((prev) => ({
                ...prev,
                unit_id: selected?.value || null,
              }))
            }
            placeholder="اختر الوحدة"
          />
        </Row>
        <QuantityManager
          quantities={product.quantities || []}
          unitsOptions={unitsOptions}
          warehouseOptions={warehouseOptions}
          onAddQuantity={addQuantity}
          onRemoveQuantity={removeQuantity}
          onQuantityChange={handleQuantityChange}
          onAddLocation={addLocationToQuantity}
          onRemoveLocation={removeLocationFromQuantity}
          onLocationChange={handleLocationChange}
        />
      </Card.Body>
    </Card>
  );
};

export default AdvancedDetails;
