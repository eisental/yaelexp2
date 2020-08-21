import gs from './spreadsheet_io.js';
import { SheetNames } from './defs.js';

const FIRST_HOUR_OF_DAY = 3; // day starts at 3 am.

export const SessionEvent = {
  SESSION_START: "SESSION_START",
  SESSION_CONTINUED: "SESSION_CONTINUED",
  SESSION_END: "SESSION_END",
};

// parse session json data from sheets api into an array of session objects.
export const parseSessions = (data) => {
  let sessions = [];
  data.values.forEach(session_event => {
    let session = {
      id: session_event[0],
      number: session_event[1],
      event: session_event[2],
      lesson_type: session_event[3],
      time: session_event[4],
    };
    sessions.push(session);
  });
  return sessions;
};

export const writeSessionEvent = (conn, session, event, on_error) => {
  let request_data = Object.assign({event: event,
                                    time: new Date().toString()},
                                    session);
  gs.write(conn, SheetNames.TRAINING_SESSIONS, request_data)
    .catch(on_error);

};

export const readSessionData = (conn) => {
  return gs.read(conn, SheetNames.TRAINING_SESSIONS, "A2:E10000")
    .then(response => response.json())
    .then(parseSessions);
  
};

export const readLessonType = (conn, id) => {
  const findLessonType = (data) => {
    let lesson_type = -1;
    data.values.forEach(row => {
      if (row[0] === id)
        lesson_type = parseInt(row[1]);
    });    
    return lesson_type;
  }

  return gs.read(conn, SheetNames.LESSON_TYPES, "A2:B10000")
    .then(response => response.json())
    .then(findLessonType);
};

// Return true if the last session was today. Day starts at FIRST_HOUR_OF_DAY
export const was_last_session_today = (last_session) => {
  let last_time = new Date(last_session.time);
  last_time.setHours(last_time.getHours() - FIRST_HOUR_OF_DAY);
  let now = new Date();
  now.setHours(now.getHours() - FIRST_HOUR_OF_DAY);
  return now.getDate() === last_time.getDate();
};

export const does_user_sheet_exists = (conn, user_id) => {
  return gs.list_sheets(conn)
    .then(sheets => sheets.includes(user_id));
};

export const read_subject_data = (conn, id) => {
  return gs.read(conn, SheetNames.SUBJECTS_DATA, "A2:C10000")
    .then(response => response.json())
    .then(data => {
      for (const row of data.values) {
        console.log(row[0]);
        if (row[0] === id) {
          return {
            lesson_type: row[1],
            chord_button_labels: JSON.parse(row[2])
          };
        }
      }

      return null;
    });
};

export const write_subject_data = (conn, session, on_error) => {
  const data = {
    id: session.id,
    lesson_type: session.lesson_type,
    chord_button_labels: JSON.stringify(session.chord_button_labels)
  }

  gs.write(conn, SheetNames.SUBJECTS_DATA, data)
    .catch(on_error);
};
