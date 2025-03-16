# StreamlineERP
StreamlineERP is an advanced ERP system designed specifically for small to medium-sized businesses. It integrates key business functions including HR, accounting, inventory management, and customer relationship management into one comprehensive platform. StreamlineERP aims to enhance operational efficiency.

# Prerequisites
Before installing StreamlineERP, ensure the following prerequisites are met:

1. Node.js (version 4.0 or later)
2. MongoDB (version 3.0 or later)
3. Redis server (latest version)

# Installation
**1. Extract EasyERP.zip:**

  Use any IDE or file extraction tool to open EasyERP.zip.

**2. Global Dependencies:**

  Install Bower globally using npm:

    npm install bower -g

**3. Install Dependencies:**

  Navigate to the project directory and run:
  
    npm i
    bower i
    
# Database Setup
**1. Prepare the Database:**

  Extract dump.zip and within the same directory, run:

    mongorestore
  This will restore two test databases: saas (empty) and CRM (pre-populated).

**2. Ensure Port Availability:**

  Verify that port 8089 on your localhost is free.

**3. Run the Application:**

  Start the project using your IDE or command line.
  
  Open localhost:8089 in your web browser.
  
**4. Login Details:**

  Database: CRM or saas
  
  Username: superAdmin
  
  Password: 111111

# Features
**1. Modular Architecture:** Customize and scale your ERP system as your business grows.

**2. Real-Time Data Processing:** Get instant updates and reports from your business operations.

**3. Inventory Management:** Keep track of your stock levels, orders, sales, and deliveries.

**4. Financial Accounting:** Manage your finances with tools for accounting, budgets, and financial reporting.

**5. HR Operations:** Automate payroll, track employee performance, and manage hiring processes.

**6. Customer Insights:** Enhance customer relationships through integrated CRM functionalities.

# Contributing
Contributions are welcome! If you have suggestions or enhancements, please fork the repository and submit a pull request.
