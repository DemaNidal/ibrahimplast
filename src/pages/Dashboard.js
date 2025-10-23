import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import api from "../config/api";
import {
  FaBox,
  FaWarehouse,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaPlus,
  FaBell,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.username);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/login");
        }
      })
      .catch(() => setAuth(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.Status === "Success") {
        sessionStorage.removeItem("user-token");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div
      className="dashboard-container py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        color: "#fffefeff",
      }}
    >
      {auth ? (
        <div className="container">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 style={{ color: "#d4af37", fontWeight: "700" }}>
                مرحباً، {name} 👋
              </h2>
              <p className="text-muted">لوحة التحكم - نظام إدارة المخازن</p>
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={handleLogout}
              style={{ borderColor: "#d4af37", color: "#d4af37" }}
            >
              تسجيل الخروج
            </button>
          </div>

          {/* Quick Stats */}
          <div className="row text-center mb-5">
            {[
              { icon: <FaBox />, title: "عدد المنتجات", value: "1200+" },
              { icon: <FaWarehouse />, title: "عدد المخازن", value: "6" },
              { icon: <FaExchangeAlt />, title: "حركات اليوم", value: "42" },
              { icon: <FaExclamationTriangle />, title: "منتجات منخفضة", value: "8" },
            ].map((item, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div
                  className="card shadow-sm p-4 h-100"
                  style={{
                    backgroundColor: "#000",
                    border: "1px solid #d4af37",
                    borderRadius: "15px",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#d4af37",
                      marginBottom: "10px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h5 style={{ color: "#d4af37" }}>{item.title}</h5>
                  <h3 style={{ fontWeight: "700" }}>{item.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Low Stock Products */}
          <section className="mb-5">
            <h4 style={{ color: "#d4af37", marginBottom: "20px" }}>
              <FaExclamationTriangle className="me-2" />
              المنتجات منخفضة الكمية
            </h4>
            <div className="row">
              {["علبة 100 مل", "غطاء صغير", "عبوة كريم"].map((name, i) => (
                <div key={i} className="col-md-4 mb-3">
                  <div
                    className="card p-3"
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "1px solid #d4af37",
                      borderRadius: "10px",
                    }}
                  >
                    <strong style={{ color: "#d4af37" }}>{name}</strong>
                    <p className="mt-2 mb-0">الكمية المتبقية: {10 - i * 2}</p>
                    <small className="text-muted">المخزن: الساحة</small>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Movements */}
          <section className="mb-5">
            <h4 style={{ color: "#d4af37", marginBottom: "20px" }}>
              <FaExchangeAlt className="me-2" />
              آخر الحركات في المخزون
            </h4>
            <div
              className="table-responsive"
              style={{
                backgroundColor: "#000",
                borderRadius: "10px",
                border: "1px solid #d4af37",
              }}
            >
              <table className="table table-dark mb-0">
                <thead>
                  <tr style={{ color: "#d4af37" }}>
                    <th>النوع</th>
                    <th>المنتج</th>
                    <th>الكمية</th>
                    <th>الموقع</th>
                    <th>التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "OUT",
                      product: "علبة بلاستيكية 100مل",
                      qty: "2000",
                      loc: "رف 5 - الساحة",
                      date: "2025-10-08",
                    },
                    {
                      type: "IN",
                      product: "غطاء كبير 50مل",
                      qty: "1500",
                      loc: "رف 2 - الرئيسي",
                      date: "2025-10-07",
                    },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: row.type === "OUT" ? "red" : "#0f0" }}>
                        {row.type === "OUT" ? "خروج" : "دخول"}
                      </td>
                      <td>{row.product}</td>
                      <td>{row.qty}</td>
                      <td>{row.loc}</td>
                      <td>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Notifications / Alerts */}
          <section className="mb-5">
            <h4 style={{ color: "#d4af37", marginBottom: "20px" }}>
              <FaBell className="me-2" />
              التنبيهات
            </h4>
            <ul
              className="list-group"
              style={{
                backgroundColor: "#000",
                border: "1px solid #d4af37",
                borderRadius: "10px",
              }}
            >
              <li
                className="list-group-item"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                ⚠️ المنتج <strong style={{ color: "#d4af37" }}>علبة كريم</strong> أوشك على النفاد
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                ✅ تم إدخال كمية جديدة من <strong style={{ color: "#d4af37" }}>غطاء صغير</strong>
              </li>
            </ul>
          </section>

          {/* Quick Actions */}
          <div className="text-center mt-4">
            <h5 style={{ color: "#d4af37", marginBottom: "20px" }}>
              الإجراءات السريعة
            </h5>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link
                to="/add-product"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#d4af37",
                  color: "#000",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                <FaPlus className="me-2" /> إضافة منتج جديد
              </Link>

              <Link
                to="/movements"
                className="btn btn-outline-dark btn-lg"
                style={{
                  borderColor: "#d4af37",
                  color: "#d4af37",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                <FaExchangeAlt className="me-2" /> عرض الحركات
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center mt-5">
          <h3>{message}</h3>
          <Link to="/login" className="btn btn-warning">
            تسجيل الدخول
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
