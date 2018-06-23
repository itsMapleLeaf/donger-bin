import { clipboard, remote } from "electron"
import React from "react"
import { DongerData } from "../../shared/donger/DongerData"
import { dongerStorage } from "../../shared/donger/dongerStorage"

const { Menu } = remote.require("electron") as typeof Electron

interface AppControllerProps {
  children: (props: AppControllerRenderProps) => React.ReactNode
}

interface AppControllerState {
  dongers: DongerData[]
  lastUsed: string[]
}

interface AppControllerRenderProps {
  dongers: DongerData[]
  lastUsed: string[]
  addDonger: (donger: DongerData) => void
  copyDonger: (donger: DongerData) => void
  openDongerMenu: (donger: DongerData) => void
}

export class AppController extends React.Component<
  AppControllerProps,
  AppControllerState
> {
  state: AppControllerState = {
    dongers: [],
    lastUsed: [],
  }

  async componentDidMount() {
    const { dongers, lastUsed } = await dongerStorage.load()
    this.setState({ dongers, lastUsed })
  }

  componentDidUpdate() {
    this.saveDongers()
  }

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
      lastUsed: [...state.lastUsed, id].slice(-50),
    }))
  }

  saveDongers = () => {
    const { dongers, lastUsed } = this.state
    dongerStorage.save({ dongers, lastUsed })
  }

  copyDonger = (donger: DongerData) => {
    this.updateLastUsed(donger)
    clipboard.writeText(donger.body)
    remote.getCurrentWindow().hide()
  }

  openDongerMenu = (donger: DongerData) => {
    const menu = Menu.buildFromTemplate([
      {
        label: "Delete",
        click: () => {
          this.removeDonger(donger)
        },
      },
    ])

    menu.popup({})
  }

  render() {
    const { state, addDonger, copyDonger, openDongerMenu } = this
    const { dongers, lastUsed } = state

    return this.props.children({
      dongers,
      lastUsed,
      addDonger,
      copyDonger,
      openDongerMenu,
    })
  }
}
