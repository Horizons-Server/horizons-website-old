import { ComponentPropsWithoutRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { Field } from 'react-final-form';

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
  return (
    <label {...labelProps} className={className}>
      {label}
      <Field name={name}>
        {(props) => <Calendar {...calendarProps} {...props.input} className={'text-black'} />}
      </Field>
    </label>
  );
};
