import { clipboard, remote } from "electron"
import React from "react"
import styled from "react-emotion"
import { DongerData } from "../DongerData"
import { dongerStorage } from "../dongerStorage"
import { Donger } from "./donger/Donger"
import { DongerForm, DongerFormValues } from "./donger/DongerForm"
import { openDongerContextMenu } from "./donger/openDongerContextMenu"

const headerMessage = "Choose your donger wisely ( ͡° ͜ʖ ͡°)"

const compareLastUsed = (a: DongerData, b: DongerData) =>
  b.lastUsed - a.lastUsed

interface AppState {
  dongers: DongerData[]
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    dongers: [],
  }

  async componentDidMount() {
    const { dongers } = await dongerStorage.load()
    this.setState({ dongers })
  }

  componentDidUpdate() {
    this.saveDongers()
  }

  render() {
    const dongerElements = this.state.dongers
      .slice()
      .sort(compareLastUsed)
      .map(this.renderDonger)

    return (
      <Main>
        <Header>
          <h1>{headerMessage}</h1>
        </Header>

        <DongerList>{dongerElements}</DongerList>

        <Actions>
          <DongerForm onSubmit={this.handleDongerSubmit} />
        </Actions>
      </Main>
    )
  }

  handleDongerSubmit = ({ body }: DongerFormValues) => {
    const id = String(Math.random())
    this.addDonger(new DongerData(id, body))
  }

  openDongerContextMenu = async (donger: DongerData) => {
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

  updateLastUsed = ({ id }: DongerData) => {
    this.setState((state) => ({
      dongers: state.dongers.map((donger) => {
        return donger.id === id ? { ...donger, lastUsed: Date.now() } : donger
      }),
    }))
  }

  saveDongers = () => {
    dongerStorage.save({ dongers: this.state.dongers })
  }

  copyDonger = (donger: DongerData) => {
    this.updateLastUsed(donger)
    clipboard.writeText(donger.body)
    remote.getCurrentWindow().hide()
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
`

const Header = styled("header")`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  padding: 1rem;

  flex-shrink: 0;
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

  flex-shrink: 0;
`
