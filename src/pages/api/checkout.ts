import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../utils/SESTransporter";
import { 
  getAdminEmails,
  sendLightEmail, 
  sendHeavyEmail,
  sendQuestionWithSpecialist,
  sendQuickBudgetEmail
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
      try {
        const dinamical_emails = await getAdminEmails();
        const filtered_items = (dinamical_emails.items).filter((item: any) => 
          item.fields.content_area === "budget"
        );

        if (budget_data.items) {
          switch (budget_data.orderType) {
            case "rentalLight": sendLightEmail(filtered_items[0], budget_data, transporter);
            break;
            case "rentalHeavy": sendHeavyEmail(filtered_items[0], budget_data, transporter);
            break;
          };
        } else if (budget_data.motivoContato)
          sendQuestionWithSpecialist(filtered_items[0], budget_data, transporter)
          else
          sendQuickBudgetEmail(filtered_items[0], budget_data, transporter);

        res.status(200).json({ success: true, message: "email successfully sent" });
      } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
      };
      break;
    default:
      return res.status(405).json({ success: false, message: "method not allowed" });
  };

};
