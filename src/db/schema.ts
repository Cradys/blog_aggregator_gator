import { pgTable, timestamp, uuid, text, integer } from "drizzle-orm/pg-core";
import { defineRelations } from 'drizzle-orm';

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  userId: uuid("user_id").references(() => users.id).notNull()
});


export const relations = defineRelations({users, feeds}, (r) => ({
  users: {
    feed: r.many.feeds()
  },
  feeds: {
    user: r.one.users({
      from: r.feeds.userId,
      to: r.users.id
    })
  }
}))