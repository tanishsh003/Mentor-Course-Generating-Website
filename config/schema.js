import { integer, pgTable, varchar , boolean, json } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId:varchar()
});

export const coursesTable=pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull(),

  name:varchar(),
  description:varchar(),

  noOfChapters:integer().notNull(),
  includeVideo:boolean().default(false),
  level:varchar().notNull(),
  category:varchar(),
  courseJson:json(),
  bannerImageUrl:varchar().default('value'),
  userEmail: varchar('userEmail').references(()=>usersTable.email, { onDelete: 'cascade' }),
})