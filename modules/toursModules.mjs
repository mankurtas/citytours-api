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

  if (!title || !picture || !Array.isArray(dates) || isNaN(price)) {
      throw new Error("Missing or invalid tour fields");
    }

  const [tour] = await sql`
      INSERT into tours
      (title, picture, duration_hours, duration_minutes, dates, price)
      VALUES 
      (${title}, ${picture}, ${duration_hours}, ${duration_minutes}, ${dates},${price})
      RETURNING*
      `;

  return tour;
};

//Update tour
export const updateTourById = async (id, upTour) => {
  const columns = Object.keys(upTour);

  const [updatedTour] = await sql`
    UPDATE tours
    SET ${sql(upTour, columns)}
    WHERE id = ${id} 
    RETURNING *
    `;

  return updatedTour;
};


// Delete tour

export const deleteTourById = async (id) => {
  const [tour] = await sql`
    DELETE FROM tours
    WHERE tours.id = ${id} 
    `;

  return tour;
};