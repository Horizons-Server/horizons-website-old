import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { Field, useField } from 'react-final-form';

import 'react-calendar/dist/Calendar.css';

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['select']> {
  name: string;
  label: string;
  type: 'number' | 'string';
  options: { label: string; value: number }[];
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, label, outerProps, labelProps, options, ...props }, ref) => {
    const {
      input,
      meta: { submitting, error, submitError, touched },
    } = useField(name, {
      parse: props.type === 'number' ? (Number as any) : (v) => (v === '' ? null : v),
    });

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col">
          {label}
          <Field
            {...input}
            ref={ref}
            {...props}
            component={'select'}
            className="border rounded-md dark:bg-gray-800 border-horz-green"
          >
            <option />
            {options.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </Field>
        </label>
        {touched && normalizedError && (
          <div role="alert" style={{ color: 'red' }}>
            {normalizedError}
          </div>
        )}
      </div>
    );
  },
);
