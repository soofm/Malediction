export interface Api {
  send(channel: string, data: any): void
  on(channel: string, f: Function): void
}
