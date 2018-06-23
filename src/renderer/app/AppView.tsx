import React from "react"
import styled from "react-emotion"
import { getFrequency } from "../../shared/array/helpers"
import { DongerData } from "../../shared/donger/DongerData"
import { Donger } from "../donger/Donger"
import { DongerForm, DongerFormState } from "../donger/DongerForm"

export const headerMessage = "Choose your donger wisely ( ͡° ͜ʖ ͡°)"

export interface AppViewProps {
  dongers: DongerData[]
  lastUsed: Array<DongerData["id"]>
  onDongerFormSubmit: (values: DongerFormState) => void
  onDongerClick: (donger: DongerData) => void
  onDongerContextMenu: (donger: DongerData) => void
}

export class AppView extends React.Component<AppViewProps> {
  render() {
    const { dongers, lastUsed, onDongerFormSubmit } = this.props

    const dongerElements = dongers
      .slice()
      .sort((a, b) => {
        return getFrequency(lastUsed, b.id) - getFrequency(lastUsed, a.id)
      })
      .map(this.renderDonger)

    return (
      <Main>
        <Header>
          <h1>{headerMessage}</h1>
        </Header>

        <DongerList>{dongerElements}</DongerList>

        <Actions>
          <DongerForm onSubmit={onDongerFormSubmit} />
        </Actions>
      </Main>
    )
  }

  renderDonger = (donger: DongerData) => {
    const { onDongerClick, onDongerContextMenu } = this.props
    return (
      <Donger
        key={donger.id}
        donger={donger}
        onClick={onDongerClick}
        onContextMenu={onDongerContextMenu}
      />
    )
  }
}

export const Main = styled("main")`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  > :nth-child(2) {
    flex-grow: 1;
    overflow: auto;
  }
`

export const Header = styled("header")`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  padding: 1rem;

  flex-shrink: 0;
`

export const DongerList = styled("section")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 0.5rem;
  > * {
    margin: 0.5rem;
  }

  overflow-x: hidden;
`

export const Actions = styled("section")`
  padding: 0.5rem;
  display: flex;
  justify-content: center;

  > :not(:last-child) {
    margin-right: 0.5rem;
  }

  flex-shrink: 0;
`
