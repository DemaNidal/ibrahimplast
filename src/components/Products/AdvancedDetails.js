import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import CustomDropDown from "../dropdown/CustomDropDown";
import "../../styles/advanceproductCard.css";
import { useLookupData } from "../../hooks/useLookupData";
import {
  fetchSizeUnits,
  fetchwarehouse,
  fetchUnits,
} from "../../services/lookupService";
import { useProduct } from "../../context/ProductContext";

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

  const addLocation = () => {
    setProduct((prev) => ({
      ...prev,
      locations: [
        ...(prev.locations || []),
        {
          location: "",
          warehouse_id: null,
        },
      ],
    }));
  };

  const removeLocation = (index) => {
    const updated = product.locations.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, locations: updated }));
  };

  const handleLocationChange = (index, field, value) => {
    const updated = [...product.locations];
    updated[index][field] = value;
    setProduct((prev) => ({ ...prev, locations: updated }));
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

        <h5 className="mb-3">الكميات</h5>
        {(product.quantities || []).map((qty, index) => (
          <div key={index} className="mb-4 border rounded p-3 bg-light">
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>الكمية</Form.Label>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <Form.Control
                      type="number"
                      value={qty.rows}
                      onChange={(e) =>
                        handleQuantityChange(index, "rows", e.target.value)
                      }
                      placeholder="عدد الصفوف"
                      style={{ maxWidth: "100px" }}
                    />
                    <span style={{ fontSize: "1.5rem" }}>×</span>
                    <Form.Control
                      type="number"
                      value={qty.perRow}
                      onChange={(e) =>
                        handleQuantityChange(index, "perRow", e.target.value)
                      }
                      placeholder="عدد القطع"
                      style={{ maxWidth: "100px" }}
                    />
                    <span className="ms-3">
                      الرصيد:
                      <strong className="ms-2">
                        {(parseInt(qty.rows) || 0) *
                          (parseInt(qty.perRow) || 0)}
                      </strong>
                    </span>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-3">
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeQuantity(index)}
              >
                حذف الكمية
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline-primary"
          className="mb-4"
          onClick={addQuantity}
        >
          ➕ إضافة كمية
        </Button>

        <h5 className="mb-3">المواقع</h5>
        {(product.locations || []).map((loc, index) => (
          <div key={index} className="mb-4 border rounded p-3 bg-light">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>الموقع</Form.Label>
                  <Form.Control
                    type="text"
                    value={loc.location}
                    onChange={(e) =>
                      handleLocationChange(index, "location", e.target.value)
                    }
                    placeholder="أدخل الموقع"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <CustomDropDown
                  options={warehouseOptions}
                  value={
                    warehouseOptions.find(
                      (opt) => opt.value === loc.warehouse_id
                    ) || null
                  }
                  onChange={(selected) =>
                    handleLocationChange(
                      index,
                      "warehouse_id",
                      selected?.value || null
                    )
                  }
                  placeholder="اختر المخزن"
                />
              </Col>
            </Row>
            <div className="text-end">
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeLocation(index)}
              >
                حذف الموقع
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline-primary" onClick={addLocation}>
          ➕ إضافة موقع
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdvancedDetails;
