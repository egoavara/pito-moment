import { pito } from "pito"
import tap from "tap"
import '../cjs/index.js'

tap.test('simple', async t => {
    t.same(pito.strict(pito.Moment('date')), { type: 'string', format: 'date' })
    t.same(pito.strict(pito.Moment('date-time')), { type: 'string', format: 'date-time' })
})