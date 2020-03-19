/* functions for reading and writing to a google spreadsheet.
   
 */

const read_url = "https://sheets.googleapis.com/v4/spreadsheets/";

// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
const serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

const parse_sheet_list = (data) => {
  let sheetNames = [];
  data.sheets.forEach(sheet => {
    sheetNames.push(sheet.properties.title);
  });
  return sheetNames;
};

const gs = {
  read: function(conn, sheetName, range) {
    return fetch(read_url + 
                 conn.spreadsheet_id + 
                 "/values/" + 
                 sheetName + 
                 "!" + range + 
                 "?key=" + conn.api_key);
  },

  write: function(conn, sheetName, data) {
    let url = conn.write_url + "?" + serialize(data) + "&sheet_name=" + sheetName;
    return fetch(url,
                 {
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
                   method: "GET",
                   mode: 'no-cors',
                 })    
  },

  list_sheets: function(conn) {
    return fetch(read_url + conn.spreadsheet_id + "?key=" + conn.api_key)
      .then(res => res.json())
      .then(parse_sheet_list);
  },
}

export default gs;
