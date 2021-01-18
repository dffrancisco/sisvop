let xgProduto;

$(function () {
  produto.grid();
  produto.getMarca();
  xgProduto.queryOpen({ search: '' })

});

const produto = (function () {

  let url = 'produtos/per.produtos.php'
  let controleGrid;

  function grid() {
    xgProduto = new xGridV2.create({
      el: "#xgProduto",
      height: 210,
      heightLine: 35,
      theme: "x-clownV2",

      columns: {
        Código: {
          dataField: "CODIGO",
          center: true,
          width: "10%",
        },
        Descrição: {
          dataField: "DESCRICAO",
          width: "60%",
          style: "font-size: 16px;",

        },
        QTD: {
          dataField: "QTD",
          width: "15%",
          center: true,
        },
        Valor: {
          dataField: "VALOR",
          render: addReal,
          width: "15%",
        },
      },

      sideBySide: {
        el: "#pnFields",

        frame: {
          el: "#pnButtons",
          buttons: {

            pesquisar: {
              html: "Pesquisar",
              class: "btnP btnPesq",
              click: searchConf,
            },
            novo: {
              html: "Novo",
              class: "btnP",
              state: xGridV2.state.insert,
              click: novo,
            },
            edit: {
              html: "Editar",
              class: "btnP",
              state: xGridV2.state.update,
              click: editar,
            },
            deletar: {
              html: "Deletar",
              class: "btnP btnDel",
              state: xGridV2.state.delete,
              click: deletar,
            },
            save: {
              html: "Salvar",
              class: "btnP",
              state: xGridV2.state.save,
              click: salvar
            },
            cancelar: {
              html: "Cancelar",
              class: "btnP",
              state: xGridV2.state.cancel,
              click: cancelar,
            },

          },
        },
        duplicity: {
          dataField: ['codigo'],

          execute: (r) => {
            let param = {}
            param.codigo = r.value,
              axios.post(url, {
                call: 'getCodigo',
                param: param

              })
                .then(rs => {
                  if (rs.data[0]) {
                    xgProduto.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                    xgProduto.focusField(r.field);
                    return false
                  }
                })
          }
        },
      },

      query: {
        execute: (r) => {
          getProdutos(r.param.search, r.offset)

        },
      },
    });
  }

  function getProdutos(search, offset) {
    axios.post(url, {
      call: 'getProdutos',
      param: { search: search, offset: offset }
    })
      .then(rs => {
        xgProduto.querySourceAdd(rs.data);
        if (rs.data[0]) xgProduto.focus();
      })

  }

  function deletar() {
    let param;
    if (xgProduto.dataSource().id_produto) {
      param = xgProduto.dataSource().id_produto
      confirmaCodigo({
        msg: 'Digite o código de confirmação',
        call: () => {
          axios.post(url, {
            call: 'delete',
            param: param
          })
            .then(r => {
              xgProduto.deleteLine()
            })
        }
      })
    }

  }

  const salvar = async () =>{
    let param = xgProduto.getElementSideBySideJson()
    param.data_cadastro = $('#edtData').val()

    let allDuplicty = await xgProduto.getDuplicityAll()

    if (allDuplicty == false)
      return false;

    let valCampos = {
      codigo: $('#editCodigo').val(),
      descricao: $('#editDescricao').val(),
      valor: $('#editValor').val(),
      endereco: $('#editEndereco').val(),
      qtd: $('#editQtd').val(),
      marca: $('#editMarca').val(),
    }
    valCampos.valor = valCampos.valor.replace(',', '');

    for (let i in valCampos) {
      if (valCampos[i] == '' || valCampos.valor == 0) {
        show('Por favor preencha todos os campos')
        return false
      }
    }

    if (controleGrid == 'insert') {
      param.id_produto = ''
    }

    if (controleGrid == 'edit') {
      param.id_produto = xgProduto.dataSource().id_produto;
    }

    axios.post(url, {
      call: 'save',
      param: param
    })
      .then(r => {
        if (r.data.id_produto) {
          param.id_produto = r.data.id_produto
          xgProduto.insertLine(param)

        } else {

          xgProduto.dataSource(param)
        }

      })

    xgProduto.enable()
    xgProduto.focus()
  }

  function addReal(value) {
    return "R$ " + value;
  }

  function novo() {
    controleGrid = 'insert';
    xgProduto.clearElementSideBySide()
    xgProduto.focusField()
    xgProduto.disable()
    let date = new Date().toLocaleDateString('pt-BR')
    $('#edtData').val(date)
    $('#edtPesquisa').prop("disabled", true)
    $('.btnPesq').prop("disabled", true)
  }

  function editar() {
    controleGrid = 'edit';
    $('#edtPesquisa').prop("disabled", true)
    $('.btnPesq').prop("disabled", true)

  }

  function searchConf() {

    let search = $('#edtPesquisa').val().trim();
    xgProduto.queryOpen({ search })

  }

  function getMarca() {
    axios.post(url, {
      call: 'getMarca',

    }).then(rs => {
      for (let i in rs.data) {
        let table = `<option value="${rs.data[i].id_marca}"> ${rs.data[i].marca}</option>`
        $('#slctMarca').append(table)
      }

    })
  }

  function cancelar() {

    $('.btnPesq').removeAttr("disabled")
    $('#edtPesquisa').removeAttr("disabled")
    xgProduto.enable()
    xgProduto.focus()
  }

  return {
    grid: grid,
    getMarca: getMarca,
  };
})();