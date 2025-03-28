import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

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
    console.error("Error creating profile:", error);
    res.status(400).json({ error: (error as Error).message });
  }
});
// Update a profile
app.put("/profiles/:id", async (req, res) => {
  const { id } = req.params;
  const { name, tolerance, colors } = req.body;
  try {
    await prisma.color.deleteMany({ where: { profileId: id } });
    const updatedProfile = await prisma.brandProfile.update({
      where: { id },
      data: {
        name,
        tolerance,
        colors: { create: colors },
      },
      include: { colors: true },
    });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile" });
  }
});
//deleting profile
app.delete("/profiles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.brandProfile.delete({ where: { id } });
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete profile" });
  }
});

//get all profile
app.get("/profiles", async (req, res) => {
  const profiles = await prisma.brandProfile.findMany({
    include: { colors: true },
  });
  res.json(profiles);
});

//Getting anlaysis history

app.get("/analysis-history", async (req, res) => {
  const history = await prisma.analysisHistory.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(history);
});

// Get analysis result by ID
app.get("/analysis/:id", async (req, res) => {
  const { id } = req.params;
  const result = await prisma.analysisResult.findUnique({ where: { id } });
  if (!result) {
    res.status(404).json({ error: "Analysis not found" });
  }
  res.json(result);
});

// Save analysis result
app.post("/analysis", async (req, res) => {
  const { fileName, imageUrl, overallCompliance } = req.body;
  const status =
    overallCompliance > 90
      ? "Compliant"
      : overallCompliance > 75
      ? "Needs Review"
      : "Non-Compliant";

  try {
    const newResult = await prisma.analysisResult.create({
      data: { fileName, imageUrl, overallCompliance, status },
    });

    await prisma.analysisHistory.create({
      data: {
        id: newResult.id,
        name: fileName,
        imageUrl,
        overallCompliance,
        status,
      },
    });

    res.json(newResult);
  } catch (error) {
    res.status(400).json({ error: "Failed to save analysis result" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
