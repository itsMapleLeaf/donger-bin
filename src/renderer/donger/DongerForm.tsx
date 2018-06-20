import React from "react"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"

export interface DongerFormProps {
  onSubmit: (values: DongerFormState) => void
}

export interface DongerFormState {
  body: string
}

export class DongerForm extends React.Component<
  DongerFormProps,
  DongerFormState
> {
  state: DongerFormState = {
    body: "",
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
        <TextInput
          placeholder="Add new donger? (´・◡ ・｀)"
          style={{ width: "270px", marginRight: "0.5rem" }}
          value={this.state.body}
          onChange={(event) => this.setState({ body: event.target.value })}
        />
        <Button>Add</Button>
      </form>
    )
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const body = this.state.body.trim()
    if (body === "") {
      alert("You can't have a donger without a body, stupid (´・◡ ・｀)")
      return
    }

    this.props.onSubmit({ body })

    this.setState({ body: "" })
  }
}
