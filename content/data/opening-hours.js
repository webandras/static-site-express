const yaml = require("js-yaml");
const fs = require("fs-extra");
const escaper = require("html-escaper");

let openingHoursFormatted = {};

try {
  // Get opening hours data from yaml file
  const openingHours = yaml.load(fs.readFileSync("./content/data/opening-hours.yml", "utf8"));

  if (openingHours) {
    // escaping html is very important here! These values come from user input (from the admin user)
    openingHoursFormatted.monday = openingHours.monday
      ? {
          start: parseInt(escaper.escape(openingHours.monday[0].start)),
          end: parseInt(escaper.escape(openingHours.monday[0].end)),
        }
      : {};
    openingHoursFormatted.tuesday = openingHours.tuesday
      ? {
          start: parseInt(escaper.escape(openingHours.tuesday[0].start)),
          end: parseInt(escaper.escape(openingHours.tuesday[0].end)),
        }
      : {};
    openingHoursFormatted.wednesday = openingHours.wednesday
      ? {
          start: parseInt(escaper.escape(openingHours.wednesday[0].start)),
          end: parseInt(escaper.escape(openingHours.wednesday[0].end)),
        }
      : {};
    openingHoursFormatted.thursday = openingHours.thursday
      ? {
          start: parseInt(escaper.escape(openingHours.thursday[0].start)),
          end: parseInt(escaper.escape(openingHours.thursday[0].end)),
        }
      : {};
    openingHoursFormatted.friday = openingHours.friday
      ? {
          start: parseInt(escaper.escape(openingHours.friday[0].start)),
          end: parseInt(escaper.escape(openingHours.friday[0].end)),
        }
      : {};
    openingHoursFormatted.saturday = openingHours.saturday
      ? {
          start: parseInt(escaper.escape(openingHours.saturday[0].start)),
          end: parseInt(escaper.escape(openingHours.saturday[0].end)),
        }
      : {};
    openingHoursFormatted.sunday = openingHours.sunday
      ? {
          start: parseInt(escaper.escape(openingHours.sunday[0].start)),
          end: parseInt(escaper.escape(openingHours.sunday[0].end)),
        }
      : {};
  }
} catch (e) {
  console.log(e);
}

module.exports = {
  hours: {
    Monday: openingHoursFormatted.monday,
    Tuesday: openingHoursFormatted.tuesday,
    Wednesday: openingHoursFormatted.wednesday,
    Thursday: openingHoursFormatted.thursday,
    Friday: openingHoursFormatted.friday,
    Saturday: openingHoursFormatted.saturday,
    Sunday: openingHoursFormatted.sunday,
  },
};
