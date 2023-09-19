import mailer from "nodemailer";
import { lightEquipmentLayout, heavyEquipmentLayout } from "./layouts";

const getAdminEmails = async () => {

  const content_page = "messenger";
  return fetch(`${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/texts?description=${content_page}`).then(res => 
    res.json()
  ).then(data => {
    return data
  });

};

const sendLightEmail = async (admin_emails: any, budget_data: any, transporter: any) => {

  const email_layout: any = lightEquipmentLayout(budget_data);
  //${admin_emails.fields.text_field[0]}, ${admin_emails.fields.text_field[2]}
  const mail_configs: mailer.SendMailOptions = {
    from: "marksales.dev.eng@gmail.com",
    to: budget_data.personalInformations.email,
    cc: `fabiana.piskor@gmail.com, marksales.dev.eng@gmail.com`,
    subject: "Meu orçamento Mills!",
    html: email_layout
  };

  transporter.sendMail(mail_configs, (error: any, info: any) => {
    if (error) {
      console.log("error sending email:", error);
    } else {
      console.log("email successfully sent:", info);
    }
  });

  return { success: true }
  
};

const sendHeavyEmail = async (admin_emails: any, budget_data: any, transporter: any) => {

  const email_layout: any = heavyEquipmentLayout(budget_data);
  //${admin_emails.fields.text_field[0]}, ${admin_emails.fields.text_field[2]}
  const mail_configs: mailer.SendMailOptions = {
    from: "marksales.dev.eng@gmail.com",
    to: "starfusion68@gmail.com",
    cc: `starfusion69@gmail.com, marksales.dev.eng@gmail.com`,
    subject: "Meu orçamento Mills!",
    html: email_layout
  };

  transporter.sendMail(mail_configs, (error: any, info: any) => {
    if (error) {
      console.log("error sending email:", error);
    } else {
      console.log("email successfully sent:", info);
    }
  });

  return { success: true }

};

export {
  getAdminEmails,
  sendLightEmail,
  sendHeavyEmail
};