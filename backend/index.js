import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.post("/submit",async(req,res)=>{
	const{code,language_id,stdin}=req.body;
	try{
		const response =await axios.post(`${JUDGE0_URL}/submissions`,{
			language_id,
			source_code:code,
			stdin,},{params:{base64_encoded:false,wait:false}});
	}catch(error){
		res.status(500).json({error:"submission failed"});
	}
})
// Route to fetch result
app.get("/result/:token", async (req, res) => {
	const token = req.params.token;

	try {
			const response = await axios.get(`${JUDGE0_URL}/submissions/${token}`);
			return res.json(response.data);
	} catch (error) {
			return res.status(500).json({ error: "Failed to fetch result" });
	}
});
app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});