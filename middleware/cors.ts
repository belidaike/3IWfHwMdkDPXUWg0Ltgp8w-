import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

// Initialize CORS middleware
const cors = Cors({
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
    origin: [
        "https://5hop5martly.vercel.app", // Your frontend URL
        "https://5hop5martly-ei74g4i0k-belidaikes-projects.vercel.app", // Your backend API URL
    ],
    optionsSuccessStatus: 200,
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function corsMiddleware(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);
}
