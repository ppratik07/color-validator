🎨 ColorValidator
ColorValidator is a tool designed to manage and validate brand color profiles by comparing color tolerances using ΔE (Delta E) values. It helps ensure color consistency across different profiles and platforms.

🚀 Features
✅ Brand Profile Management – Create, edit, and delete brand profiles.
✅ Color Validation – Compare colors based on ΔE tolerance levels.
✅ Profile Selection – Easily switch between different brand profiles.
✅ Real-Time Updates – Ensures accurate color data with instant validation.
✅ Database-Backed Storage – Uses PostgreSQL & Prisma for efficient data management.

🛠️ Tech Stack
Frontend: React (TypeScript), Tailwind CSS, ShadCN UI

Backend: Node.js, Prisma ORM, PostgreSQL

UI Components: Lucide Icons

📌 How It Works
Select a Brand Profile – Choose a profile from the dropdown.

Validate Colors – Check if colors fall within the acceptable ΔE tolerance.

Manage Profiles – Edit or delete existing brand profiles.

Real-Time Feedback – Get instant results based on ΔE values.

📥 Installation
Prerequisites
Node.js (v18+)

PostgreSQL

Prisma CLI

Git

1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/color-validator.git
cd color-validator
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

ini
Copy
Edit
DATABASE_URL=postgresql://user:password@localhost:5432/colorvalidator
PORT=5000
4️⃣ Run Database Migrations
bash
Copy
Edit
npx prisma migrate dev --name init
5️⃣ Start the Application
bash
Copy
Edit
npm run dev
The app will be running at http://localhost:5000 🚀

🔥 API Endpoints
📌 Profiles
➤ Get All Profiles
http
Copy
Edit
GET /profiles
➤ Get a Single Profile
http
Copy
Edit
GET /profiles/:id
➤ Create a Profile
http
Copy
Edit
POST /profiles
Content-Type: application/json

{
  "name": "BrandX",
  "tolerance": 2.5,
  "colors": [
    { "name": "Red", "hex": "#FF0000", "rgb": { "r": 255, "g": 0, "b": 0 } }
  ]
}
➤ Update a Profile
http
Copy
Edit
PUT /profiles/:id
Content-Type: application/json

{
  "name": "BrandX Updated",
  "tolerance": 3.0,
  "colors": [
    { "name": "Blue", "hex": "#0000FF", "rgb": { "r": 0, "g": 0, "b": 255 } }
  ]
}
➤ Delete a Profile
http
Copy
Edit
DELETE /profiles/:id
🤝 Contribution Guide
Fork the repository

Create a new branch

bash
Copy
Edit
git checkout -b feature-name
Make your changes

Commit and push your changes

bash
Copy
Edit
git commit -m "Added new feature"
git push origin feature-name
Submit a Pull Request

📄 License
This project is MIT Licensed.

🎯 Want to Improve This Project?
🔹 Feel free to open issues and PRs!
🔹 Join the discussion and contribute!
