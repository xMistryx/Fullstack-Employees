import db from "#db/client";
import { faker } from "@faker-js/faker";

async function seedEmployees() {
  // TODO
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const birthday = faker.date.birthdate({ min: 18, max: 75 });
    const salary = faker.number.int({min: 40000, max: 200000});
    const SQL = `
      INSERT INTO employees(name, birthday, salary)
      VALUES($1, $2, $3) RETURNING * 
    `;
    await db.query(SQL, [name, birthday, salary])
  }
}

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");