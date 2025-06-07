import { sql } from "../dbConnection.mjs";

// Get all tours

export const allTours = async () => {
  const allTours = await sql`
    SELECT * FROM tours
    `;
  return allTours;
};

//New Tour

export const insertNewTour = async (newTour) => {
  const { title, picture, duration_hours, duration_minutes, dates, price } = newTour;

  const [tour] = await sql`
      INSERT into tours
      (title, picture, duration_hours, duration_minutes, dates, price)
      VALUES 
      (${title}, ${picture}, ${duration_hours}, ${duration_minutes}, ${dates},${price})
      RETURNING*
      `;

  return tour;
};