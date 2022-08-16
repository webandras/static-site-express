// Open Hours - © 2017 Michael Lee.
(function (window) {
  "use strict";
  function define_openHours() {
    let OpenHours = {};

    const insertColon = function (time) {
      var center = time.length - 2;
      var timeWithColon = [time.slice(0, center), ":", time.slice(center)].join("");
      return timeWithColon;
    };

    const formatTime = function (time) {
      if (time) {
        if (time >= 1200) {
          const formattedTime = time === 1200 ? 1200 : time - 1200;
          return `${insertColon(formattedTime.toString())} PM`;
        } else {
          return `${insertColon(time.toString())} AM`;
        }
      }
    };

    const weekIndex = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    const determineDay = (day, dayDiv) => {
      const now = new Date();
      if (day === weekIndex[now.getDay()]) {
        dayDiv.style["font-weight"] = "bold";
        dayDiv.className = "dark:text-white";
      }
    };

    OpenHours["generateTime"] = function (hours) {
      const rootElement = document.getElementById("open-hours");
      const table = document.createElement("table");
      table.className = "max-w-lg text-center w-full mx-auto format dark:format-invert text-lg";
      if (rootElement) {
        for (let day in hours) {
          const dayDiv = document.createElement("tr");

          determineDay(day, dayDiv);

          const dayTitleElement = document.createElement("td");
          dayTitleElement.className = "p-2";
          const dayTimesElement = document.createElement("td");
          dayTimesElement.className = "p-2";

          const dayTitle = document.createTextNode(day);
          dayTitleElement.appendChild(dayTitle);
          dayDiv.appendChild(dayTitleElement);

          let dayHours = "";

          if (Object.keys(hours[day]).length === 0) {
            dayHours = `Closed`;
          } else {
            dayHours = `${formatTime(hours[day]["start"])} - ${formatTime(hours[day]["end"])}`;
          }

          const dayTimes = document.createTextNode(dayHours);
          dayTimesElement.appendChild(dayTimes);
          dayDiv.appendChild(dayTimesElement);
          table.appendChild(dayDiv);
        }
        rootElement.appendChild(table);
      }
    };

    return OpenHours;
  }

  if (typeof OpenHours === "undefined") {
    window.OpenHours = define_openHours();
  }
})(window);
