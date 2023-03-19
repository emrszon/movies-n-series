export const isPresent = (field: string, form: any) => {
  if (form[field] === null || form[field] === "") {
    return false
  }
  return true;
}

export const isEmailValid = (email:string) => {
  const validateEmailRegExp= RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    return validateEmailRegExp.test(email)
}