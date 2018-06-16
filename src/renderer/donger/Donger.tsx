import { darken } from "polished"
import React from "react"
import styled from "react-emotion"
import { DongerData } from "../../DongerData"
import { themeColor } from "../ui/colors"
import { hoverReveal } from "../ui/hoverReveal"

export interface DongerProps {
  donger: DongerData
  onClick: (donger: DongerData) => void
  onContextMenu: (donger: DongerData) => void
}

export class Donger extends React.Component<DongerProps> {
  render() {
    const { donger, onClick, onContextMenu } = this.props
    return (
      <Anchor
        href="#"
        onClick={() => onClick(donger)}
        onContextMenu={() => onContextMenu(donger)}
        children={donger.body}
      />
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
