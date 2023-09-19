import * as AWS from "@aws-sdk/client-ses"

export const ses_instance = new AWS.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? ""
  }
});
