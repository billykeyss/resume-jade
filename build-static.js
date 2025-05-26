const fs = require("fs");
const path = require("path");
const pug = require("pug");
const express = require("express");

// Load data
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Set up pug engine
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, "build");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Function to fix absolute paths for static deployment
function fixStaticPaths(html) {
  // Fix CSS and JS paths to point to public directory
  html = html.replace(/href="\/stylesheets\//g, 'href="./public/stylesheets/');
  html = html.replace(/src="\/main\.min\.js"/g, 'src="./public/main.min.js"');
  html = html.replace(/src="\/javascripts\//g, 'src="./public/javascripts/');

  // Fix image paths to point to public directory
  html = html.replace(/src="\/images\//g, 'src="./public/images/');

  return html;
}

// Function to render template to HTML
function renderTemplate(templatePath, outputPath, templateData = {}) {
  try {
    const html = pug.renderFile(path.join(__dirname, "views", templatePath), {
      ...templateData,
      pretty: true,
      // Add any app.locals that might be needed
      env: process.env,
    });

    // Fix paths for static deployment
    const fixedHtml = fixStaticPaths(html);

    fs.writeFileSync(path.join(buildDir, outputPath), fixedHtml);
    console.log(`✓ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error generating ${outputPath}:`, error.message);
  }
}

// Generate main pages
console.log("Building static site...\n");

// Main resume page
renderTemplate("main/index.pug", "index.html", { data });

// Error page
renderTemplate("main/error.pug", "error.html", {
  message: "Page Not Found",
  error: { status: 404 },
});

// Copy public assets
console.log("\nCopying public assets...");
const publicSrc = path.join(__dirname, "public");
const publicDest = path.join(buildDir, "public");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir(publicSrc, publicDest);
  console.log("✓ Public assets copied");
} catch (error) {
  console.error("✗ Error copying public assets:", error.message);
}

console.log("\n🎉 Static site built successfully!");
console.log("📁 Output directory: ./build/");
console.log(
  "🌐 You can now deploy the contents of the build directory to any static hosting service."
);
