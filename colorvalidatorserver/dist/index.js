"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
//@ts-ignore
// app.use(cors({ 
//   origin: "https://color-validator.vercel.app", // Allow frontend to access API
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"]  // Allowed headers
// }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (for debugging)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//Creating new profile
app.post("/profiles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tolerance, colors } = req.body;
    try {
        const profile = yield prisma.brandProfile.create({
            data: {
                name,
                tolerance,
                colors: { create: colors },
            },
            include: { colors: true },
        });
        res.json(profile);
    }
    catch (error) {
        console.error("Error creating profile:", error);
        res.status(400).json({ error: error.message });
    }
}));
// Update a profile
app.put("/profiles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, tolerance, colors } = req.body;
    try {
        if (colors === null || colors === void 0 ? void 0 : colors.length) {
            yield prisma.color.deleteMany({ where: { profileId: id } });
        }
        const updatedProfile = yield prisma.brandProfile.update({
            where: { id },
            data: {
                name,
                tolerance,
                colors: {
                    create: colors === null || colors === void 0 ? void 0 : colors.map((_a) => {
                        var { id, profileId, createdAt } = _a, rest = __rest(_a, ["id", "profileId", "createdAt"]);
                        return rest;
                    }), //Removes unnceessary fielss
                    // does not need id, profileId, or createdAt when creating a new color entry under a profile. It automatically generates id and links profileId for you.
                },
            },
            include: { colors: true },
        });
        res.json(updatedProfile);
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(400).json({ error: "Failed to update profile" });
    }
}));
//deleting profile
app.delete("/profiles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.brandProfile.delete({ where: { id } });
        res.json({ message: "Profile deleted" });
    }
    catch (error) {
        res.status(400).json({ error: "Failed to delete profile" });
    }
}));
//get all profile
// Get all brand profiles with their colors
app.get("/profiles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield prisma.brandProfile.findMany({
            include: {
                colors: true, // Include associated colors
            },
        });
        console.log(profiles);
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch brand profiles" });
    }
}));
//Getting anlaysis history
app.get("/analysis-history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield prisma.analysisHistory.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(history);
}));
// Get analysis result by ID
app.get("/analysis/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.analysisResult.findUnique({ where: { id } });
    if (!result) {
        res.status(404).json({ error: "Analysis not found" });
    }
    res.json(result);
}));
// Save analysis result
app.post("/analysis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, imageUrl, overallCompliance } = req.body;
    const status = overallCompliance > 90
        ? "Compliant"
        : overallCompliance > 75
            ? "Needs Review"
            : "Non-Compliant";
    try {
        const newResult = yield prisma.analysisResult.create({
            data: { fileName, imageUrl, overallCompliance, status },
        });
        yield prisma.analysisHistory.create({
            data: {
                id: newResult.id,
                name: fileName,
                imageUrl,
                overallCompliance,
                status,
            },
        });
        res.json(newResult);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to save analysis result" });
    }
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
