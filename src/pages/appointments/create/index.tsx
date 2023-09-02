import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAppointment } from 'apiSdk/appointments';
import { appointmentValidationSchema } from 'validationSchema/appointments';
import { MentorInterface } from 'interfaces/mentor';
import { AppUserInterface } from 'interfaces/app-user';
import { getMentors } from 'apiSdk/mentors';
import { getAppUsers } from 'apiSdk/app-users';
import { AppointmentInterface } from 'interfaces/appointment';

function AppointmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AppointmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAppointment(values);
      resetForm();
      router.push('/appointments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AppointmentInterface>({
    initialValues: {
      date: new Date(new Date().toDateString()),
      time: new Date(new Date().toDateString()),
      mentor_id: (router.query.mentor_id as string) ?? null,
      app_user_id: (router.query.app_user_id as string) ?? null,
    },
    validationSchema: appointmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Appointments',
              link: '/appointments',
            },
            {
              label: 'Create Appointment',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Appointment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.date ? new Date(formik.values?.date) : null}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>
          <FormControl id="time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.time ? new Date(formik.values?.time) : null}
              onChange={(value: Date) => formik.setFieldValue('time', value)}
            />
          </FormControl>
          <AsyncSelect<MentorInterface>
            formik={formik}
            name={'mentor_id'}
            label={'Select Mentor'}
            placeholder={'Select Mentor'}
            fetcher={getMentors}
            labelField={'specialization'}
          />
          <AsyncSelect<AppUserInterface>
            formik={formik}
            name={'app_user_id'}
            label={'Select App User'}
            placeholder={'Select App User'}
            fetcher={getAppUsers}
            labelField={'interests'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/appointments')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'appointment',
    operation: AccessOperationEnum.CREATE,
  }),
)(AppointmentCreatePage);
