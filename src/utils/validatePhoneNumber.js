export const validatePhoneNumber = (str) => {
  const numbers = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/g;
  return (numbers.test(str))
}