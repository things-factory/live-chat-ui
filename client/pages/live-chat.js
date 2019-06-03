import { html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, PageView } from '@things-factory/shell'

class LiveChat extends connect(store)(PageView) {
  static styles() {
    return [
      css`
        .system-message {
          color: blue;
        }
        .my-message {
          color: red;
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

  render() {
    return html`
      <section>
        <h2>Welcome To OPAone Live Chat</h2>
        <div id="msg-container">
          ${this.messages.map(
            message => html`
              ${message.sender === 'system'
                ? html`
                    <p class="system-message">${message.content}</p>
                  `
                : html`
                    <p class="my-message">${message.content}</p>
                  `}
            `
          )}
        </div>
        <input type="text" name="message" id="messageId" />
        <mwc-button>Send</mwc-button>
      </section>
    `
  }

  constructor() {
    super()
    this.messages = [
      {
        sender: 'customer',
        message: 'Hello, can I ask you something?'
      },
      {
        sender: 'system',
        message: 'No Im busy'
      }
    ]
  }

  stateChanged(state) {
    this.liveChatUi = state.liveChatUi.state_main
  }
}

window.customElements.define('live-chat', LiveChat)
