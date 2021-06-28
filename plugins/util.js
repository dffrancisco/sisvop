

const util = (function () {

    const formatValor = function (num) {
        if (num == null) return '';
        num = String(num);
        return num.replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    }

    const formatarValorUSA = function (num) {
        return parseFloat(num.replace(/\./g, '').replace(/,/g, '.'));
    };

    const formatarDataUSA = (dt) => {
        if (!dt)
            return ''

        console.log(dt);

        let data = dt.substr(0, 10)
        data = data.split(/\.|-|\//g).reverse().join('/')
        return data
    }

    const formatValorFix2Casas = function (num) {
        let x = 0;
        if (num < 0) {
            num = Math.abs(num);
            x = 1;
        }
        if (isNaN(num))
            num = "0";
        let cents = Math.floor((num * 100 + 0.5) % 100);

        num = Math.floor((num * 100 + 0.5) / 100).toString();

        if (cents < 10)
            cents = "0" + cents;
        for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.' +
                num.substring(num.length - (4 * i + 3));
        let ret = num + ',' + cents;
        if (x === 1)
            ret = ' - ' + ret;
        return ret;
    }

    const dataBrasil = function (data) {
        let separador;
        if (data != null && data != '') {
            if (data.trim() === '') {
                return false;
            }
            if (data.search('-') > 0) {
                separador = '-';
            }
            if (data.search('/') > 0) {
                separador = '/';
            }
            if (data.search('.') > 0) {
                separador = '.';
            }

            //2014/12/01
            let rt = data.split(separador);
            let dt = rt[2] + '/' + rt[1] + '/' + rt[0];
            return dt;
        } else {
            return '';
        }
    }

    const block = function (data) {
        let _0xf0cc = [
            "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D",
            "",
            "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74",
            "\x63\x68\x61\x72\x41\x74",
            "\x6C\x65\x6E\x67\x74\x68",
            "\x6A\x6F\x69\x6E",
            "\x73\x6C\x69\x63\x65",
            "\x3D\x3D\x3D"
        ];
        let b64 = _0xf0cc[0];
        let o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            enc = _0xf0cc[1],
            tmp_arr = [];
        if (!data) {
            return data;
        }
        data = unescape(encodeURIComponent(data));
        do {
            o1 = data[_0xf0cc[2]](i++);
            o2 = data[_0xf0cc[2]](i++);
            o3 = data[_0xf0cc[2]](i++);
            bits = (o1 << 16) | (o2 << 8) | o3;
            h1 = (bits >> 18) & 0x3f;
            h2 = (bits >> 12) & 0x3f;
            h3 = (bits >> 6) & 0x3f;
            h4 = bits & 0x3f;
            tmp_arr[ac++] =
                b64[_0xf0cc[3]](h1) +
                b64[_0xf0cc[3]](h2) +
                b64[_0xf0cc[3]](h3) +
                b64[_0xf0cc[3]](h4);
        } while (i < data[_0xf0cc[4]]);
        enc = tmp_arr[_0xf0cc[5]](_0xf0cc[1]);
        let r = data[_0xf0cc[4]] % 3;
        return (
            (r ? enc[_0xf0cc[6]](0, r - 3) : enc) + _0xf0cc[7][_0xf0cc[6]](r || 3)
        );
    }


    return {
        show: show,
        block: block,
        formatValor: formatValor,
        formatValorFix2Casas: formatValorFix2Casas,
        dataBrasil: dataBrasil,
        formatarDataUSA: formatarDataUSA,
        formatarValorUSA: formatarValorUSA,
    }
})()