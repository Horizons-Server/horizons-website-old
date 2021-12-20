import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { Field } from 'react-final-form';

import 'react-calendar/dist/Calendar.css';

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['select']> {
  name: string;
  label: string;
  options: { label: string; value: number }[];
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, label, outerProps, labelProps, options, ...props }: LabeledSelectFieldProps) => {
    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col">
          {label}
          <Field
            name={name}
            {...props}
            component={'select'}
            className="border rounded-md dark:bg-gray-800 border-horz-green"
          >
            {options.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </Field>
        </label>
      </div>
    );
  },
);
