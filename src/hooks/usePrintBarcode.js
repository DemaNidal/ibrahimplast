// src/hooks/usePrintBarcode.js
import { useCallback } from "react";

const usePrintBarcode = () => {
  const printBarcode = useCallback((product, barcodeValue, extraInfo = {}) => {
    const { warehouse_name, location, quantity_total, unit } = extraInfo;
    const printWindow = window.open("", "PRINT", "height=1000,width=1000");

    // const locationText = product.locations
    //   ?.map((loc) => `${loc.location} - ${loc.warehouse_name}`)
    //   .join(", ");

    const htmlContent = `
<html>
  <head>
    <title>Barcode</title>
    <style>
      @media print {
        @page {
          size: 80mm 50mm;
          margin: 3mm;
        }
        body {
          margin: 0;
          padding: 0;
        }
      }
      body {
        text-align: center;
        font-family: Arial, sans-serif;
        padding: 0px;
      }
      .product-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      #barcode {
        margin: 0 auto;
        display: block;
      }
      .product-location {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        margin-top: 6px;
        margin-bottom: 4px;
      }
      .barcode-value {
        font-size: 16px;
        letter-spacing: 6px;
        margin-top: 4px;
        margin-bottom: 6px;
      }
    </style>
  </head>
  <body>
    <div class="product-name">${product.product_name}</div>
    <svg id="barcode"></svg>
    <div class="product-location">${warehouse_name || "غير محدد"} – ${location || "غير محدد"}</div>
    <div class="barcode-value">الكمية: ${quantity_total || ""} ${unit || ""}</div>
  </body>
</html>
`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
      const script = printWindow.document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js";
      script.onload = () => {
        printWindow.JsBarcode("#barcode", barcodeValue, {
          format: "CODE128",
          width: 2,
          height: 60,
          displayValue: false,
          margin: 0,
        });
        printWindow.print();
        printWindow.close();
      };
      printWindow.document.body.appendChild(script);
    };
  }, []);

  return printBarcode;
};

export default usePrintBarcode;
