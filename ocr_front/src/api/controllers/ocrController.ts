import { putToQueue } from "../../services/ocrService";

export const ocrController = async (req: any, res: any) => {
  await putToQueue(req.body);
  res.status(200).json({ msg: "image is sent to queue for processing" });
};
