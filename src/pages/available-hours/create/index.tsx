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

import { createAvailableHours } from 'apiSdk/available-hours';
import { availableHoursValidationSchema } from 'validationSchema/available-hours';
import { MentorInterface } from 'interfaces/mentor';
import { getMentors } from 'apiSdk/mentors';
import { AvailableHoursInterface } from 'interfaces/available-hours';

function AvailableHoursCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AvailableHoursInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAvailableHours(values);
      resetForm();
      router.push('/available-hours');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AvailableHoursInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      day_of_week: 0,
      mentor_id: (router.query.mentor_id as string) ?? null,
    },
    validationSchema: availableHoursValidationSchema,
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
              label: 'Available Hours',
              link: '/available-hours',
            },
            {
              label: 'Create Available Hours',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Available Hours
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>

          <NumberInput
            label="Day Of Week"
            formControlProps={{
              id: 'day_of_week',
              isInvalid: !!formik.errors?.day_of_week,
            }}
            name="day_of_week"
            error={formik.errors?.day_of_week}
            value={formik.values?.day_of_week}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('day_of_week', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<MentorInterface>
            formik={formik}
            name={'mentor_id'}
            label={'Select Mentor'}
            placeholder={'Select Mentor'}
            fetcher={getMentors}
            labelField={'specialization'}
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
              onClick={() => router.push('/available-hours')}
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
    entity: 'available_hours',
    operation: AccessOperationEnum.CREATE,
  }),
)(AvailableHoursCreatePage);
