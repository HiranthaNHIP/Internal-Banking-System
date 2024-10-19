# Banking Application
React application development

## Technologies
HTML/ tailwind CSS / JavaScript/ React/ SVG

tailwind CSS : https://tailwindcss.com/docs/guides/create-react-app

## tailwind CSS Instalation

### step 01: Create your project

command Lines: 
> npx create-react-app my-project
> cd my-project

### step 02: Install Tailwind CSS
Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file.
command Lines: 
> npm install -D tailwindcss
> npx tailwindcss init

### step 03: Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

### step 04: Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
@tailwind base;
@tailwind components;
@tailwind utilities;

### step 05: Start your build process
Run your build process with npm run start
command Line:
> npm run start

### Inatall Required Packages
The jsPDF and html2canvas libraries for PDF generation(For PDF)
> npm install jspdf html2canvas 
