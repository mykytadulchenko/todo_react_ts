import WebSocket from "ws"

export interface WebSocketExtended extends WebSocket {
    id?: string
}