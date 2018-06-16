import React from "react"
import styled from "react-emotion"
import { DongerData } from "../DongerData"
import { Donger } from "./Donger"
import { DongerForm, DongerFormValues } from "./DongerForm"
import { openDongerContextMenu } from "./openDongerContextMenu"

const headerMessage = "Choose your donger wisely ( ͡° ͜ʖ ͡°)"

const AppMain = styled("main")`
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

  > :last-child {
    flex-shrink: 0;
  }
`

const AppHeader = styled("header")`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  padding: 1rem;
`

const DongerList = styled("section")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 0.5rem;
  > * {
    margin: 0.5rem;
  }

  overflow-x: hidden;
`

const AppActionSection = styled("section")`
  padding: 0.5rem;
  display: flex;
  justify-content: center;

  > :not(:last-child) {
    margin-right: 0.5rem;
  }
`

interface AppState {
  dongers: DongerData[]
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    dongers: [
      { id: "shrug", body: String.raw`¯\_(ツ)_/¯` },
      { id: "shrug (markdown)", body: String.raw`¯\\\_(ツ)\_/¯` },
      { id: "flower", body: `(◕‿◕✿)` },
      { id: "peace", body: `(⌣‿⌣✿)` },
      { id: "give", body: `༼ つ ◕_◕ ༽つ` },
      { id: "OG", body: `ヽ༼ຈل͜ຈ༽ﾉ` },
      { id: "lenny", body: `( ͡° ͜ʖ ͡°)` },
      { id: "lenny (drugs)", body: "( ͡☉ ͜ʖ ͡☉)" },
      { id: "dance", body: `ᕕ( ᐛ )ᕗ` },
      { id: "stars", body: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧` },
      { id: "shige", body: `(´・◡ ・｀)` },
    ],
  }

  render() {
    return (
      <AppMain>
        <AppHeader>
          <h1>{headerMessage}</h1>
        </AppHeader>

        <DongerList>{this.state.dongers.map(this.renderDonger)}</DongerList>

        <AppActionSection>
          <DongerForm onSubmit={this.handleDongerSubmit} />
        </AppActionSection>
      </AppMain>
    )
  }

  handleDongerSubmit = ({ body }: DongerFormValues) => {
    this.addDonger({
      id: String(Math.random()),
      body,
    })
  }

  openDongerContextMenu = (donger: DongerData) => {
    openDongerContextMenu({
      onDelete: () => this.removeDonger(donger),
    })
  }

  renderDonger = (donger: DongerData) => (
    <Donger
      key={donger.id}
      donger={donger}
      onContextMenu={this.openDongerContextMenu}
    />
  )

  addDonger = (newDonger: DongerData) => {
    this.setState((state) => ({
      dongers: [newDonger, ...state.dongers],
    }))
  }

  removeDonger = (donger: DongerData) => {
    this.setState((state) => ({
      dongers: state.dongers.filter((other) => other.id !== donger.id),
    }))
  }
}
