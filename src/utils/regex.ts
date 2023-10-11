export const phoneNumberRegex = /^\(\d{2}\) \d{5} \d{4}$/;

export const onlyNumbersRegex = /^[0-9]*$/;

export const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
