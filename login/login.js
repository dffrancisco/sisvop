// const login = new Login();
$(function () {
    login.logar()

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

            axios.post('login.php', {
                call: 'setLogin',
                param: {
                    login: login,
                    senha: senha
                }
            }).then(r => {
                if (r.data.msg) {
                    show(r.data.msg)
                    $('#edtLogin').focus()
                    return false
                }
                console.log('eae')
                usuario = r.data
                console.log('r.data :', r.data);

                window.location = "/sisvop/index.php";

                $('#spUser').html(r.data.NOME.split(' ')[0])


            })
        })
    }


    return {
        logar: this.logar
    }
})();
