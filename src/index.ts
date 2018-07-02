import { router } from 'microrouter'

import { initAllFeatures } from './init/features'

initAllFeatures()

/* tslint:disable no-var-requires */
export default router(
  ...require('./routes/index').default,
  ...require('./routes/actions').default,
  ...require('./routes/commands').default,
  ...require('./routes/oauth').default,
)
