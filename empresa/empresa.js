$(function () {
    $('#btnNovo').click(function () {
        Empresa.novo()
    })

    $('#btnSalvar').click(function () {
        Empresa.salvar()

    })


    $('#btnEditar').click(function () {
        $('.container .validate').removeAttr("disabled")
        $('#btnCancelar').removeAttr("disabled")
        $('#btnSalvar').removeAttr("disabled")
        $('#btnEditar').prop("disabled", true)

    })

    $('#btnCancelar').click(function () {
        $('.container input').prop("disabled", true)
        $('#btnCancelar').prop("disabled", true)
        $('#btnEditar').removeAttr("disabled")
    })


    Empresa.getEmpresa()


});


const Empresa = (function () {
    let url = 'empresa/per.empresa.php'


    function novo() {
        // $('.container input').val('')
        $('.container input').removeAttr("disabled")
        $('#btnSalvar').removeAttr("disabled")
        $('#btnEditar').prop("disabled", true)
        $('#btnCancelar').removeAttr("disabled")
        $('#btnNovo').prop("disabled", true)


    }




    function salvar() {
        let param = {
            cnpj: $('#edtCnpj').val(),
            razao: $('#edtRazao').val(),
            fantasia: $('#edtFantasia').val(),
            inscricao: $('#edtIscricao').val(),
            fixo: $('#edtFixo').val(),
            celular: $('#edtCelular').val(),
            cep: $('#edtCep').val(),
            endereco: $('#edtEnd').val(),
            uf: $('#edtUf').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#edtBairro').val(),
        }



        for (let i in param) {
            if (param[i] == '') {
                show('Por favor preencha todos os campos')
                return false
            }
        }

        param.id_empresa = $('#id_empresa').val();

        axios.post(url, {
            call: 'save',
            param: param
        }).then(r => {
            Empresa.getEmpresa()
            $('#btnSalvar').prop("disabled", true)
            $('#btnNovo').prop("disabled", true)
            $('#btnCancelar').prop("disabled", true)
            $('#btnEditar').removeAttr("disabled")
            $('.container input').prop("disabled", true)

        })



    }


    function getEmpresa() {
        let param = ""
        axios.post(url, {
            call: 'getEmpresa',
            param: param
        })

            .then(r => {



                if (r.data[0]) {
                    $('#id_empresa').val(r.data[0].id_empresa)
                    $('#edtCnpj').val(r.data[0].cnpj)
                    $('#edtRazao').val(r.data[0].razao)
                    $('#edtFantasia').val(r.data[0].fantasia)
                    $('#edtFixo').val(r.data[0].fixo)
                    $('#edtCelular').val(r.data[0].celular)
                    $('#edtIscricao').val(r.data[0].inscricao)
                    $('#edtEnd').val(r.data[0].endereco)
                    $('#edtCep').val(r.data[0].cep)
                    $('#edtCidade').val(r.data[0].cidade)
                    $('#edtBairro').val(r.data[0].bairro)
                    $('#edtUf').val(r.data[0].uf)

                }
                else {
                    confirma({
                        msg: 'Não existe empresa cadastrada!',

                    })
                }

                if ($('#id_empresa').val() == '') {
                    $('#btnNovo').removeAttr("disabled")
                    $('#btnEditar').prop("disabled", true)

                }

            })


    }



    return {
        salvar: salvar,
        getEmpresa: getEmpresa,
        novo: novo,

    }

})()




