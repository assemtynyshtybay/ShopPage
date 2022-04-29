export const validateEmail = (str) => {
  const emailTest = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.+.[a-z]{2,4}$');
  return (emailTest.test(str))
}