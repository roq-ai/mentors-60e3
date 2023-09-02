import * as yup from 'yup';

export const mentorValidationSchema = yup.object().shape({
  specialization: yup.string().required(),
  experience: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
