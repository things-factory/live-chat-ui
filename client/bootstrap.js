import { store } from '@things-factory/shell'
import { APPEND_HEADERBAR, TOOL_POSITION } from '@things-factory/layout-base'

export default function bootstrap() {
  store.dispatch({
    type: APPEND_HEADERBAR,
    tool: {
      template: html`
        <a href="live-chat" style="color:inherit;">
          <mwc-icon style="vertical-align:middle;">
            chat
          </mwc-icon>
        </a>
      `,
      position: TOOL_POSITION.REAR_END
    }
  })
}
