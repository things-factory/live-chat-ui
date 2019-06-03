import { html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'
import '@material/mwc-button/mwc-button'
import * as faye from 'faye'

class LiveChat extends connect(store)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          padding: 15px;
        }
        #msg-container {
          flex: 1;
          padding: 10px;
          border: 1px solid black;
          overflow-y: auto;
          word-break: break-word;
        }
        .msg-wrapper {
          display: grid;
        }
        .msg-wrapper > p {
          border-radius: 10px;
          padding: 8px;
          color: white;
        }
        .others-message {
          background-color: skyblue;
          text-align: left;
          margin-right: auto;
        }
        .my-message {
          background-color: tomato;
          text-align: right;
          margin-left: auto;
        }

        section {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .message-action {
          padding-top: 10px;
          display: flex;
        }

        input#messageId {
          flex: 1;
        }
      `
    ]
  }

  static get properties() {
    return {
      liveChatUi: String,
      messages: Array
    }
  }

  constructor() {
    super()
    this.messages = []
  }

  render() {
    return html`
      <section>
        <h2>Welcome To OPAone Live Chat</h2>
        <div id="msg-container">
          ${(this.messages || []).map(
            message => html`
              <div class="msg-wrapper">
                ${message.sender === this.userEmail
                  ? html`
                      <p class="my-message">${message.text}</p>
                    `
                  : html`
                      <p class="others-message">@${message.sender}: ${message.text}</p>
                    `}
              </div>
            `
          )}
        </div>
        <div class="message-action">
          <input
            type="text"
            name="message"
            id="messageId"
            @keypress="${e => {
              if (e.keyCode === 13) this._sendMsg()
            }}"
          />
          <mwc-button @click="${this._sendMsg}">Send</mwc-button>
        </div>
      </section>
    `
  }

  async firstUpdated() {
    this.fayeClient = new faye.Client('http://localhost:8000/publisher')
    await this.fayeClient.subscribe('/livechat', message => {
      this.messages.push(message)
      this.requestUpdate()
    })

    this.fayeClient.publish('/livechat', {
      sender: this.userEmail,
      text: 'Joined.'
    })
  }

  _sendMsg() {
    const input = this.shadowRoot.querySelector('#messageId')
    this.fayeClient.publish('/livechat', {
      sender: this.userEmail,
      text: input.value
    })
    input.value = ''
  }

  stateChanged(state) {
    this.userEmail = state.auth.user && state.auth.user.email
  }
}

window.customElements.define('live-chat', LiveChat)
