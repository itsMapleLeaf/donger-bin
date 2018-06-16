import { darken } from "polished"
import React from "react"
import styled from "react-emotion"
import { DongerData } from "../../DongerData"
import { themeColor } from "../ui/colors"
import { hoverReveal } from "../ui/hoverReveal"

export interface DongerProps {
  donger: DongerData
  onContextMenu: (donger: DongerData) => void
}

export class Donger extends React.Component<DongerProps> {
  render() {
    const { donger } = this.props
    return (
      <Anchor href="#" onContextMenu={() => this.props.onContextMenu(donger)}>
        {donger.body}
      </Anchor>
    )
  }
}

const Anchor = styled("a")`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;
  width: 12rem;

  background-color: ${darken(0.05, themeColor)};

  ${hoverReveal};
`
