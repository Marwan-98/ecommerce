import * as yup from 'yup'
import valid from 'card-validator'

export const orderValidationSchema = yup.object({
  'first-name': yup
    .string()
    .matches(/^[A-Z]+$/i)
    .required(),
  'last-name': yup
    .string()
    .matches(/^[a-zA-Z]+$/)
    .required(),
  company: yup.string().required(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/)
    .max(12)
    .required(),
  address: yup.string().required(),
  apartment: yup.string().required(),
  city: yup.string().required(),
  region: yup.string().required(),
  'postal-code': yup.string().test((value) => valid.postalCode(value).isValid),
  'card-number': yup.string().test((value) => valid.number(value).isValid),
  'name-on-card': yup
    .string()
    .test((value) => valid.cardholderName(value).isValid),
  'expiration-date': yup
    .string()
    .test((value) => valid.expirationDate(value).isValid),
  cvc: yup.string().test((value) => valid.cvv(value).isValid),
})
