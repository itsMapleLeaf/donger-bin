import { clipboard, remote } from "electron"
import React from "react"
import styled from "react-emotion"
import { DongerData } from "../DongerData"
import { Donger } from "./donger/Donger"
import { DongerForm, DongerFormValues } from "./donger/DongerForm"
import { openDongerContextMenu } from "./donger/openDongerContextMenu"

const { BrowserWindow } = remote.require("electron") as typeof Electron

const headerMessage = "Choose your donger wisely ( ͡° ͜ʖ ͡°)"

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
      <Main>
        <Header>
          <h1>{headerMessage}</h1>
        </Header>

        <DongerList>{this.state.dongers.map(this.renderDonger)}</DongerList>

        <Actions>
          <DongerForm onSubmit={this.handleDongerSubmit} />
        </Actions>
      </Main>
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
      onClick={this.copyDonger}
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

  copyDonger = (donger: DongerData) => {
    clipboard.writeText(donger.body)

    const [window] = BrowserWindow.getAllWindows()
    window.hide()
  }
}

const Main = styled("main")`
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

const Header = styled("header")`
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

const Actions = styled("section")`
  padding: 0.5rem;
  display: flex;
  justify-content: center;

  > :not(:last-child) {
    margin-right: 0.5rem;
  }
`
