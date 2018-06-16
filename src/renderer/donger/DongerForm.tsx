import { Formik, FormikProps } from "formik"
import React from "react"
import { linkFormikField } from "../formik/helpers"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"

export interface DongerFormValues {
  body: string
}

export interface DongerFormProps {
  onSubmit: (values: DongerFormValues) => void
}

export class DongerForm extends React.Component<DongerFormProps> {
  form = React.createRef<Formik<{}, DongerFormValues>>()

  render() {
    return (
      <Formik<{}, DongerFormValues>
        initialValues={{ body: "" }}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        ref={this.form}
      />
    )
  }

  renderForm = (props: FormikProps<DongerFormValues>) => (
    <form onSubmit={props.handleSubmit} style={{ display: "flex" }}>
      <TextInput
        placeholder="Add new donger? (´・◡ ・｀)"
        style={{ width: "270px", marginRight: "0.5rem" }}
        {...linkFormikField(props, "body")}
      />
      <Button>Add</Button>
    </form>
  )

  handleSubmit = (values: DongerFormValues) => {
    const body = values.body.trim()
    if (body === "") {
      alert("You can't have a donger without a body, stupid (´・◡ ・｀)")
      return
    }

    if (this.form.current) {
      this.form.current.setFieldValue("body", "")
    }

    this.props.onSubmit({ body })
  }
}
