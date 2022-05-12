/* eslint-disable no-restricted-globals */
import axios from 'axios';
import speedDate from 'speed-date';
import validator from 'validator';

let jsonData = {
    svid: 'GVQZ0',
    initime: '2021-06-14 12:49:38',
    mbr_time: '2021-06-14 12:49:38',
    svend: 'thankyou',
    sbj_1006133: [
        // 'store_ID / usecase',
    ],
    sbj_1008202: [
        // 'geschäftszahl',
    ],
    sbj_1008203: [
        // 'von',
    ],
    sbj_1008204: [
        // 'nach',
    ],
    sbj_1008205: [
        // 'klasse',
    ],
    sbj_1008206: [
        // 'preis',
    ],
    sbj_1008207: [
        // 'gesamtbetrag',
    ],
    sbj_1008208: [
        // 'PaymentMethodTypeCode',
    ],
    sbj_1006134: [
        // 'language',
    ],
    sbj_1006135: [
        // 'visit date',
    ],
    sbj_1006144: [
        // 'opt_1020261',
    ],
    sbj_1006145: [
        // 'customer comment',
    ],
    sbj_1006147: [
        // 'opt_1020265',
    ],
    sbj_1006148: [
        // 'obj_1020281',
    ],
};

function showError(name) {
    const errorElem = document.querySelector(`[data-error=${name}]`);
    if (errorElem) {
        errorElem.classList.add('show');
    }
}

function hideError(name) {
    const errorElem = document.querySelector(`[data-error=${name}]`);
    if (errorElem) {
        errorElem.classList.remove('show');
    }
}

function nextScreen() {
    const screen1 = document.querySelector('#screen-1');
    const screen2 = document.querySelector('#screen-2');
    screen1.classList.remove('active');
    screen2.classList.add('active');
    if (parent) {
        parent.postMessage({
            is_submitted: true,
        }, '*');
    }
};

function validate(form) {
    const formData = new FormData(form);
    let hasError = false;
    ['sbj_1006144', 'sbj_1006148'].map(v => {
        if (!formData.get(v) || validator.isEmpty(formData.get(v))) {
            hasError = true;
            showError(v);
        } else {
            hideError(v);
        }
    })
    return hasError
}

function validateSingle(input) {
    const formData = new FormData(input.form);
    const name = input.name
    if (!formData.get(name) || validator.isEmpty(formData.get(name))) {
        showError(name);
    } else {
        hideError(name);
    }
}

function init() {
    window.addEventListener('message', e => {
        const data = JSON.parse(e.data)
        jsonData['sbj_1008203'] = [data.bausteine[0].von]
        jsonData['sbj_1008204'] = [data.bausteine[0].nach]
        jsonData['sbj_1008205'] = [data.bausteine[0].klasse]
        jsonData['sbj_1008206'] = [data.bausteine[0].preis]
        jsonData['sbj_1008207'] = [data.gesamtbetrag]
        jsonData['sbj_1008202'] = [data.geschaeftsprozessID]
    })

    const surveyForm = document.querySelector('#survey-form');

    surveyForm.addEventListener('change', (e) => {
        validateSingle(e.target)
    })
    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate(e.target)) {
            return;
        }
        const formData = new FormData(e.target);
        for (let key of Object.keys(jsonData)) {
            if (formData.get(key)) {
                jsonData[key] = [formData.get(key)];
            }
        }
        jsonData['sbj_1006135'] = [new Date().toISOString()]
        const dateFormatter = speedDate('YYYY-MM-DD HH:mm')
        const params = new URLSearchParams()
        params.append('ansobj', JSON.stringify(jsonData))
        params.append('csrftoken', 102030)
        params.append('submittime', dateFormatter(new Date()))
        params.append('ip', 'none')
        params.append('timestamp', dateFormatter(new Date()))

        axios.post(`${process.env.MIX_SURVEY_URL}`, params, {
            headers: {
                'X-Surveycake-Token': '*XNT2T5UkDszXH5R',
                Cookie: 'csrftoken=102030',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(() => {
            console.log('Sent survey');
        });
        nextScreen();
    });
}

init();
