/**
 * ! Executing this script will delete all data in your database and seed it with 10 verificationToken.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed'
import { copycat } from '@snaplet/copycat'

const main = async () => {
  const seed = await createSeedClient()

  // Truncate all tables in the database
  await seed.$resetDatabase()
  // Seed the database with 10 users
  await seed.user((createMany) =>
    createMany(10, (index) => ({
      email: copycat.email(index.index),
      name: copycat.words(index.index, { min: 1, max: 3 }),
      posts: (createMany) => createMany(10),
    })),
  )

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!')

  process.exit()
}

main()
