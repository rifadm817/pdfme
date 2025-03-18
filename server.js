const express = require("express");
const path = require("path");
const { generate } = require("@pdfme/generator");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from UI build
app.use(express.static(path.join(__dirname, "packages/ui/dist")));

// API endpoint for PDF generation
app.use(express.json());
app.post("/api/generate-pdf", async (req, res) => {
  try {
    const { template, inputs } = req.body;
    const pdf = await generate({ template, inputs });
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

// Fallback to serve UI
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "packages/ui/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
