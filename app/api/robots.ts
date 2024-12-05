import { NextApiRequest, NextApiResponse } from "next";
import robots from "@/lib/robots";

// Define the handler function with the correct types
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Content-Type", "text/plain");
    res.send(robots());
}
