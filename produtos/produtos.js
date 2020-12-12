let xgProduto;

$(function () {
  produto.grid();
  xgProduto.queryOpen({ search: '' })

});

const produto = (function () {

  let url = 'produtos/per.produtos.php'
  let controleGrid;


  function addReal(value) {
    return "R$ " + value;
  }

  function novo() {
    controleGrid = 'insert';
    xgProduto.clearElementSideBySide()
    xgProduto.focusField()
    xgProduto.disable()
  }

  function searchConf() {

    let search = document.getElementById('edtPesquisa').value;
   
    xgProduto.queryOpen({ search })


  }

  function savar() {
    let param;
    let diff;
    param = xgProduto.getElementSideBySideJson()

    // if(controleGrid == 'insert'){
    // }

    if (controleGrid == 'edit') {
      param.id = xgProduto.dataSource().id;
      // diff = xgProduto.getDiffTwoJson()
    }




    axios.post(url, {
      call: 'save',
      param: param
    })
      .then(r => {
        if (r.data.id) {
          param.id = r.data.id
          xgProduto.insertLine(param)
        } else {
          xgProduto.dataSource(param)
        }

      })

    xgProduto.enable()
    xgProduto.focus()
  }


  function deletar() {
    let param;
    if (xgProduto.dataSource().id) {
      param = xgProduto.dataSource().id
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

  function grid() {
    xgProduto = new xGridV2.create({
      el: "#xgProduto",
      height: 210,
      heightLine: 35,
      theme: "x-clownV2",
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
              click: () => {
                controleGrid = 'edit';
                // if (grid.dataSource()) console.log(grid.dataSource().descricao);

                //grid.disableFieldsSideBySide(true);
              },
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
              click: savar
            },

            cancelar: {
              html: "Cancelar",
              class: "btnP",
              state: xGridV2.state.cancel,
              click: () => {

                xgProduto.enable()
                xgProduto.focus()
              },
            },

          },
        },
      },
      columns: {
        Código: {
          dataField: "codigo",
          center: true,
          width: "10%",
        },
        Descrição: {
          dataField: "descricao",
          width: "60%",
          style: "font-size: 16px;",

        },
        QTD: {
          dataField: "qtd",
          width: "15%",
          center: true,
        },
        // 'Marca': { dataField: 'marca', width: '17%', class: 'fontGrid' },
        // 'Departamento': { dataField: 'departamento', class: 'fontGrid' },
        Valor: {
          dataField: "valor",
          render: addReal,
          width: "15%",
          center: true,
        },
      },
      query: {
        execute: (r) => {
          console.log(r)
          getProdutos(r.param.search, r.offset)

        },
      },
    });
  }

  function getProdutos(search, offset) {
    console.log(search, offset)
    axios.post(url, {
      call: 'getProdutos',
      param: { search: search, offset: offset }
    })
      .then(rs => {
        xgProduto.querySourceAdd(rs.data);
        if (offset == 0) xgProduto.focus();
      })

  }

  return {
    grid: grid,
  };
})();



var exemplo = (function () {
  function getExemplo() {
    $.ajax({
      data: {
        call: "exemplo",
        param: {},
      },
      success: function (r) {
        console.log(r);
      },
    });
  }

  return {
    getExemplo: getExemplo,
  };
})();

