import React from 'react';
import { ComboBox, ContinueButton } from '../ui.js';
import ls from 'local-storage';

export class PersonalInfoScreen extends React.Component {
  constructor({data, next, songsQuestionnaire}) {
    super();
    this.data = data;
    this.next = next;
    this.songsQuestionnaire = songsQuestionnaire;
  }

  saveData = () => {
    const age = document.getElementById('age').value;
    if (!/^(0|[1-9]\d*)$/.test(age)) {
      alert("ערך הגיל שהכנסתם אינו חוקי.");
      return;
    }

    const genderMaleChecked = document.getElementById('male').checked;
    const genderFemaleChecked = document.getElementById('female').checked;
    if (!genderMaleChecked && !genderFemaleChecked) {
      alert("אנא בחרו מין.");
      return;
    }
    const gender = genderMaleChecked ? 2 : 1;

    const musical_background = document.getElementById('musical_background').value;
    const residence = document.getElementById('residence').value;
    const education = document.getElementById('education').value;

    const big_maj_recognition = document.getElementById('big_maj_recognition').value;
    const small_maj_recognition = document.getElementById('small_maj_recognition').value;
    const small_min_recognition = document.getElementById('small_min_recognition').value;
    const half_dim_recognition = document.getElementById('half_dim_recognition').value;
    const hwcomputer = document.getElementById('hwcomputer').value;
    const hwdisplay = document.getElementById('hwdisplay').value;
    const hwmouse = document.getElementById('hwmouse').value;
    const hwheadphones = document.getElementById('hwheadphones').value;
    if (big_maj_recognition.length===0 || small_maj_recognition.length===0 ||
        small_min_recognition.length===0 || half_dim_recognition.length===0 ||
        hwcomputer.length===0 || hwdisplay.length===0 || 
        hwmouse.length===0 || hwheadphones.length===0 ||
        education==="-" || residence==="-" || musical_background==="-") {
      alert("אנא ענו על כל השאלות.");
      return;
    }

    let form_data = {
      time: new Date().toString(),
      subtest: 5,
      age: age,
      gender: gender,
      musical_background: musical_background,
      residence: residence,
      education: education,
      big_maj_recognition: big_maj_recognition,
      small_maj_recognition: small_maj_recognition,
      small_min_recognition: small_min_recognition,
      half_dim_recognition: half_dim_recognition,
      computer: hwcomputer,
      display: hwdisplay,
      mouse: hwmouse,
      headphones: hwheadphones,
    };

    if (this.songsQuestionnaire) {
      const imagine_familiarity = document.getElementById('imagine_familiarity').value;
      const imagine_like = document.getElementById('imagine_like').value;
      const caesaria_familiarity = document.getElementById('caesaria_familiarity').value;
      const caesaria_like = document.getElementById('caesaria_like').value;
      const rocketman_familiarity = document.getElementById('rocketman_familiarity').value;
      const rocketman_like = document.getElementById('rocketman_like').value;
      const britolam_familiarity = document.getElementById('britolam_familiarity').value;
      const britolam_like = document.getElementById('britolam_like').value;

      if (imagine_familiarity==="-" || imagine_like==="-" || 
          caesaria_familiarity==="-" || caesaria_like==="-" ||
          rocketman_familiarity==="-" || rocketman_like==="-" ||
          britolam_familiarity==="-" || britolam_like==="-") {
        alert("אנא ענו על כל השאלות.");
        return;
      }

      form_data.imagine_familiarity = imagine_familiarity;
      form_data.imagine_like = imagine_like;
      form_data.caesaria_familiarity = caesaria_familiarity;
      form_data.caesaria_like = caesaria_like;
      form_data.rocketman_familiarity = rocketman_familiarity;
      form_data.rocketman_like = rocketman_like;
      form_data.britolam_familiarity = britolam_familiarity;
      form_data.britolam_like = britolam_like;
    }

    this.data.trials.push(form_data);


    ls.set("test_data", this.data);
    this.next();
  }

  render() { 
    let songsForm = null;
    if (this.songsQuestionnaire) {
      const numbered_options = [...Array(7).keys()].map(i => i+1);

      songsForm = (
        <div className="songs_form">
          <p style={{fontWeight: 'bold'}}>שאלון שירים:</p>
          <p>אנא ענה על השאלות הבאות בציון של 1-7, כאשר 1 הוא מעט ו-7 הרבה.</p>
          <label htmlFor="imagine_familiarity">מה רמת ההיכרות שלך עם השיר "imagine" של ג'ון לנון?</label>
          <ComboBox id="imagine_familiarity" options={numbered_options}/>
          <br/>
          <label htmlFor="imagine_like">מה רמת החיבה שלך לשיר זה?</label>
          <ComboBox id="imagine_like" options={numbered_options}/>
          <br/>
          <br/>
          <label htmlFor="caesaria_familiarity">מה רמת ההיכרות שלך עם השיר "הליכה לקיסריה (אלי אלי)" של חנה סנש ודוד זהבי?</label>
          <ComboBox id="caesaria_familiarity" options={numbered_options}/>
          <br/>
          <label htmlFor="caesaria_like">מה רמת החיבה שלך לשיר זה?</label>
          <ComboBox id="caesaria_like" options={numbered_options}/>
          <br/>
          <br/>
          <label htmlFor="rocketman_familiarity">מה רמת ההיכרות שלך עם השיר "Rocket Man" של אלטון ג'ון?</label>
          <ComboBox id="rocketman_familiarity" options={numbered_options}/>
          <br/>
          <label htmlFor="rocketman_like">מה רמת החיבה שלך לשיר זה?</label>
          <ComboBox id="rocketman_like" options={numbered_options}/>
          <br/>
          <br/>
          <label htmlFor="britolam_familiarity">מה רמת ההיכרות שלך עם השיר "ברית עולם" של אהוד מנור ומתי כספי?</label>
          <ComboBox id="britolam_familiarity" options={numbered_options}/>
          <br/>
          <label htmlFor="britolam_like">מה רמת החיבה שלך לשיר זה?</label>
          <ComboBox id="britolam_like" options={numbered_options}/>
          <br/>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 personal-info-form">
            <p style={{fontWeight: 'bold'}}>שאלון פרטים אישיים:</p>
            <label htmlFor="age">גיל:</label>
            <input type="text" id="age" name="age" maxLength="2"/>
            <br/>
            <label htmlFor="gender">מין:</label>
            <label htmlFor="male">זכר</label>
            <input type="radio" id="male" name="gender" value="male"/>
            <label htmlFor="female">נקבה</label>
            <input type="radio" id="female" name="gender" value="female"/>
            <br/>
            <label htmlFor="musical_background">רקע מוזיקלי מוקדם:</label>
            <select id="musical_background" name="musical_background" defaultValue="-">
              <option hidden disabled value="-"></option>
              <option value="1">אין</option>
              <option value="2">ניגנתי פחות משנה</option>
              <option value="3">ניגנתי פחות משנתיים</option>
            </select>
            <br/>
            <label htmlFor="residence">איזור מגורים:</label>
            <select id="residence" name="residence" defaultValue="-">
              <option hidden disabled value="-"></option>
              <option value="1">מרכז הארץ</option>
              <option value="2">צפון הארץ</option>
              <option value="3">דרום הארץ</option>
              <option value="4">ירושלים</option>
              <option value="5">שפלה</option>
            </select>
            <br/>
            <label htmlFor="education">השכלה:</label>
            <select id="education" name="education" defaultValue="-">
              <option hidden disabled value="-"></option>
              <option value="1">תיכון</option>
              <option value="2">תואר ראשון</option>
              <option value="3">תואר שני</option>
              <option value="4">תואר שלישי</option>
              <option value="5">לימודי תעודה</option>
            </select>
            <br/>
            <label htmlFor="big_maj_recognition">על סמך מה זיהית את אקורד "מז'ור גדול"?</label>
            <textarea id="big_maj_recognition" rows="2" cols="50"/>
            <label htmlFor="small_maj_recognition">על סמך מה זיהית את אקורד "מז'ור קטן"?</label>
            <textarea id="small_maj_recognition" rows="2" cols="50"/>
            <label htmlFor="small_min_recognition">על סמך מה זיהית את אקורד "מינור קטן"?</label>
            <textarea id="small_min_recognition" rows="2" cols="50"/>
            <label htmlFor="half_dim_recognition">על סמך מה זיהית את אקורד "חצי מוקטן"?</label>
            <textarea id="half_dim_recognition" rows="2" cols="50"/>            
            <p>אנא מלאו את הפרטים של החומרה בה השתמשתם בתרגול ובמבחן. אנא פרטו את הדגם המדויק בכל אחד מן הסעיפים.</p>
            <label htmlFor="hwcomputer">מחשב:</label><br/>
            <textarea id="hwcomputer" rows="2" cols="50"/><br/>
            <label htmlFor="display">מסך מחשב:</label><br/>
            <textarea id="hwdisplay" rows="2" cols="50"/><br/>
            <label htmlFor="hwmouse">עכבר:</label><br/>
            <textarea id="hwmouse" rows="2" cols="50"/><br/>
            <label htmlFor="hwheadphones">אוזניות:</label><br/>
            <textarea id="hwheadphones" rows="2" cols="50"/><br/>
            <br/>

            {songsForm}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <ContinueButton next={this.saveData} />
          </div>
        </div>
        <div className="row">&nbsp;</div>
      </div>
    );
  }
}
