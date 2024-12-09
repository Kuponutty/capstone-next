// import { Sequelize } from "sequelize";
// import * as tedious from "tedious";

// const sequelize = new Sequelize("timesheetdb", "timesheetadmin", "JmDeCp#1", {
//   host: "sheetserv.database.windows.net",
//   dialect: "mssql",
//   dialectModule: tedious,
// });

// export default async function handler(req, res) {
//   try {
//     const startDate = "2024-11-18";
//     const periodSQL = `SELECT id FROM reporting_periods WHERE start_date = '${startDate}'`;
//     const periodResult = await sequelize.query(periodSQL, { type: Sequelize.QueryTypes.SELECT });
//     const currentPeriodID = periodResult[0].id;

//     // Fetch submitted timesheets
//     const sheetsSQL = `
//       SELECT t.user_wid, l.start_date, l.end_date, l.hours, l.leave_type
//       FROM leave_periods AS l
//       FULL OUTER JOIN timesheets AS t ON (t.id = l.timesheet_id)
//       WHERE t.period_id = ${currentPeriodID}`;
//     const timesheets = await sequelize.query(sheetsSQL, { type: Sequelize.QueryTypes.SELECT });

//     // Fetch users who didn’t submit a timesheet
//     const missingTimesheetsSQL = `
//       SELECT u.wid, u.email 
//       FROM users AS u
//       WHERE u.wid NOT IN (
//         SELECT t.user_wid 
//         FROM timesheets AS t 
//         WHERE t.period_id = ${currentPeriodID}
//       )`;
//     const missingUsers = await sequelize.query(missingTimesheetsSQL, { type: Sequelize.QueryTypes.SELECT });

//     res.status(200).json({ timesheets, missingUsers });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// }

import { Sequelize } from "sequelize";
import * as tedious from "tedious";

const sequelize = new Sequelize("timesheetdb", "timesheetadmin", "JmDeCp#1", {
  host: "sheetserv.database.windows.net",
  dialect: "mssql",
  dialectModule: tedious,
});

export default async function handler(req, res) {
  try {
    const startDate = "2024-11-18";

    // Fetch reporting period ID for the given start date
    const periodSQL = `SELECT id FROM reporting_periods WHERE start_date = :startDate`;
    const periodResult = await sequelize.query(periodSQL, {
      replacements: { startDate },
      type: Sequelize.QueryTypes.SELECT,
    });

    if (periodResult.length === 0) {
      return res.status(404).json({ error: "Reporting period not found" });
    }

    const currentPeriodID = periodResult[0].id;

    // Fetch submitted timesheets
    const sheetsSQL = `
      SELECT t.user_wid, l.start_date, l.end_date, l.hours, l.leave_type
      FROM leave_periods AS l
      INNER JOIN timesheets AS t ON t.id = l.timesheet_id
      WHERE t.period_id = :currentPeriodID`;
    const timesheets = await sequelize.query(sheetsSQL, {
      replacements: { currentPeriodID },
      type: Sequelize.QueryTypes.SELECT,
    });

    // Fetch users who didn’t submit a timesheet
    const missingTimesheetsSQL = `
      SELECT u.wid, u.email 
      FROM users AS u
      WHERE u.wid NOT IN (
        SELECT t.user_wid 
        FROM timesheets AS t 
        WHERE t.period_id = :currentPeriodID
      )`;
    const missingUsers = await sequelize.query(missingTimesheetsSQL, {
      replacements: { currentPeriodID },
      type: Sequelize.QueryTypes.SELECT,
    });

    // Respond with the fetched data
    res.status(200).json({ timesheets, missingUsers });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}