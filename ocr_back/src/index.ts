import amqplib from "amqplib";
import dotenv from "dotenv";
import axios from "axios";

import { createWorker } from "tesseract.js";

dotenv.config();

const worker = createWorker({
  logger: (data) => console.log(data),
});

async function downloadImage(url: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });

  return response;
}

async function recognize(fileUrl: string) {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const file = await downloadImage(fileUrl);

  console.log(file.data);

  const {
    data: { text },
  } = await worker.recognize(file.data);
  console.log(text);
  // await worker.terminate();
  return text;
}

const amqp_url = process.env.AMQP_URL || "amqp://localhost:5672";

async function do_consume() {
  try {
    const conn = await amqplib.connect(amqp_url, "heartbeat=60");
    const ch = await conn.createChannel();
    const q = "ocr_queue";
    await ch.assertQueue(q, { durable: true });
    await ch.prefetch(1);

    await ch.consume(
      q,
      async function (msg) {
        if (msg) {
          const { fileUrl } = JSON.parse(msg.content.toString());
          console.log(fileUrl);
          await recognize(fileUrl);
          ch.ack(msg);
          // ch.cancel("myconsumer");
        }
      },
      // { consumerTag: "myconsumer", noAck: false }
      { noAck: false }
    );
  } catch (e) {
    process.exit(1);
  }

  // setTimeout(function () {
  //   ch.close();
  //   conn.close();
  // }, 500);
}

do_consume();
