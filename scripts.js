function topnav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function loadCSV(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.error("Error loading CSV file:", xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error("Error loading CSV file:", xhr.statusText);
    };
    xhr.send();
  }

  // This function will parse the CSV file and return an array of objects
function parseCSV(csv) {
  // Split the CSV string into an array of lines
  const lines = csv.trim().split("\n");
  // Extract the header row and split it into an array of column names
  const headers = lines.shift().split(",");
  // Use map() to convert each line into an object with keys from the headers array
  return lines.map(line => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
}

// This function will create an HTML table from an array of objects
function createTable(data) {
  // Create a table element
  const table = document.createElement("table");
  table.className = "content-table";
  // Create a header row
  const head = document.createElement("thead")
  const headerRow = document.createElement("tr");
  // Loop through the keys of the first object to create the header cells
  for (const key in data[0]) {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  head.appendChild(headerRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  // Loop through the array to create the data rows
  for (const obj of data) {
    const dataRow = document.createElement("tr");
    // Loop through the keys of the object to create the data cells
    for (const key in obj) {
      const dataCell = document.createElement("td");
      if(key === "Team") {
        const link = document.createElement("a");
        str = obj[key].replace(/\s+/g, '').toLowerCase();
        link.setAttribute("href", "teams/" + str + ".html");
        link.className = "teamlink";
        link.textContent = obj[key];
        dataCell.appendChild(link);
        console.log(str);
      }
      else dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);
    }
    body.appendChild(dataRow);
  }
  table.append(body)
  return table;
}
