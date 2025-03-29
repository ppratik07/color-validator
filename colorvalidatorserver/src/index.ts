import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
app.use(express.json());
//@ts-ignore
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

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
    if (colors?.length) {
      await prisma.color.deleteMany({ where: { profileId: id } });
    }

    const updatedProfile = await prisma.brandProfile.update({
      where: { id },
      data: {
        name,
        tolerance,
        colors: {
          create: colors?.map(({ id, profileId, createdAt, ...rest }: { id: string; profileId: string; createdAt: Date; [key: string]: any }) => rest), //Removes unnceessary fielss
          // does not need id, profileId, or createdAt when creating a new color entry under a profile. It automatically generates id and links profileId for you.
        },
      },
      include: { colors: true },
    });

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
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
// Get all brand profiles with their colors
app.get("/profiles", async (req, res) => {
  try {
    const profiles = await prisma.brandProfile.findMany({
      include: {
        colors: true, // Include associated colors
      },
    });
    console.log(profiles);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand profiles" });
  }
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
