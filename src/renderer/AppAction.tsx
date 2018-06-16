import React from "react"
import { Button } from "./ui/Button"
import { Icon } from "./ui/Icon"

export interface AppActionProps {
  icon: string
  label: string
}

export class AppAction extends React.Component<AppActionProps> {
  render() {
    const { icon, label } = this.props
    return (
      <Button>
        <Icon name={icon} /> <span>{label}</span>
      </Button>
    )
  }
}
