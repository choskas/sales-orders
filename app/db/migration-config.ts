import { migrate } from 'drizzle-orm/libsql/migrator'

import { SalesDB } from './config'

migrate(SalesDB, { migrationsFolder: 'app/db/migrations' })
  .then(() => {
    console.log('Migrations completed!')
  })
  .catch((err) => {
    console.error('Migrations failed!', err)
  })