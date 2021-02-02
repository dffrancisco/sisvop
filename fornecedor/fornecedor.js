
//Criando variável para funcao do xGridFornecedor
let xgFornecedor;

//Funcao que chama o grid do Fornecedor
$(function () {
    fornecedor.grid();
    fornecedor.getUf();
    xgFornecedor.queryOpen({ search: '' });

    $("#edtPesquisa").keydown(function (e) {

        if (e.keyCode == 13) {
            $('.btnPesq').click()
        }

        if (e.keyCode == 38) {
            xgFornecedor.focus()
        }
    })
});

//Criando Funcao dentro da variavel fornecedor
const fornecedor = (function () {

    //Endereco da próxima etapa de busca
    let url = 'fornecedor/per.fornecedor.php';
    //Controlador de evento
    let controleGrid;

    function grid() {

        //Criando o xGrid
        xgFornecedor = new xGridV2.create({

            el: '#pnGridFornecedor',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                CNPJ: { dataField: 'CNPJ' },
                Fantasia: { dataField: 'FANTASIA' },
            },
            onSelectLine: (ln) => {

            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {
                        pesquisa: {
                            html: 'Pesquisar',
                            class: 'btnP btnPesq',
                            click: pesquisar,
                        },
                        novo: {
                            html: 'Novo',
                            class: 'btnP',
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit: {
                            html: 'Editar',
                            class: 'btnP',
                            state: xGridV2.state.update,
                            click: editar,
                        },
                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        save: {
                            html: 'Salvar',
                            class: 'btnP',
                            state: xGridV2.state.save,
                            click: salvar,
                        },
                        cancelar: {
                            html: 'Cancelar',
                            class: 'btnP',
                            state: xGridV2.state.cancel,
                            click: cancelar,
                        },
                    }
                },

                duplicity: {
                    dataField: ['CNPJ'],
                    execute: (r) => {
                        let param = {}
                        param.CNPJ = r.value

                        axios.post(url, {
                            call: 'getCnpj',
                            param: param,
                        })
                            .then(rs => {

                                if (rs.data[0]) {
                                    xgFornecedor.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!');
                                    xgFornecedor.focusField(r.field);
                                    return false
                                }
                                validarCpnj(param.CNPJ)
                            })
                    }
                },

            },

            query: {
                execute: (r) => {
                    getFornecedor(r.param.search, r.offset);
                }
            }

        })
    }

    function getFornecedor(search, offset) {
        axios.post(url, {
            call: 'getFornecedor',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgFornecedor.querySourceAdd(rs.data);
                if (rs.data[0]) xgFornecedor.focus();
            })
    }

    function getUf() {
        axios.post(url, {
            call: 'getUf'
        }).then(rs => {
            for (let i in rs.data) {
                let table = `<option value="${rs.data[i].ID_UF}"> ${rs.data[i].UF}</option>`
                $('#slctUf').append(table)
            }
        })
    }

    function pesquisar() {
        let search = $('#edtPesquisa').val().trim();
        xgFornecedor.queryOpen({ search });
        $('#edtPesquisa').focus()

    }

    function novo() {
        //Dá valor de novo ao ControleGrid
        controleGrid = 'novo';

        //Limpa todos os campos de input
        xgFornecedor.clearElementSideBySide();

        //Foca no primeiro input
        xgFornecedor.focusField();

        //Desabilita o xGrid
        xgFornecedor.disable();

        //Salva data no formato pt-BR na variavel data
        let date = new Date().toLocaleDateString('pt-BR');

        //Insere no campo de data identificado pelo ID
        $('#edtDataCadastro').val(date);

        //Desabilita o campo de digitar palavras para pesquisar
        //Identificado pelo ID
        $('#edtPesquisa').prop("disabled", true)

        $('.btnPesq').prop("disabled", true);
    }

    function editar() {
        //Dá valor de editar ao ControleGrid
        controleGrid = 'editar';
        xgFornecedor.focusField();
        //Desabilita o campo de digitar palavras para pesquisar
        //Identificado pelo ID
        $('#edtPesquisa').prop("disabled", true)

        //Desabilita o botão de pesquisa identificado pelo ID
        $('.btnPesq').prop("disabled", true)

    }

    function deletar() {
        confirmaCodigo({
            msg: 'Digite o código de confirmação!',
            call: () => {
                if (xgFornecedor.dataSource().ID_FORNECEDOR) {

                    let param = xgFornecedor.dataSource().ID_FORNECEDOR;

                    axios.post(url, {
                        call: 'deletar',
                        param: param

                    }).then(rs => {

                        xgFornecedor.deleteLine();

                    });
                }
            }
        })

    }

    const salvar = async () => {
        //Todos os valores dos inputs são recolhidos como Json
        //e passados para o param 
        let param = xgFornecedor.getElementSideBySideJson();
        //Cria um atributo de data e capta o valor do input
        //identificado pelo ID
        param.DATA_CADASTRO = $('#edtDataCadastro').val();
        param.TEL_2 = $('#edtTel2').val()
        param.INSCRICAO = $('#edtInscricaoEstadual').val()

        let allDuplicty = await xgFornecedor.getDuplicityAll();

        if (allDuplicty == false) {
            xgFornecedor.showMessageDuplicity('O campo CNPJ está com valor duplicado ou vazio!');
            return false
        }

        if (controleGrid == 'novo')
            param.id_fornecedor = '';

        if (controleGrid == 'editar')
            param.ID_FORNECEDOR = xgFornecedor.dataSource().ID_FORNECEDOR;

        let valCampos = {
            cnpj: $('#edtCnpj').val(),
            razao_social: $('#edtRazaoSocial').val(),
            nome_fantazia: $('#edtFantasia').val(),
            endereco: $('#edtEndereco').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#edtBairro').val(),
            id_uf: $('#slctUf').val(),
            municipio: $('#edtMunicipio').val(),
            cep: $('#edtCep').val(),
            telefone_1: $('#edtTel1').val(),
            // telefone_2: $('#edtTel2').val(),
            // inscricao_estadual: $('#edtInscricaoEstadual').val(),
            data_cadastro: $('#edtDataCadastro').val(),

        }

        valCampos.telefone_1 = valCampos.telefone_1.replace(/[^\d]+/g, '')
        // valCampos.telefone_2 = valCampos.telefone_2.replace(/[^\d]+/g, '')
        valCampos.cep = valCampos.cep.replace(/[^\d]+/g, '')

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.id_uf == null) {
                xgFornecedor.showMessageDuplicity('Por favor preencha todos os campos!')
                return false
            }
        }

        if (valCampos.telefone_1.length < 10) {
            xgFornecedor.showMessageDuplicity('Telefone Inválido!')
            return false
        }

        if (valCampos.cep.length < 8) {
            xgFornecedor.showMessageDuplicity('CEP Inválido!')
            return false
        }

        console.log('param :', param);
        axios.post(url, {
            call: 'salvar',
            param: param
        })
            .then(rs => {
                console.log('rs :', rs);

                if (rs.data[0].ID_FORNECEDOR) {
                    param.ID_FORNECEDOR = rs.data[0].ID_FORNECEDOR;
                    xgFornecedor.insertLine(param);

                }
                else {
                    xgFornecedor.dataSource(param)
                }
                cancelar()
            })
    }

    function cancelar() {
        //Retira o atributo de disabled do input
        //Identficado pelo ID
        $('#edtPesquisa').removeAttr('disabled');

        //Retira o atributo de disabled do input
        //Identficado pelo ID
        $('.btnPesq').removeAttr('disabled');

        //Habilita o xGrid
        xgFornecedor.enable();

        //Foca no xGrid
        xgFornecedor.focus();
    }

    function validarCpnj(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14) if (cnpj.length < 14) {
            xgFornecedor.showMessageDuplicity(`CNPJ inválido`);
            xgFornecedor.focusField();
            return false;
        }

        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999") {
            xgFornecedor.showMessageDuplicity("CNPJ inválido");
            xgFornecedor.focusField();
            return false;
        }

        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            xgFornecedor.showMessageDuplicity("CNPJ inválido!");
            xgFornecedor.focusField();
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            xgFornecedor.showMessageDuplicity("CNPJ inválido!");
            xgFornecedor.focusField();
            return false;
        }

        return true;


    }

    function CheckI(ie) {

        estado = $('#slctUf :selected').text()
        ie = ie.replace(/[^\d]+/g, '')

        estado = "DF"

        if (ie == "ISENTO")
            return true;

        switch (estado) {

            case "AC":

                if (ie.length != 13)
                    return false;
                var b = 4, soma = 0;
                for (var i = 0; i <= 10; i++) {
                    soma += parseInt(ie.charAt(i)) * b;
                    --b;
                    if (b == 1)
                        b = 9;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = 0;
                if (dig != parseInt(ie.charAt(11)))
                    return false;
                b = 5;
                soma = 0;
                for (var i = 0; i <= 11; i++) {
                    soma += parseInt(ie.charAt(i)) * b;
                    --b;
                    if (b == 1)
                        b = 9;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = 0;
                return (dig == parseInt(ie.charAt(12)));
                break;

            case "AL":

                if (ie.length != 9)
                    return false;
                var b = 9, soma = 0;
                for (var i = 0; i <= 7; i++) {
                    soma += parseInt(ie.charAt(i)) * b;
                    --b;
                }
                soma *= 10;
                dig = soma - (Math.floor(soma / 11) * 11);
                if (dig == 10)
                    dig = 0;
                return (dig == parseInt(ie.charAt(8)));
                break;

            case "AM":

                if (ie.length != 9)
                    return false;
                var b = 9, soma = 0;
                for (var i = 0; i <= 7; i++) {
                    soma += parseInt(ie.charAt(i)) * b;
                    b--;
                }
                if (soma < 11) {
                    dig = 11 - soma;
                }
                else {
                    i = soma % 11;
                    if (i <= 1) {
                        dig = 0;
                    }
                    else {
                        dig = 11 - i;
                    }
                }
                return (dig == parseInt(ie.charAt(8)));
                break;

            case "AP":

                if (ie.length != 9)
                    return false;
                if (ie.substring(0, 2) != "03")
                    return false;
                var p = 0, d = 0, i = ie.substring(1, 8);
                if ((i >= 3000001) && (i <= 3017000)) {
                    p = 5;
                    d = 0;
                }
                else if ((i >= 3017001) && (i <= 3019022)) {
                    p = 9;
                    d = 1;
                }
                b = 9;
                soma = p;
                for (var i = 0; i <= 7; i++) {
                    soma += parseInt(ie.charAt(i)) * b;
                    b--;
                }
                dig = 11 - (soma % 11);
                if (dig == 10) {
                    dig = 0;
                }
                else if (dig == 11) {
                    dig = d;
                }
                return (dig == parseInt(ie.charAt(8)));
                break;

            case "BA":

                if (ie.length == 8) {
                    die = ie.substring(0, 8);
                    var nro = new Array(8);
                    var dig = -1;
                    for (var i = 0; i <= 7; i++)
                        nro[i] = parseInt(die.charAt(i));
                    var NumMod = 0;
                    if (String(nro[0]).match(/[0123458]/)) {
                        NumMod = 10;
                    }
                    else {
                        NumMod = 11;
                    }
                    b = 7;
                    soma = 0;
                    for (i = 0; i <= 5; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    i = soma % NumMod;
                    if (NumMod == 10) {
                        if (i == 0) { dig = 0; } else { dig = NumMod - i; }
                    }
                    else {
                        if (i <= 1) { dig = 0; } else { dig = NumMod - i; }
                    }
                    resultado = (dig == nro[7]);
                    if (!resultado)
                        return false;
                    b = 8;
                    soma = 0;
                    for (i = 0; i <= 5; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    soma += nro[7] * 2;
                    i = soma % NumMod;
                    if (NumMod == 10) {
                        if (i == 0) { dig = 0; } else { dig = NumMod - i; }
                    }
                    else {
                        if (i <= 1) { dig = 0; } else { dig = NumMod - i; }
                    }
                    return (dig == nro[6]);
                }

                if (ie.length == 9) {
                    die = ie.substring(0, 9);
                    var nro = new Array(9);
                    var dig = -1;
                    for (var i = 0; i <= 8; i++)
                        nro[i] = parseInt(die.charAt(i));
                    var NumMod = 0;
                    if (String(nro[0]).match(/[0123458]/)) {
                        NumMod = 10;
                    }
                    else {
                        NumMod = 11;
                    }
                    b = 8;
                    soma = 0;
                    for (i = 0; i <= 6; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    i = soma % NumMod;
                    if (NumMod == 10) {
                        if (i == 0) { dig = 0; } else { dig = NumMod - i; }
                    }
                    else {
                        if (i <= 1) { dig = 0; } else { dig = NumMod - i; }
                    }
                    resultado = (dig == nro[8]);
                    if (!resultado)
                        return false;
                    b = 9;
                    soma = 0;
                    for (i = 0; i <= 6; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    soma += nro[8] * 2;
                    i = soma % NumMod;
                    if (NumMod == 10) {
                        if (i == 0) { dig = 0; } else { dig = NumMod - i; }
                    }
                    else {
                        if (i <= 1) { dig = 0; } else { dig = NumMod - i; }
                    }
                    return (dig == nro[7]);
                }

                return false;
                break;

            case "CE":

                if (ie.length != 9)
                    return false;
                die = ie;
                var nro = Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(die[i]);
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = 0;
                return (dig == nro[8]);
                break;

            case "DF":
                if (ie.length != 13) {
                    xgFornecedor.showMessageDuplicity(`Inscrição Estadual inválido`);
                    return false;
                }


                var nro = new Array(13);

                for (var i = 0; i <= 12; i++)
                    nro[i] = parseInt(ie.charAt(i));

                b = 4;
                soma = 0;

                for (i = 0; i <= 10; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 9;
                }

                dig = 11 - (soma % 11);

                if (dig >= 10)
                    dig = 0;

                if (dig != nro[11]) {
                    xgFornecedor.showMessageDuplicity(`CPF inválido`);
                    return false;
                }

                b = 5;
                soma = 0;

                for (i = 0; i <= 11; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 9;
                }

                dig = 11 - (soma % 11);

                if (dig >= 10)
                    dig = 0;

                return (dig == nro[12]);
                break;

            case "ES":

                if (ie.length != 9)
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i < 2) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[8]);
                break;

            case "GO":

                if (ie.length != 9)
                    return false;
                s = ie.substring(0, 2);
                if ((s == '10') || (s == '11') || (s == '15')) {
                    var nro = new Array(9);
                    for (var i = 0; i <= 8; i++)
                        nro[i] = parseInt(ie.charAt(i));
                    //n = Math.floor(ie / 10);
                    n = parseInt(ie.substring(0, 7));
                    if (n = 11094402) {
                        if ((nro[8] == 0) || (nro[8] == 1))
                            return true;
                    }
                    b = 9;
                    soma = 0;
                    for (i = 0; i <= 7; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    i = soma % 11;
                    if (i == 0)
                        dig = 0;
                    else {
                        if (i == 1) {
                            if ((n >= 10103105) && (n <= 10119997))
                                dig = 1;
                            else
                                dig = 0;
                        }
                        else
                            dig = 11 - i;
                    }
                    return (dig == nro[8]);
                }
                return false;
                break;

            case "MA":

                if (ie.length != 9)
                    return false;
                if (ie.substring(0, 2) != "12")
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[8]);
                break;

            case "MG":

                if (ie.length != 13)
                    return false;
                dig1 = ie.substring(11, 12);
                dig2 = ie.substring(12, 13);
                inscC = ie.substring(0, 3) + '0' + ie.substring(3, 11);
                insc = inscC.split('');
                npos = 11;
                i = 1;
                ptotal = 0;
                psoma = 0;
                while (npos >= 0) {
                    i++;
                    psoma = parseInt(insc[npos]) * i;
                    if (psoma >= 10)
                        psoma -= 9;
                    ptotal += psoma;
                    if (i == 2)
                        i = 0;
                    npos--;
                }
                nresto = ptotal % 10;
                if (nresto == 0)
                    nresto = 10;
                nresto = 10 - nresto;
                if (nresto != parseInt(dig1))
                    return false;
                npos = 11;
                i = 1;
                ptotal = 0;
                is = ie.split('');
                while (npos >= 0) {
                    i++;
                    if (i == 12)
                        i = 2;
                    ptotal += parseInt(is[npos]) * i;
                    npos--;
                }
                nresto = ptotal % 11;
                if ((nresto == 0) || (nresto == 1))
                    nresto = 11;
                nresto = 11 - nresto;
                return (nresto == parseInt(dig2));
                break;

            case "MS":

                if (ie.length != 9)
                    return false;
                if (ie.substring(0, 2) != "28")
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[8]);
                break;

            case "MT":

                if (ie.length != 11)
                    return false;
                die = ie;
                var nro = new Array(11);
                for (var i = 0; i <= 10; i++)
                    nro[i] = parseInt(die[i]);
                b = 3;
                soma = 0;
                for (i = 0; i <= 9; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 9;
                }
                i = soma % 11;
                if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[10]);
                break;

            case "PA":

                if (ie.length != 9)
                    return false;
                if (ie.substring(0, 2) != '15')
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1)
                    dig = 0;
                else
                    dig = 11 - i;
                return (dig == nro[8]);
                break;

            case "PB":

                if (ie.length != 9)
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1)
                    dig = 0;
                else
                    dig = 11 - i;
                return (dig == nro[8]);
                break;

            case "PE":

                // IE antiga com 14 digitos
                if (ie.length == 14) {
                    var nro = new Array(14);
                    for (var i = 0; i <= 13; i++)
                        nro[i] = parseInt(ie.charAt(i));
                    b = 5;
                    soma = 0;
                    for (i = 0; i <= 12; i++) {
                        soma += nro[i] * b;
                        b--;
                        if (b == 0)
                            b = 9;
                    }
                    dig = 11 - (soma % 11);
                    if (dig > 9)
                        dig = dig - 10;
                    return (dig == nro[13]);
                }

                // IE nova com 9 digitos
                if (ie.length == 9) {
                    var nro = new Array(9);
                    for (var i = 0; i <= 8; i++)
                        nro[i] = parseInt(ie.charAt(i));
                    b = 8;
                    soma = 0;
                    for (i = 0; i <= 6; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    i = soma % 11;
                    if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                    if (dig != nro[7])
                        return false;
                    b = 9;
                    soma = 0;
                    for (i = 0; i <= 7; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    i = soma % 11;
                    if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                    return (dig == nro[8]);
                }

                return false;
                break;

            case "PI":

                if (ie.length != 9)
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[8]);
                break;

            case "PR":

                if (ie.length != 10)
                    return false;
                var nro = new Array(10);
                for (var i = 0; i <= 9; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 3;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 7;
                }
                i = soma % 11;
                if (i <= 1)
                    dig = 0;
                else
                    dig = 11 - i;
                if (dig != nro[8])
                    return false;
                b = 4;
                soma = 0;
                for (i = 0; i <= 8; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 7;
                }
                i = soma % 11;
                if (i <= 1)
                    dig = 0;
                else
                    dig = 11 - i;
                return (dig == nro[9]);
                break;

            case "RJ":

                if (ie.length != 8)
                    return false;
                var nro = new Array(8);
                for (var i = 0; i <= 7; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 2;
                soma = 0;
                for (i = 0; i <= 6; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 7;
                }
                i = soma % 11;
                if (i <= 1) { dig = 0; } else { dig = 11 - i; }
                return (dig == nro[7]);
                break;

            case "RN":

                if (ie.substring(0, 2) != '20')
                    return false;

                // IE com 9 digitos
                if (ie.length == 9) {
                    var nro = new Array(9);
                    for (var i = 0; i <= 8; i++)
                        nro[i] = parseInt(ie.charAt(i));
                    b = 9;
                    soma = 0;
                    for (i = 0; i <= 7; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    soma *= 10;
                    dig = soma % 11;
                    if (dig == 10)
                        dig = 0;
                    return (dig == nro[8]);
                }

                // IE com 10 digitos
                if (ie.length == 10) {
                    var nro = new Array(10);
                    for (var i = 0; i <= 9; i++)
                        nro[i] = parseInt(ie.charAt(i));
                    b = 10;
                    soma = 0;
                    for (i = 0; i <= 8; i++) {
                        soma += nro[i] * b;
                        b--;
                    }
                    soma *= 10;
                    dig = soma % 11;
                    if (dig == 10)
                        dig = 0;
                    return (dig == nro[9]);
                }

                return false;
                break;

            case "RO":

                if (ie.length != 14)
                    return false;
                var nro = new Array(14);
                b = 6;
                soma = 0;
                for (var i = 0; i <= 12; i++) {
                    nro[i] = parseInt(ie.charAt(i));
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 9;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = dig - 10;
                return (dig == parseInt(ie.charAt(13)));
                break;

            case "RR":

                if (ie.length != 9)
                    return false;
                if (ie.substring(0, 2) != "24")
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                var soma = 0;
                var n = 0;
                for (i = 0; i <= 7; i++)
                    soma += nro[i] * ++n;
                dig = soma % 9;
                return (dig == nro[8]);
                break;

            case "RS":

                if (ie.length != 10)
                    return false;
                var nro = new Array(10);
                for (var i = 0; i <= 9; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 2;
                soma = 0;
                for (i = 0; i <= 8; i++) {
                    soma += nro[i] * b;
                    b--;
                    if (b == 1)
                        b = 9;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = 0;
                return (dig == nro[9]);
                break;

            case "SC":

                if (ie.length != 9)
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                i = soma % 11;
                if (i <= 1)
                    dig = 0;
                else
                    dig = 11 - i;
                return (dig == nro[8]);
                break;

            case "SE":

                if (ie.length != 9)
                    return false;
                var nro = new Array(9);
                for (var i = 0; i <= 8; i++)
                    nro[i] = parseInt(ie.charAt(i));
                b = 9;
                soma = 0;
                for (i = 0; i <= 7; i++) {
                    soma += nro[i] * b;
                    b--;
                }
                dig = 11 - (soma % 11);
                if (dig >= 10)
                    dig = 0;
                return (dig == nro[8]);
                break;

            case "SP":

                if (ie.length != 12)
                    return false;
                var nro = new Array(12);
                for (var i = 0; i <= 11; i++)
                    nro[i] = parseInt(ie.charAt(i));
                soma = (nro[0] * 1) + (nro[1] * 3) + (nro[2] * 4) + (nro[3] * 5) + (nro[4] * 6) + (nro[5] * 7) + (nro[6] * 8) + (nro[7] * 10);
                dig = soma % 11;
                if (dig >= 10)
                    dig = 0;
                if (dig != nro[8])
                    return false;
                soma = (nro[0] * 3) + (nro[1] * 2) + (nro[2] * 10) + (nro[3] * 9) + (nro[4] * 8) + (nro[5] * 7) + (nro[6] * 6) + (nro[7] * 5) + (nro[8] * 4) + (nro[9] * 3) + (nro[10] * 2);
                dig = soma % 11;
                if (dig >= 10)
                    dig = 0;
                return (dig == nro[11]);
                break;

            case "TO":

                if (ie.length != 11)
                    return false;
                s = ie.substring(2, 4);
                if ((s != "01") && (s != "02") && (s != "03") && (s != "99"))
                    return false;
                var nro = new Array(11);
                b = 9;
                soma = 0;
                for (var i = 0; i <= 9; i++) {
                    nro[i] = parseInt(ie.charAt(i));
                    if (i != 2 && i != 3) {
                        soma += nro[i] * b;
                        b--;
                    }
                }
                resto = soma % 11;
                if (resto < 2) { dig = 0; } else { dig = 11 - resto; }
                return (dig == parseInt(ie.charAt(10)));
                break;

            default:
                return false;

        }
    }

    //Retorna as funcoes
    return {
        grid: grid,
        getUf: getUf
    }
})();