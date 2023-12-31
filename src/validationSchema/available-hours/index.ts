import * as yup from 'yup';

export const availableHoursValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  day_of_week: yup.number().integer().required(),
  mentor_id: yup.string().nullable().required(),
});
