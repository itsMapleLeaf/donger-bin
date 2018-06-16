import { Formik, FormikProps } from "formik"
import React from "react"
import { Button } from "./ui/Button"
import { TextInput } from "./ui/TextInput"

export interface DongerFormValues {
  body: string
}

export interface DongerFormProps {
  onSubmit: (values: DongerFormValues) => void
}

export class DongerForm extends React.Component<DongerFormProps> {
  // TODO: consider using new react refs
  form: Formik<{}, DongerFormValues> | null = null

  render() {
    return (
      <Formik<{}, DongerFormValues>
        initialValues={{ body: "" }}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        ref={(form) => (this.form = form)}
      />
    )
  }

  renderForm = (props: FormikProps<DongerFormValues>) => (
    <form onSubmit={props.handleSubmit} style={{ display: "flex" }}>
      <TextInput
        name="body"
        placeholder="Add new donger? (´・◡ ・｀)"
        style={{ width: "270px", marginRight: "0.5rem" }}
        value={props.values.body}
        onChange={props.handleChange}
      />
      <Button>Add</Button>
    </form>
  )

  handleSubmit = (values: DongerFormValues) => {
    this.props.onSubmit(values)
    if (this.form) {
      this.form.setFieldValue("body", "")
    }
  }
}
