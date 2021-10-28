import amqplib from "amqplib";
import dotenv from "dotenv";

dotenv.config();
const amqp_url = process.env.AMQP_URL || "amqp://localhost:5672";

export const putToQueue = async (msg: any) => {
  console.log("Publishing: ", msg);
  const conn = await amqplib.connect(amqp_url, "heartbeat=60");
  const ch = await conn.createChannel();
  const exch = "ocr_exchange";
  const q = "ocr_queue";
  const rkey = "ocr_route";
  await ch
    .assertExchange(exch, "direct", { durable: true })
    .catch(console.error);
  await ch.assertQueue(q, { durable: true });
  await ch.bindQueue(q, exch, rkey);
  await ch.publish(exch, rkey, Buffer.from(JSON.stringify(msg)));
  setTimeout(function () {
    ch.close();
    conn.close();
  }, 500);

  return true;
};
