import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useRef } from 'react';
import { Field, useField, UseFieldConfig } from 'react-final-form';

export interface LabeledTextareaProps extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  fieldProps?: UseFieldConfig<string>;
}

export const LabeledTextField = forwardRef<HTMLTextAreaElement, LabeledTextareaProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => (v === '' ? null : v),
      ...fieldProps,
    });

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError;

    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col">
          {label}
          <Field
            {...input}
            ref={ref}
            disabled={submitting}
            className="focus:ring-horz-blue resize-y h-screen focus:ring outline-none p-1 dark:bg-gray-800 dark:text-white rounded-md border border-horz-green mt-0.5"
            {...props}
            component={'textarea'}
            spellCheck={true}
          />
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
