import { DongerData } from "./DongerData"

const ipcChannel = "app-message"

type IpcMessage = { type: "donger-context-menu"; donger: DongerData }

interface Channel {
  send(channel: string, data: string): void
  on(channel: string, listener: (event: Electron.Event, arg: any) => void): void
}

export class MessageSender {
  constructor(private channel: Channel) {}

  send(message: IpcMessage) {
    this.channel.send(ipcChannel, JSON.stringify(message))
  }

  listen(handler: (message: IpcMessage) => void) {
    // this.channel.on()
  }
}
