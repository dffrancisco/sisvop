// const login = new Login();
$(function () {
    login.logar()
    $('#edtLogin').focus()
    $('.CPF').mask('999.999.999-99');

    $('#edtLogin').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#edtPassword').focus()
        }
    })

    $('#edtPassword').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#btnLogar').click()
        }
    })
});

const login = (function () {

    this.logar = function () {

        $('#btnLogar').click(function () {

            let login = $('#edtLogin').val()
            let senha = $('#edtPassword').val()
            let length = $('#edtLogin').val().length
            axios.post('login.php', {
                call: 'setLogin',
                param: {
                    login: login,
                    senha: senha,
                    length: length
                }
            }).then(r => {
                if (r.data.msg) {
                    show(r.data.msg)
                    return false
                }
                usuario = r.data

                // window.location = "/index.php?p=home";


                window.location = "/sisvop/index.php?p=home";


                $('#spUser').html(r.data.NOME.split(' ')[0])


            })
        })
    }


    return {
        logar: this.logar
    }
})();
