import {
  char,
  varchar,
  mysqlTable,
  timestamp,
  mysqlEnum,
  foreignKey,
  text,
  longtext,
} from "drizzle-orm/mysql-core";

const rolesEnum = mysqlEnum("role", ["user", "admin"]);
const statusEnum = mysqlEnum("status", ["pending", "draft", "published"]);
const actionEnum = mysqlEnum("action", ["POST", "COMMENT"]);

/**
 * Table *users*
 *
 * **id (PK)**: char(36), Primary key, ID unik
 * 
 * **username**: char(50), Nama dari user
 * 
 * **email**: char(100), Email dari user
 * 
 * **password**: char(255), Password dari user, enkripsi menggunakan bcrypt
 * 
 * **role**: char(50), role dari user berupa enum, bisa berisi “user” atau “admin”
 * 
 */
export const users = mysqlTable("users", {
  id: char("id", { length: 12 }).unique().notNull().primaryKey(),
  username: varchar("username", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: rolesEnum.notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

/**
 * Table *forums*
 *
 * **id (PK)**: **id** char(36), Primary key, ID unik
 * 
 * **userId**: **user_id** char(36), ID dari user (relasi ke tabel users)
 * 
 * **title**: **title** varchar(255), Judul dari forum
 * 
 * **content**: **content** text, Isi dari forum
 * 
 * **parentId (FK -> self)**: **parent_id** char(36), Id dari forum utama (Nullable)
 * 
 * **status**: **status** varchar(255), Enum status post forum bisa berisi “pending”, “draft”, “published”
 * 
 * **data**: **data** json, Informasi tambahan dalam format JSON (contoh: { "answered": true } )
 * 
 * **createdAt**: **created_at** datetime, Waktu pembuatan data
 * 
 * **updatedAt**: **updated_at** datetime, Waktu terakhir data diupdate
 * 
 */
export const forums = mysqlTable(
  "forums",
  {
    id: char("id", { length: 16 }).unique().notNull().primaryKey(),
    userId: char("user_id", { length: 12 })
      .notNull()
      .references(() => users.id),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    parentId: char("parent_id", { length: 16 }),
    status: statusEnum.notNull().default("pending"),
    data: longtext("data"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      name: "parent_id_fk",
      columns: [table.parentId],
      foreignColumns: [table.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ]
);

/**
 * Table *logs*
 *
 * **id (PK)**: char(36), Primary key, UUID unik untuk log
 * 
 * **userId (FK -> users.id)**: char(36), ID pengguna yang melakukan aksi
 * 
 * **code**: varchar(255), Kode log tertentu (custom identifier: "FORUM")
 * 
 * **action**: varchar(255), Jenis aksi yang dilakukan (contoh: "POST", "COMMENT")
 * 
 * **description**: text, Deskripsi tambahan tentang aksi (contoh: "Membuat forum baru", "Menjawab pertanyaan")
 * 
 * **data**: json, Data tambahan terkait aksi dalam format JSON (opsional karena belum ada keperluan yang membutuhkan data tambahan)
 * 
 * **createdAt**: datetime, Waktu log dibuat
 * 
 * **updatedAt**: datetime, Waktu log diubah (opsional jika diperlukan)
 *
 */
export const logs = mysqlTable("logs", {
  id: char("id", { length: 16 }).unique().notNull().primaryKey(),
  userId: char("user_id", { length: 12 })
    .notNull()
    .references(() => users.id),
  code: varchar("code", { length: 255 }).notNull().default("FORUM"),
  action: actionEnum.notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  data: longtext("data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
