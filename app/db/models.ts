import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
    email: text("email").notNull(),
    password: text("password").notNull(),

});

export const order = sqliteTable("order", {
    id: integer("id").primaryKey({autoIncrement: true}).unique(),
    clientId: integer("client_id").references(() => clients.id),
    userId: integer('user_id').references(() => users.id)
})

export const orderItems = sqliteTable("order_items", {
    id: integer("id").primaryKey({ autoIncrement: true }).unique(),
    inventoryId: integer("inventory_id").references(() => inventory.id),
    orderId: integer("order_id").references(() => order.id),
    price: text("price"),
    quantity: integer("quantity"),
  });

export const inventory = sqliteTable("inventory", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
  userId: integer("user_id").references(() => users.id),
  price: text("price").notNull(),
  quantity: integer("quantity"),
  weight: text("weight"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const clients = sqliteTable("clients", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  debt: text("debt"),
});


export const tickets = sqliteTable("tickets", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
  userId: integer("user_id").references(() => users.id),
  clientId: integer("client_id").references(() => ticketItems.clientId),
  ticketItemsId: integer("ticket_items_id").references(() => ticketItems.id),
  total: text("price").notNull(),
  isPaid: integer("is_paid", { mode: "boolean" }).notNull(),
  paid: text("paid"),
  debt: text("debt"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ticketItems: any = sqliteTable("ticket_items", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
  clientId: integer("client_id").references(() => clients.id),
  inventoryId: integer("inventory_id").references(() => inventory.id),
  ticketId: integer("ticket_id").references(() => tickets.id),
  price: text("price").notNull(),
  quantity: integer("quantity"),
  weight: text("weight"),
});
