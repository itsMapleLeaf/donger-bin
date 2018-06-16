import { FormikProps } from "formik"

export function linkFormikField<V>(props: FormikProps<V>, fieldName: keyof V) {
  return {
    name: fieldName,
    value: props.values[fieldName],
    onChange: props.handleChange,
    onBlur: props.handleBlur,
  }
}
