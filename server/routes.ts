import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { spawn } from "child_process";
import { extractTeamFeatures, extractPlayerFeatures } from "@shared/utils";
import path from "path"
export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/predict/team", async (req, res) => {
    try {
      const teamData = req.body;
      
      const features = extractTeamFeatures(teamData);
      
      const prediction = await callPythonPredictor(features);
      
      res.json(prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({ 
        error: "Failed to generate prediction",
        confidenceScore: 50,
        prediction: "continue",
        features: {}
      });
    }
  });
  
  app.post("/api/predict/player", async (req, res) => {
    try {
      const playerData = req.body;
      
      const features = extractPlayerFeatures(playerData);
      
      const prediction = await callPythonPredictor(features);
      
      res.json(prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({ 
        error: "Failed to generate prediction",
        confidenceScore: 50,
        prediction: "continue",
        features: {}
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

function callPythonPredictor(features: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "ml", "streak_predictor.py");



    const python = spawn("python3.11", [


    scriptPath,


    JSON.stringify(features)


    ]);

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${errorOutput}`));
        return;
      }

      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to parse Python output: ${output}`));
      }
    });

    python.on('error', (error) => {
      reject(error);
    });
  });
}
