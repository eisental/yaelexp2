import React from 'react';
import { LessonType } from '../defs.js'

export function IntroText() {
  return (
    <div className = "IntroText">
      <p>
      לפניכם שיעור של 35 דקות. 
      לא ניתן לצאת במהלכו.
      העבודה על הניסוי מחייבת חיבור אינטרנטי. עבודה ללא חיבור אינטרנטי תיפסל מהניסוי. 
      כמו כן, אנא הצטיידו באוזניות, לאחר שווידאתם עם הנסיינית (יעל) שהן איכותיות מספיק.
      </p>
      <p>
      עליכם להפעיל את התוכנה פעם אחת בכל יום במשך חמישה ימים. לא תוכלו להפעילה יותר מפעם אחת ביום, אך עליכם לדאוג להפעילה בכל יום, ולסיים בכל הפעלה את ההדגמות והתרגילים (נתוני ההפעלה וההשתתפות יישלחו לנסיינית. התשלום על הניסוי מותנה בהקפדה על התנאים).
      התחלת התוכנה מותנית בקביעת פגישה עם הנסיינית ליום השביעי. מי שטרם קבע פגישה, לא יכול להתחיל את העבודה בתוכנה.
      </p>
      <p>
      אם ברצונכם להפעיל את התוכנה כעת, הכניסו את מספר תעודת הזהות שלכם ולחצו על המשך.
      </p>
    </div>);
}

export function InfoText({lesson_type}) {
  switch (lesson_type) {
  case LessonType.MUSICAL_PIECES:
    return (
      <div className="infotext">
        <p>בניסוי זה תלמדו לזהות אקורדים מרובעים (בעלי ארבעה צלילים) משמיעה באמצעות קישורם לשירים ישראליים מוכרים.</p>
        <p>לתוכנה שני חלקים – חלק השיעור וחלק התרגול. בחלק התרגול עליכם להקיש על האקורד המזוהה באמצעות עכבר המחשב.</p>
        <p>אנא חברו אוזניות.</p>
        <p>מיד תשמעו קטעים קצרים מתוך שירים ישראליים מוכרים. בכל קטע שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.</p>
        <p>אנא קראו את הכיתוב המופיע על המסך לאורך כל השיעור.</p>
        <p>לכל שאלה או בעיה, אנא שלחו הודעה כתובה למייל yaeljm@gmail.com או למספר הטלפון 0528931467, ותקבלו מענה בזריזות האפשרית.</p>
        <p>בהצלחה!</p>
      </div>
    );

  case LessonType.TONAL_CONTEXT:
    return (
      <div className="infotext">
        <p>בניסוי זה תלמדו לזהות אקורדים מרובעים (בעלי ארבעה צלילים) משמיעה באמצעות הקשר טונאלי: תחושת המתח או הפתרון הנובעת משמיעת אקורד בתוך משפט מוזיקלי.</p>
        <p>לתוכנה שני חלקים – חלק השיעור וחלק התרגול. בחלק התרגול עליכם להקיש על האקורד המזוהה באמצעות עכבר המחשב.</p>
        <p>אנא חברו אוזניות.</p>
        <p>מיד תשמעו צמדי אקורדים. לפני כל צמד אקורדים תשמעו מבוא טונאלי – סולם עולה ויורד. בכל צמד אקורדים שתשמעו, האקורד הראשון יהיה האקורד המשמעותי, אליו עליכם להתייחס.</p>
        <p>אנא קראו את הכיתוב המופיע על המסך לאורך כל השיעור.</p>
        <p>לכל שאלה או בעיה, אנא שלחו הודעה כתובה למייל yaeljm@gmail.com או למספר הטלפון 0528931467, ותקבלו מענה בזריזות האפשרית.</p>
        <p>בהצלחה!</p>
      </div>
    );

  case LessonType.AUTOMATIC:
    return (
      <div className="infotext">
        <p>בניסוי זה תלמדו לזהות אקורדים מרובעים (בעלי ארבעה צלילים) משמיעה באמצעות זיהוי אוטומטי.</p>
        <p>לתוכנה שני חלקים – חלק השיעור וחלק התרגול. בחלק התרגול עליכם להקיש על האקורד המזוהה באמצעות עכבר המחשב.</p>
        <p>אנא חברו אוזניות.</p>
        <p>מיד תישמעו אקורדים. </p>
        <p>אנא קראו את הכיתוב המופיע על המסך לאורך כל השיעור.</p>
        <p>לכל שאלה או בעיה, אנא שלחו הודעה כתובה למייל yaeljm@gmail.com או למספר הטלפון 0528931467, ותקבלו מענה בזריזות האפשרית.</p>
        <p>בהצלחה!</p>
      </div>
    );
  }
}
