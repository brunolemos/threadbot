import { router } from 'microrouter'

import './features/typing'

/* tslint:disable no-var-requires */
export default router(
  ...require('./routes/index').default,
  ...require('./routes/actions').default,
  ...require('./routes/oauth').default,
)
