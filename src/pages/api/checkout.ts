import type { NextApiRequest, NextApiResponse } from "next";
import mailer from "nodemailer";
import { ses_instance } from "../../utils/sesConfig";
import { 
  getAdminEmails,
  sendLightEmail, 
  sendHeavyEmail 
} from "../../services/mailer/functions";

type DefaultResponse = {
  success: boolean
  message: any
};
type EmailResult = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DefaultResponse>) {

  switch (req.method) {
    case "POST":
      const budget_data = req.body;
      const order_type = req.body.orderType;
      try {
        if (!budget_data.personalInformations.email)
          return res.status(400).json({ success: false, message: "email is required" });

        if (order_type !== "rentalLight" && order_type !== "rentalHeavy")
          return res.status(400).json({ success: false, message: "invalid order type" });

        const email_configs = await getAdminEmails();
        const filtered_items = (email_configs.items).filter((item: any) => 
          item.fields.content_area === "budget"
        );

        const transporter = mailer.createTransport({ 
          service: "gmail",
          auth: {
              user: "marksales.dev@gmail.com",
              pass: "moemvyvqegivusbm"
          }
        });
        //({ SES: ses_instance });

        switch (order_type) {
          case "rentalLight":
            sendLightEmail(filtered_items[0], budget_data, transporter);
            break;
          case "rentalHeavy":
            sendHeavyEmail(filtered_items[0], budget_data, transporter);
            break;
        };

        res.status(200).json({ success: true, message: "email successfully sent" });
      } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
      };
      break;
    default:
      return res.status(405).json({ success: false, message: "method not allowed" });
  };

};

//"email successfully sent"
