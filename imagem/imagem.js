let xgServicos
$(function () {

  imagem.grid()
  imagem.deletePDF()

  xgServicos.queryOpen({ search: '' })
  $('#button').click(function (e) {

    imagem.getImagem()
  })

  $(".btnPesq").click(function () {
    imagem.buscar()
  })

});


var imagem = (function () {

  let id_lista_servico
  let url = 'imagem/per.imagem.php'
  function grid() {
    xgServicos = new xGridV2.create({
      el: `#xgServicos`,
      theme: 'x-clownV2',
      height: '200',
      columns: {

        'SERVIÇO': { dataField: 'SERVICO' },
        FANTASIA: { dataField: 'FANTASIA' },
        'DATA INÍCIO': { dataField: 'DATA_INICIO', center: true },
        'DATA FINAL': { dataField: 'DATA_FINALIZACAO', center: true },
        STATUS: { dataField: 'STATUS' },

      },

      onKeyDown: {
        '13': (ln, e) => {
          $('#imagem').val('')
          getDadosServ(ln.ID_LISTA_SERVICO)
        }

      },

      dblClick: (ln,) => {
        if (ln == false)
          return false

        $('#imagem').val('')
        getDadosServ(ln.ID_LISTA_SERVICO)

      },

      query: {
        execute: (r) => {
          getServicos(r.param.search, r.offset);
        }
      }

    })
  }

  function getDadosServ(ID_LISTA_SERVICO) {
    id_lista_servico = ID_LISTA_SERVICO

    axios.post(url, {
      call: 'listar_documento',
      param: id_lista_servico
    }).then(r => {

      $("#a").html('')
      for (let i in r.data) {

        if (r.data[i] != '.' && r.data[i] != '..') {
          let iframe = `<div class="col s6" id="frame-container">
          <div class="test" value="${r.data[i]}">
          <i class="fa fa-times iframe-button"></i>
          </div>
          <iframe src="./arquivos_projetos/${id_lista_servico}/${r.data[i]}" style="height: 460px"></iframe>
          </div>
          `

          $("#a").append(iframe)
        }
      }
      deletePDF()
    })
  }

  // function click(arquivo) {
  //   alert(arquivo)
  // }
  const getServicos = async (search, offset) => {


    let param = {
      search: search,
      offset: offset,
    }
    axios.post(url, {
      call: 'getServicos',
      param: param
    }).then(rs => {

      xgServicos.querySourceAdd(rs.data);

    })
  }

  function getImagem() {

    let imagem = $('#imagem')[0]

    var fReader = new FileReader();
    console.log('imagem.files :', imagem.files);

    if (imagem.files[0] == undefined) {
      alert('Nenhuma arquivo encontrado');
      return false;
    }

    if (imagem.files[0].type != "application/pdf") {
      console.error(imagem.name, "Nao e um PDF.")
      return
    }

    fReader.readAsDataURL(imagem.files[0]);

    let name = imagem.files[0].name
    nome_img = imagem.files[0].name
    fReader.onloadend = function (event) {
      // let img = `<img src=${imagem}>`
      // $('.container').append(img)
      // var img = document.getElementById("img");
      // img.src = event.target.result;
      param = {
        arquivo: event.target.result,
        name: name,
        id_lista_servico: id_lista_servico
      }

      // console.log('event.target.result :', event.target.result);
      axios.post(url, {
        call: 'a',
        param: param
      })
        .then(r => {

          getDadosServ(id_lista_servico)
          $('#imagem').val('')
        })
    }

  }

  function buscar() {

    axios.post('imagem/per.imagem.php', {
      call: 'b',
    })
      .then(r => {
        id_lista_servico = r.data[0].ID_LISTA_SERVICO
        console.log('id_lista_servico :', id_lista_servico);
      })
  }

  function deletePDF() {
    $(".test").click(function () {
      let arquivo = $(this).attr('value')

      axios.post(url, {
        call: 'deletePDF',
        param: { arquivo: arquivo, id_lista_servico: id_lista_servico }
      }).then(r => {

        getDadosServ(id_lista_servico)

      })
    })
  }

  return {
    getImagem: getImagem,
    buscar: buscar,
    grid: grid,
    deletePDF: deletePDF
  }
})();
