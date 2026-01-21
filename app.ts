import "dotenv/config";
import express from "express";
import { Facilitator, createExpressAdapter } from "x402-open";
import { baseSepolia } from "viem/chains";

const app = express();
app.use(express.json());

const facilitator = new Facilitator({
  evmPrivateKey: process.env.PRIVATE_KEY as `0x${string}`,
  evmNetworks: [baseSepolia],
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

createExpressAdapter(facilitator, app, "/facilitator");

app.listen(4101, () => console.log("Node HTTP on http://localhost:4101"));