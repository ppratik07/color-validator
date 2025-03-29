# ColorValidator

ColorValidator is a powerful tool designed to help brands maintain color consistency by ensuring accurate color profiles and tolerances. It enables users to create, edit, and validate brand color profiles with ease.

## 🚀 Features
- Create and manage brand color profiles
- Define tolerance levels for color accuracy
- Validate colors against the predefined brand profile
- RESTful API for seamless integration

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **UI Components:** ShadCN/UI, Lucide-react for icons

## ⚙️ How It Works
1. **Create Brand Profiles**: Users can create brand profiles and define a set of colors with specific tolerance levels.
2. **Edit and Update Profiles**: Profiles can be updated, and colors can be added or removed dynamically.
3. **Validate Colors**: The system checks if a given color falls within the defined tolerance range of the brand profile.
4. **Real-time Updates**: Profiles and colors are updated instantly with a smooth user experience.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ColorValidator.git
   ```
2. Navigate to the project folder:
   ```bash
   cd ColorValidator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```plaintext
   DATABASE_URL=your_postgresql_database_url
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
### Get All Brand Profiles
```http
GET /profiles
```
**Response:**
```json
[
  {
    "id": "1234",
    "name": "Brand A",
    "tolerance": 3.0,
    "colors": [
      { "name": "Black", "hex": "#000000" }
    ]
  }
]
```

### Update Brand Profile
```http
PUT /profiles/:id
```
**Payload:**
```json
{
  "name": "Updated Brand",
  "tolerance": 2.5,
  "colors": [
    { "name": "Blue", "hex": "#0000FF" }
  ]
}
```

### Delete Brand Profile
```http
DELETE /profiles/:id
```

## Contributing
1. Fork the repository
2. Create a new feature branch
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the changes
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request

## License
This project is licensed under the MIT License.
