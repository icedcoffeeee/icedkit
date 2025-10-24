import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "./$types";
import { users, type User } from "$/lib/schema";
import { db } from "$/lib/db";
import { eq } from "drizzle-orm";

export function load({ locals }: PageServerLoadEvent) {
  if (!locals.user) redirect(301, "/login");
}

export const actions: Actions = {
  async default({ locals, request }) {
    if (!locals.user) return;

    const data = await request.formData();
    const user: User = Object.fromEntries(data) as any;
    await db.update(users).set(user).where(eq(users.id, locals.user.id));
  },
};
