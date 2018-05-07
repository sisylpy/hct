ib_ = {
    fu: 'http://f.ibangkf.com/i',
    tu: 'http://t.ibangkf.com/i',
    tmu: 'http://tm.ibangkf.com/i',
    app: '/i',
    aspid: 71754,
    l: 'sisy',
    vmx: 30,
    m: 0,
    imgHide: 0,
    imgMode: 1,
    imgOn: 'http://f.ibangkf.com/i/client/img/icon/1.gif',
    imgOff: 'http://f.ibangkf.com/i/client/img/icon/1_.gif',
    imgW: 110,
    imgH: 60,
    imgR: '20px',
    imgL: '',
    imgT: '',
    imgB: '120px',
    force_type: 2,
    force_auto: 0,
    minTitle: '&#x6211;&#x4EEC;&#x5728;&#x7EBF;&#xFF0C;&#x6B22;&#x8FCE;&#x6C9F;&#x901A;',
    minColor: '209AA8',
    t: '1443569155',
    exp: 900
};
if (location.href.indexOf('kf=0') > 0) {
    document.cookie = 'ibangkf=0';
} else if (document.cookie.indexOf('kf=0') < 0) {
    document.write("<scr" + "ipt src='" + ib_.fu + "/client/js/??kfbase.min.js,kffloat.min.js?v=20' type='text/javascript'></scr" + "ipt>");
}