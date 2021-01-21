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



    login.sair();
    login.session();

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

    this.session = async function () {

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
        $('#btnSair').click(function () {
            axios.post(`login/login.php`, {
                call: 'sair',

            }).then(r => {
                login.session()

            })
        })
    };

}


