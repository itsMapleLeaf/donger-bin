import React from "react"
import { DongerData } from "../../shared/donger/DongerData"
import { AppController } from "./AppController"
import { AppView } from "./AppView"

export class App extends React.Component {
  render() {
    return (
      <AppController>
        {(props) => (
          <AppView
            dongers={props.dongers}
            lastUsed={props.lastUsed}
            onDongerClick={props.copyDonger}
            onDongerFormSubmit={(state) => {
              const id = String(Math.random())
              props.addDonger(new DongerData(id, state.body))
            }}
            onDongerContextMenu={props.openDongerMenu}
          />
        )}
      </AppController>
    )
  }
}
