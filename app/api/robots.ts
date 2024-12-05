import { NextApiRequest, NextApiResponse } from "next";
import robots from "@/lib/robots";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(robots());
}
