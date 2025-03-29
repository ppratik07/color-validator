# ColorValidator

ColorValidator is a robust tool designed for validating brand color palettes. It helps ensure that colors meet specific tolerance thresholds, enabling brand consistency and quality control.

## Features
- Validate brand colors against specified tolerance levels
- Store and manage multiple brand profiles
- Easily update or delete color profiles
- Intuitive UI with a seamless user experience
- Backend powered by Prisma and PostgreSQL

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
