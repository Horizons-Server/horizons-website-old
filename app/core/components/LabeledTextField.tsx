import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number' | 'bigtext';
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  fieldProps?: UseFieldConfig<string>;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === 'number'
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === '' ? null : v),
      ...fieldProps,
    });

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col">
          {label}
          {props.type === 'bigtext' ? (
            <textarea
              {...input}
              disabled={submitting}
              // {...props}
              // ref={ref}
              spellCheck={true}
              className="resize p-1 dark:bg-gray-800 dark:text-white rounded-md border border-horz-green  mt-0.5"
            />
          ) : (
            <input
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              className="p-1 dark:bg-gray-800 dark:text-white rounded-md border border-horz-green  mt-0.5"
            />
          )}
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

export default LabeledTextField;
