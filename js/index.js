let calc;
let usuario;
const login = new Login();

$(function () {

    calc = new xCalkModal()

    $('.real').maskMoney({ thousands: '.', decimal: ',', allowZero: true });

    $('.date').mask('00/00/0000');

    $('.numeroNota').mask('000.000.000');

    $('.CPF').mask('999.999.999-99');
    $('.CNPJ').mask('99.999.999/9999-99');
    $('.CEP').mask('00.000-000');
    $('.TELEFONE').mask('(00) 0000-00000');
    $('.inteiro').maskMoney({ thousands: '.', decimal: ',', precision: 0, allowZero: true });

    $('.pnMenu a').click(function () {
        pnMenuToggle();
    });


    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.pnMenu').hasClass('pnMenuToggle'))
                pnMenuToggle();

            if ($('.pnUser').hasClass('pnUserToggle'))
                pnUserToggle();
        }


        if (e.keyCode === 115) { //F4
            calc.open()
        }
    });


    $('#pnTitulo').html($('#pnPrincipal title').html());


    $('.btnSair').click(function () {
        login.sair()
    })


});



function pnMenuToggle() {
    $('.pnMenu').toggleClass('pnMenuToggle');
    return false;
}
function pnUserToggle() {
    $('.pnUser').toggleClass('pnUserToggle');
    if ($('.viewPhoto').hasClass('viewPhotoBig'))
        pnViewPhoto();
    return false;
}
function pnViewPhoto() {
    $('.viewPhoto').toggleClass('viewPhotoBig');
    $('.viewPhoto img').toggleClass('viewPhotoImg');
    return false;
}


function Login() {

    this.session = function () {

        axios.post('login/login.php', {
            call: 'session',

        }).then(r => {

            if (r.data.semSession) {
                usuario = '';
                // pnLogin.open()
                window.location.href = "login";
                return false
            }

            usuario = r.data
            $('#spUser').html(r.data.NOME.split(' ')[0])
        })
    }

    this.sair = function () {

        axios.post(`login/login.php`, {
            call: 'sair',

        }).then(r => {
            login.session()

        })

    };

}

login.session();

function getFrase() {
    let num = (Math.random(1, 50) * 10).toFixed()
    let hour = new Date().getHours()

    axios.post('frases/per.frases.php', {
        call: 'getFrase',
        param: num
    }).then(rs => {
        $('#frase').html(rs.data[0].FRASE)

    })

    if (hour >= 5 && hour < 12) {
        $('#saudacao').html('BOM DIA!')
    }

    if (hour >= 12 && hour < 18) {
        $('#saudacao').html('BOA TARDE!')
    }
    if (hour >= 18 && hour < 23) {
        $('#saudacao').html('BOA TARDE!')
    }
}
function getDataEmpresa() {
    axios.post(`empresa/per.empresa.php`, {
        call: 'getDataEmpresa'
    }).then(r => {
        $('#printRazao').html(r.data[0].RAZAO)
        $('#printEndereco').html(r.data[0].ENDERECO)
        $('#printCnpj').html(r.data[0].CNPJ)
        $('#printCidade').html(r.data[0].CIDADE)
        $('#printBairro').html(r.data[0].BAIRRO)
        $('#printCep').html(r.data[0].CEP)
        $('#printInscricao').html(r.data[0].INSCRICAO)
        $('#printFixo').html(r.data[0].FIXO)
    })
}





