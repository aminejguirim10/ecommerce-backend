# 🤖 Ecommerce-backend API

Welcome to the Ecommerce-backend API, a robust and scalable backend solution for managing your online store. This API provides a comprehensive set of features to handle all aspects of e-commerce, including product management, user authentication and more. Designed with performance and security in mind, our API ensures a seamless experience for both store owners and customers. Whether you're building a new e-commerce platform or enhancing an existing one, our API offers the flexibility and functionality you need to succeed. Join us in creating a dynamic and efficient online shopping experience that meets the needs of today's digital marketplace.

## 🔋 Features

👉 **User Authentication and Authorization:** Secure user registration, login and role-based access control to ensure that only authorized users can perform specific actions.

👉 **User Profiles:** Manage user profiles including personal information.

👉 **Product Management:** Easily create, update, delete and retrieve product information, including details like name, description, price, category and others.

👉 **Product Reviews and Ratings:** Enable customers to leave reviews and ratings for products, helping other customers make informed decisions.

👉 **Security:** Implemented best practices for data security including encryption, secure API endpoints and regular security audits.

👉 **Image Upload and Storage:** Easily upload and store images using Multer, ensuring efficient management of product images and user uploads.

## ⚙️ Technologies Used

- **Backend:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)

## 🖥️ Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## 🚀 Installation

1. Clone the repository:

```bash
 git clone https://github.com/aminejguirim10/ecommerce-backend.git
```

2. Navigate to the project directory:

```bash
 cd ecommerce-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Configure environment variables:

Create a new file named .env in the root of your project and add the following content:

```bash
MONGO_URI="your_mongo_uri"
JWT_SECRET="your_jwt_secret"
PORT=5000
NODE_ENV=development
```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and visit:

```bash
http://localhost:5000
```

## 📷 Image Storage with Multer

This project uses Multer for image storage. To upload images, send a POST request to the /api/upload endpoint with the image file attached as a form-data field named image. The server will respond with the URL of the uploaded image.

## 🚶 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
