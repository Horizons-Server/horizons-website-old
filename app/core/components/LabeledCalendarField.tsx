import { ComponentPropsWithoutRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { Field, useField } from 'react-final-form';

import 'react-calendar/dist/Calendar.css';

export interface LabeledCalendarFieldProps {
  name: string;
  label: string;
  className?: string;
  calendarProps?: CalendarProps;
  labelProps?: ComponentPropsWithoutRef<'label'>;
}

export const LabeledCalendarField = ({
  name,
  label,
  className,
  calendarProps,
  labelProps,
}: LabeledCalendarFieldProps) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {});

  const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

  return (
    <div>
      <label {...labelProps} className={className}>
        {label}
        <Field {...input} disabled={submitting}>
          {(props) => (
            <Calendar
              {...calendarProps}
              value={props.input.value}
              onChange={props.input.onChange}
              className={'text-black'}
            />
          )}
        </Field>
      </label>
      {touched && normalizedError && (
        <div role="alert" style={{ color: 'red' }}>
          {normalizedError}
        </div>
      )}
    </div>
  );
};
