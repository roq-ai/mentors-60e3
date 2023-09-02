import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  mentor_id: yup.string().nullable().required(),
  app_user_id: yup.string().nullable().required(),
});
