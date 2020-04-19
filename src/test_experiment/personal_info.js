import React from 'react';
import { ContinueButton } from '../ui.js';
import ls from 'local-storage';

export class PersonalInfoScreen extends React.Component {
  constructor({data, next}) {
    super();
    this.data = data;
    this.next = next;
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
        hwmouse.length===0 || hwheadphones.length===0) {
      alert("אנא ענו על כל השאלות.");
      return;
    }
    this.data.trials.push({
      time: new Date().toString(),
      subtest: 5,
      age: age,
      gender: gender,
      musical_background: musical_background,
      big_maj_recognition: big_maj_recognition,
      small_maj_recognition: small_maj_recognition,
      small_min_recognition: small_min_recognition,
      half_dim_recognition: half_dim_recognition,
      computer: hwcomputer,
      display: hwdisplay,
      mouse: hwmouse,
      headphones: hwheadphones,
    });
    ls.set("test_data", this.data);
    this.next();
  }

  render() { 
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 personal-info-form">
            <p>שאלון פרטים אישיים:</p>
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
            <select id="musical_background" name="musical_background">
              <option value="1">אין</option>
              <option value="2">ניגנתי פחות משנה</option>
              <option value="3">ניגנתי פחות משנתיים</option>
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
