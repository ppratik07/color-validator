import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(express.json());

console.log(`Server running on ${PORT}`);

//Creating new profile

app.post("/profiles", async (req, res) => {
  const { name, tolerance, colors } = req.body;
  try {
    const profile = await prisma.brandProfile.create({
      data: {
        name,
        tolerance,
        colors: { create: colors },
      },
      include: { colors: true },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: "Failed to create profile" });
  }
});
// Update a profile
app.put('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    const { name, tolerance, colors } = req.body;
    try {
      await prisma.color.deleteMany({ where: { profileId: id } });
      const updatedProfile = await prisma.brandProfile.update({
        where: { id },
        data: {
          name,
          tolerance,
          colors: { create: colors }
        },
        include: { colors: true }
      });
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update profile' });
    }
  });