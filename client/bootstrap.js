import { store } from '@things-factory/shell'
import { html } from 'lit-element'
import { APPEND_APP_TOOL, TOOL_POSITION } from '@things-factory/layout-base'

import '@material/mwc-icon/mwc-icon'

export default function bootstrap() {
  store.dispatch({
    type: APPEND_APP_TOOL,
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
