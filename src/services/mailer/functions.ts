import mailer from "nodemailer";
import { 
  lightEquipmentLayout, 
  adminLightLayout,
  heavyEquipmentLayout, 
  adminHeavyLayout,
  quickBudgetLayout 
} from "./layouts";

const getAdminEmails = async () => {

  const content_page = "messenger";
  return fetch(`${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/texts?description=${content_page}`).then(res => 
    res.json()
  ).then(data => {
    return data
  });

};

const sendLightEmail = async (admin_emails: any, budget_data: any, transporter: any) => {

  //CUSTOMER
  const email_layout: any = lightEquipmentLayout(budget_data);
  const mail_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: budget_data.personalInformations.email,
    subject: `Mills - Recebemos sua solicitação de orçamento!`,
    html: email_layout
  };
  transporter.sendMail(mail_configs);
  //ADMIN
  const email_admin_layout: any = adminLightLayout(budget_data);
  const mail_admin_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: admin_emails.fields.text_field[1],
    cc: `${admin_emails.fields.text_field[2]}`,
    subject: `Site Mills - Solicitação de reserva`,
    html: email_admin_layout
  };
  transporter.sendMail(mail_admin_configs);

  return { success: true }
  
};

const sendHeavyEmail = async (admin_emails: any, budget_data: any, transporter: any) => {

  //CUSTOMER
  const email_layout: any = heavyEquipmentLayout(budget_data);
  const mail_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: budget_data.personalInformations.email,
    subject: `Mills - Recebemos sua solicitação de orçamento!`,
    html: email_layout
  };
  transporter.sendMail(mail_configs);
  //ADMIN
  const email_admin_layout: any = adminHeavyLayout(budget_data);
  const mail_admin_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: admin_emails.fields.text_field[1],
    cc: `${admin_emails.fields.text_field[2]}`,
    subject: `Site Mills - Solicitação de reserva`,
    html: email_admin_layout
  };
  transporter.sendMail(mail_admin_configs);

  return { success: true }

};

const sendQuestionWithSpecialist = async (admin_emails: any, budget_data: any, transporter: any) => {
  
  const mail_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: admin_emails.fields.text_field[0],
    cc: `${admin_emails.fields.text_field[2]}`,
    subject: `Site Mills - Ligamos pra você`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
        .mills_logo {
          width: 116px;
          background-color: #F37021;
          padding: 6px 10px;
          border-radius: 6px;
        }
        .title {
          color: #F37021;
        }
      </style>
      </head>
      <body>
        <main>
          <p>
            <img class="mills_logo" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
            <h1 class="title">Ligamos pra você!</h1>
            <b>Nome: ${budget_data.nome}</b>
            <br>
            <b>Telefone: ${budget_data.telefone}</b>
            <br>
            <b>Motivo do contato: ${budget_data.motivoContato}</b>
          </p>
          ------------------------------------
          <p>
            <b>Origem: Mídia</b>
            <br>
            <b>Formulário: Ligamos pra você</b>
          </p>
        </main>
      </body>
      </html>
    `
  };

  transporter.sendMail(mail_configs);

  return { success: true }

};

const sendQuickBudgetEmail = async (admin_emails: any, budget_data: any, transporter: any) => {

  const email_layout: any = quickBudgetLayout(budget_data);
  const mail_configs: mailer.SendMailOptions = {
    from: admin_emails.fields.text_field[2],
    to: admin_emails.fields.text_field[0],
    cc: `${admin_emails.fields.text_field[2]}`,
    subject: `Site Mills - Fale com um especialista!`,
    html: email_layout
  };

  transporter.sendMail(mail_configs);

  return { success: true }

};

export {
  getAdminEmails,
  sendLightEmail,
  sendHeavyEmail,
  sendQuestionWithSpecialist,
  sendQuickBudgetEmail
};
