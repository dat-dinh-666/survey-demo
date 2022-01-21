import axios from 'axios';
import speedDate from 'speed-date';

const jsonData = {
    "svid": "GVQZ0",
    "initime": "2021-06-14 12:49:38",
    "mbr_time": "2021-06-14 12:49:38",
    "svend": "thankyou",
    "sbj_1006133": [
        "store_ID / usecase"
    ],
    "sbj_1008202": [
        "geschäftszahl"
    ],
    "sbj_1008203": [
        "von"
    ],
    "sbj_1008204": [
        "nach"
    ],
    "sbj_1008205": [
        "klasse"
    ],
    "sbj_1008206": [
        "preis"
    ],
    "sbj_1008207": [
        "gesamtbetrag"
    ],
    "sbj_1008208": [
        "PaymentMethodTypeCode"
    ],
    "sbj_1006134": [
        "language"
    ],
    "sbj_1006135": [
        "visit date"
    ],
    "sbj_1006144": [
        "opt_1020261"
    ],
    "sbj_1006145": [
        "customer comment"
    ],

    "sbj_1006147": [
        "opt_1020265"
    ],
    "sbj_1006148": [
        "obj_1020281"
    ]
}

document.addEventListener("DOMContentLoaded", () => {
    MicroModal.init({
        onShow: modal => {
            document.querySelector('#modal-sidebar-trigger').style.display = 'none'
        },
        onClose: modal => {
            document.querySelector('#modal-sidebar-trigger').style.display = null
        }
    })
    const next_screen_trigger = document.querySelector("#next-screen");
    next_screen_trigger.addEventListener('click', () => {
        const screen_1 = document.querySelector("#screen-1")
        const screen_2 = document.querySelector("#screen-2")
        screen_1.classList.remove('active')
        screen_2.classList.add('active')
        if (parent) {
            parent.postMessage({
                is_submitted: true
            }, '*')
        }
    })
    const survey_form = document.querySelector('#survey-form');
    survey_form.addEventListener('submit', (e) => {
        e.preventDefault();
        const form_data = new FormData(e.target);
        jsonData['sbj_1006144'] = [form_data.get('sbj_1006144')];
        jsonData['sbj_1006145'] = [form_data.get('sbj_1006145')];
        jsonData['sbj_1006148'] = [form_data.get('sbj_1006148')];
        axios.post('https://voice2025-surveycake.fast-insight.com/api/v1/s/submit-isc', {
            ansobj: jsonData,
            csrftoken: '102030',
            submittime: speedDate('YYYY-MM-DD HH:mm'),
            ip: 'none',
            timestamp: speedDate('YYYY-MM-DD HH:mm')
        }, {
            headers: {
                'X-Surveycake-Token': '*XNT2T5UkDszXH5R',
                'Cookie': 'csrftoken=102030'
            }
        }).then(() => {
            console.log('Sent survey')
        })
    })
})
