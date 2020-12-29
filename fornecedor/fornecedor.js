
//Criando variável para funcao do xGridFornecedor
let xgFornecedor;

//Funcao que chama o grid do Fornecedor
$(function () {
    fornecedor.grid();
    fornecedor.getUf();
    xgFornecedor.queryOpen({ search: '' });
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
                CGC: { dataField: 'cgc' },
                Fantazia: { dataField: 'nome_fantazia' },
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
                            class: 'btnP',
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
                    dataField: ['cgc'],

                    execute: (r) => {
                        
                        let param = {}
                        param.cgc = r.value,
                            axios.post(url, {
                                call: 'getCgc',
                                param: param,
                            })
                                .then(rs => {
                                    if (rs.data[0]) {
                                        xgFornecedor.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!');
                                        xgFornecedor.focusField(r.field);
                                        return false
                                    }
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
                let table = `<option value="${rs.data[i].id_uf}"> ${rs.data[i].uf}</option>`
                $('#slctUf').append(table)
            }
        })
    }

    function pesquisar() {
        let search = $('#editPesquisa').val().trim();
        xgFornecedor.queryOpen({ search });
        xgFornecedor.focus();
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
        $('#editDataCadastro').val(date);

        //Desabilita o campo de digitar palavras para pesquisar
        //Identificado pelo ID
        $('#editPesquisa').prop("disabled", true)

        //Desabilita o botão de pesquisa identificado pelo ID
        $('.btnPesq').prop("disabled", true)
    }

    function editar() {
        //Dá valor de editar ao ControleGrid
        controleGrid = 'editar';

        //Desabilita o campo de digitar palavras para pesquisar
        //Identificado pelo ID
        $('#editPesquisa').prop("disabled", true)

        //Desabilita o botão de pesquisa identificado pelo ID
        $('.btnPesq').prop("disabled", true)
    }

    function deletar() {

        if (xgFornecedor.dataSource().id_fornecedor) {

            let param = xgFornecedor.dataSource().id_fornecedor;

            axios.post(url, {
                call: 'deletar',
                param: param

            }).then(rs => {

                xgFornecedor.deleteLine();

            });
        }

    }

    const salvar = async () => {
        //Todos os valores dos inputs são recolhidos como Json
        //e passados para o param 
        let param = xgFornecedor.getElementSideBySideJson();
        //Cria um atributo de data e capta o valor do input
        //identificado pelo ID
        param.data_cadastro = $('#editDataCadastro').val();
        let allDuplicty = await xgFornecedor.getDuplicityAll();

        if (allDuplicty == false)
            return false;

        if (controleGrid == 'novo')
            param.id_fornecedor = '';

        if (controleGrid == 'editar')
            param.id_fornecedor = xgFornecedor.dataSource().id_fornecedor;

        // console.log(param)

        axios.post(url, {
            call: 'salvar',
            param: param
        })
            .then(rs => {

                if (rs.data.id_fornecedor) {
                    param.id_fornecedor = rs.data.id_fornecedor;
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
        $('#editPesquisa').removeAttr('disabled');

        //Retira o atributo de disabled do input
        //Identficado pelo ID
        $('.btnPesq').removeAttr('disabled');

        //Habilita o xGrid
        xgFornecedor.enable();

        //Foca no xGrid
        xgFornecedor.focus();
    }
    //Retorna as funcoes
    return {
        grid: grid,
        getUf: getUf
    }
})();