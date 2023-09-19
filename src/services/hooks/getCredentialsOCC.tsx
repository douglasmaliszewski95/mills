type OCCToken = {
  status: number
  readonly access_token: string
}

export const getCredentialsOCC = async () => {
  const response: OCCToken = await fetch(`${process.env.OCC_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${process.env.OCC_BEARER_TOKEN}`
    },
    body: "grant_type=client_credentials"
  }).then(res => {
    if (res.status === 200)
      return res.json()
    else {
      const result: OCCToken = { status: res.status, access_token: "" }
      return result
    }
  })

  return response
}