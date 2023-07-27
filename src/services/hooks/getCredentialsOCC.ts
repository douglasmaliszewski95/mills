type OCCToken = {
  status: number;
  readonly access_token: string;
};

export const getCredentialsOCC = async () => {
  const response: OCCToken = await fetch(
    `https://p19894161c1prd-admin.occa.ocs.oraclecloud.com/ccadmin/v1/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlNjFhNjcxNS02ZjQ1LTQxNTEtYjhiMC00YTAzYzhmYmZlZTQiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE3MTk0OTc4NTAsImlhdCI6MTY4Nzk2MTg1MH0=.r/lCaIy9Kni5nBlNYXzfAfqIDIR4EWGUOLd/r9uwL1A=`,
      },
      body: "grant_type=client_credentials",
    }
  ).then((res) => {
    if (res.status === 200) return res.json();
    else {
      const result: OCCToken = { status: res.status, access_token: "" };
      return result;
    }
  });

  return response;
};
