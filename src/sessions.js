import gs from './spreadsheet_io.js';
import { SheetNames } from './defs.js';

export const SessionEvent = {
  SESSION_START: "SESSION_START",
  SESSION_END: "SESSION_END",
};

// parse session json data from sheets api into an array of session objects.
export const parseSessions = (data) => {
  let sessions = [];
  data.values.forEach(session_event => {
    let session = {
      id: session_event[0],
      session_number: session_event[1],
      event: session_event[2],
      time: session_event[3],
    };
    sessions.push(session);
  });
  return sessions;
};

export const writeSessionEvent = (conn, session, event, on_error) => {
  let that = this;
  let request_data = Object.assign({event: event,
                                    time: new Date().toString()},
                                   session);
  console.log("writing session_data");
  console.log(request_data);
  gs.write(conn, SheetNames.TRAINING_SESSIONS, request_data)
    .then(res => { console.log(res); })
    .catch(on_error);

};

export const readSessionData = (conn) => {
    return gs.read(conn, SheetNames.TRAINING_SESSIONS, "A2:D10000")
    .then(response => response.json())
    .then(parseSessions);

}
