import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CustomDropDown from "../dropdown/CustomDropDown";

const QuantityManager = ({
  quantities = [],
  unitsOptions = [],
  warehouseOptions = [],
  onAddQuantity,
  onRemoveQuantity,
  onQuantityChange,
  onAddLocation,
  onRemoveLocation,
  onLocationChange,
}) => {
  return (
    <>
      <h5 className="mb-3">الكميات</h5>
      {(quantities || []).map((qty, index) => (
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
                      onQuantityChange(index, "rows", e.target.value)
                    }
                    placeholder="عدد الصفوف"
                    style={{ maxWidth: "100px" }}
                  />
                  <span style={{ fontSize: "1.5rem" }}>×</span>
                  <Form.Control
                    type="number"
                    value={qty.perRow}
                    onChange={(e) =>
                      onQuantityChange(index, "perRow", e.target.value)
                    }
                    placeholder="عدد القطع"
                    style={{ maxWidth: "100px" }}
                  />
                  <span className="ms-3">
                    الرصيد:
                    <strong className="ms-2">
                      {(parseInt(qty.rows) || 0) * (parseInt(qty.perRow) || 0)}
                    </strong>
                  </span>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Locations */}
          <h6>المواقع</h6>
          {(qty.locations || []).map((loc, locIndex) => (
            <Row key={locIndex} className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>الموقع</Form.Label>
                  <Form.Control
                    type="text"
                    value={loc.location}
                    onChange={(e) =>
                      onLocationChange(index, locIndex, "location", e.target.value)
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
                    onLocationChange(
                      index,
                      locIndex,
                      "warehouse_id",
                      selected?.value || null
                    )
                  }
                  placeholder="اختر المخزن"
                />
              </Col>
              <Col md={12} className="text-end mt-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onRemoveLocation(index, locIndex)}
                >
                  حذف الموقع
                </Button>
              </Col>
            </Row>
          ))}

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onAddLocation(index)}
          >
            ➕ إضافة موقع
          </Button>

          <div className="text-end mt-3">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemoveQuantity(index)}
            >
              حذف الكمية
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline-primary" className="mb-4" onClick={onAddQuantity}>
        ➕ إضافة كمية
      </Button>
    </>
  );
};

export default QuantityManager;
