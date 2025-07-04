import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app: Application = express();
const port = 1199;

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

type Task = {
  items: {
    id: number;
    task: string;
    completed: boolean;
  }[];
};
const db = new Low<Task>(new JSONFile("./database/tasks.json"), { items: [] });
(async () => {
  await db.read();

  // get tasks route
  app.get("/tasks", async (req: Request, res: Response) => {
    await db.read();
    const outputDesc = db.data?.items.sort((a, b) => b.id - a.id)
    res.json(outputDesc ?? []);
  });
  // get task id route
  app.get("/task/:id", async (req, res) => {
    await db.read();
    const id = parseInt(req.params.id, 10);
    const index = db.data?.items.findIndex((item) => item.id === id);

    if (index !== undefined && index !== -1) {
      res.json(db.data.items[index]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });
  // Update task id
  app.put("/task/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;

    await db.read();
    const itemIndex = db.data?.items.findIndex((item) => item.id === id);

    if (itemIndex !== undefined && itemIndex !== -1 && db.data) {
      db.data.items[itemIndex].task = task;
      await db.write();
      res.status(200).json(db.data.items[itemIndex]);
    } else {
      res.status(404).json({ error: "task not found" });
    }
  });

  // post route
  app.post("/tasks", async (req: Request, res: Response): Promise<void> => {
    const { task } = req.body;

    if (!task || typeof task !== "string") {
      return res.status(400).json({ error: "Invalid task data" });
    }

    await db.read();

    const newId = db.data?.items.length
      ? Math.max(...db.data.items.map((item) => item.id)) + 1
      : 1;

    const newTask = {
      id: newId,
      task,
      completed: false,
      // timestamp: new Date().toISOString(),
    };

    db.data?.items.push(newTask);
    await db.write();

    return res.status(201).json(newTask);
  });

  // delete route
  app.delete("/task/:id", async (req: Request, res: Response) => {
    await db.read();
    const id = parseInt(req.params.id);
    const index = db.data?.items.findIndex((item) => item.id === id);

    if (index !== undefined && index !== -1) {
      db.data?.items.splice(index, 1);
      await db.write();
      res.status(200).json({ message: "Task deleted successfully." });
    } else {
      res.status(404).json({ error: "Task not found. Nothing was deleted" });
    }
  });

  app.listen(port, () => {
    console.log(`Backend is listening to http://localhost:${port}`);
  });
})();