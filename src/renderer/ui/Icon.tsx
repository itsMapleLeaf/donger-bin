import React from "react"

export interface IconProps {
  name: string
}

export class Icon extends React.Component<IconProps> {
  render() {
    return <i className={`mdi mdi-24px mdi-${this.props.name}`} />
  }
}
