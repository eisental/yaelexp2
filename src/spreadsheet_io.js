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
    return fetch(conn.write_url + "?" + serialize(data),
                 {
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
                   method: "GET",
                   mode: 'no-cors',
                 })    
  },
}

export default gs;
