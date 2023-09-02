import * as yup from 'yup';

export const appUserValidationSchema = yup.object().shape({
  interests: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
