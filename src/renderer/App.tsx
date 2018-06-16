import React from "react"
import styled from "react-emotion"
import { DongerData } from "../DongerData"
import { Donger } from "./Donger"
import { openDongerContextMenu } from "./openDongerContextMenu"
import { Button } from "./ui/Button"
import { TextInput } from "./ui/TextInput"

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
`

const AppActionSection = styled("section")`
  padding: 0.5rem;
  display: flex;
  justify-content: center;

  > :not(:last-child) {
    margin-right: 0.5rem;
  }
`

export class App extends React.Component {
  render() {
    return (
      <AppMain>
        <AppHeader>
          <h1>{headerMessage}</h1>
        </AppHeader>

        <DongerList>
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
          <Donger
            donger={{ id: "foobar", body: "(´・◡ ・｀)" }}
            onContextMenu={this.openDongerContextMenu}
          />
        </DongerList>

        <AppActionSection>
          <TextInput
            style={{ width: "270px" }}
            placeholder="Add new donger? (´・◡ ・｀)"
          />
          <Button>Add</Button>
        </AppActionSection>
      </AppMain>
    )
  }

  openDongerContextMenu = (donger: DongerData) => {
    openDongerContextMenu()
  }
}
