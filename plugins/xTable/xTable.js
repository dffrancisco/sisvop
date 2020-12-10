var xTableMemory = {};

$.fn.xTable = function (argument) {

    let element = this;

    let argDefault = {
        source: {},
        columns: false,
        compare: {},
        render: {},
        width: '100%',
        count: false,
        class: 'table',
        title: true,
        color: '#FFF',
        done: false,
        tr: false,
        prepend: false,
        append: false,
        trDelete: false
    };


    if (!argument.append && !argument.prepend && !argument.trDelete)
        if (argument.source === undefined) {
            console.log(typeof argument);
            argDefault.source = argument;
            argument = '';
        }

    let arg = $.extend(argDefault, argument);

    if (!arg.columns) {
        arg.columns = {};

        $.each(arg.source[0], function (i, ln) {
            arg.columns[i] = {dataField: i};
        });

    }

    if (xTableMemory[element[0].id] == undefined) {
        //clonando o objeto arg
        xTableMemory[element[0].id] = Object.assign({}, arg);

        delete xTableMemory[element[0].id].source;
    }


    let html = $('<table>', {class: arg.class, width: arg.width});
    let tbody = $('<tbody>');
    let tr = $('<tr>');
    let firstCount = true;
    let forTotaliza = {
        obj: {},
        fields: {}
    };

    let table = {
        createTitle: function () {
            if (!arg.columns) {
                arg.columns = {};

                $.each(arg.source[0], function (i, ln) {
                    arg.columns[i] = {dataField: i};
                });

            }

            if (arg.count)
                tr.append($('<th>', {html: '&nbsp;', width: 30}));

            $.each(arg.columns, function (i, ln) {
                tr.append($('<th>', {html: i, width: ln.width}));


                forTotaliza.obj[ln.dataField] = '';

                if (ln.totaliza != undefined) {
                    if (ln.totaliza) {
                        forTotaliza.fields[ln.dataField] = 0;
//                        console.log(i, ln);
                    }
                }

            });

            html.append($('<thead>').append(tr));

        },

        createLine: function (source) {
            if (!source[0])
                html.append($('<tbody>'));



            $.each(source, function (i, row) {

                $.each(forTotaliza.fields, function (a, b) {
                    let value = row[a] == null ? 0 : parseFloat(row[a]);
                    forTotaliza.fields[a] += value
                    forTotaliza.obj[a] = forTotaliza.fields[a];
//                    console.log(forTotaliza);
                })

                var forTr = '';

                if (xTableMemory[element[0].id].tr)
                    forTr = xTableMemory[element[0].id].tr(row);

                tr = $('<tr>', forTr);

                firstCount = true;

                table._createColumns(i, row);

                tbody.append(tr);
                html.append(tbody);

            });
        },

        _createColumns: function (i, row) {

            $.each(xTableMemory[element[0].id].columns, function (field, value) {

                if (xTableMemory[element[0].id].count)
                    if (firstCount) {
                        if(arg.count)
                            tr.append($('<td>', {html: i + 1}));
                        else
                            tr.append($('<td>', {html: ''})) 
                        firstCount = false;
                    }

                var myValue = '';

                if (value.render != undefined) {
                    myValue = value.render(row[value.dataField]);
                    row[value.dataField] = myValue;
                } else {
                    myValue = row[value.dataField];
                }


                if (value.compare != undefined) {

                    if (xTableMemory[element[0].id].compare[value.compare].dataField != undefined) {

                        myValue = xTableMemory[element[0].id].compare[value.compare].call(row);
                    } else {
                        // console.log(value.dataField, row[value.dataField], '---');
                        if (value.dataField != undefined)
                            row['value'] = row[value.dataField];

                        myValue = xTableMemory[element[0].id].compare[value.compare](row);
                    }

                }

                if (value.class != undefined || value.style != undefined) {
                    var div = $('<div>', {
                        class: value.class != undefined ? value.class : '',
                        style: value.style != undefined ? value.style : '',
                        html: myValue
                    });
                    myValue = div;
                }

                tr.append($('<td>', {html: myValue}));


            });


        }

    };

    if (arg.prepend) {

        if (arg.prepend[0] == undefined)
            arg.prepend = [arg.prepend];

        $.each(arg.prepend, function (i, ln) {
            table.createLine([ln]);
            element.find('tbody').prepend(tr[0]);
        });
    }

    if (arg.append) {
        if (arg.append[0] == undefined)
            arg.append = [arg.append];

        $.each(arg.append, function (i, ln) {
            table.createLine([ln]);
            element.find('tbody').append(tr[0]);
        });
    }

    if (arg.trDelete) {
        element.find(arg.trDelete).animate({
            opacity: '0.3',
            height: 0
        }, 500, function () {
            element.find(arg.trDelete).remove();
        });
    }

    if ((arg.append == false) && (arg.prepend == false) && (arg.trDelete == false)) {
        table.createTitle();
        table.createLine(arg.source);
        element.html(html);
    }

    if (arg.done)
        arg.done(arg.source);

    if (arg.getTotalizador)
        arg.getTotalizador(forTotaliza.obj);
};


// $('#pnDados').xTable(r);
// 

/*   $.ajax({
 data: {
 call: 'getFuncionariosFichados',
 param: {}
 },
 success: function (r) {
 $('#pnDados').xTable({
 source: r,
 count: true,
 tr: function (r) {
 return {id: r.COD_FUNCIONARIO};
 },
 columns: {
 'Nome': {dataField: 'NOME', width: '50%', style: 'color: red'},
 'Tratamento': {dataField: 'TRATAMENTO', class: 'bold', style: 'color: red'},
 'Fichado': {dataField: 'DT_ADMISSAO', compare: 'dt', render: util.dataBrasil},
 'NomeCompleto': {compare: 'union'}
 },
 done: function (r) {retorna o objeto processado e execulta depois de tudo feito},
 compare: {
 dt: {
 dataField: ['DT_ADMISSAO', 'ID'],
 call: function (r) {
 
 if (r.ID > 2)
 return '<label style="color: blue">' + r.DT_ADMISSAO + '</label>';
 else
 return '<label style="color: red">' + r.DT_ADMISSAO + '</label>';
 }
 },
 
 union: {
 dataField: ['V_CARGO', 'ID'],
 call: function (r) {
 return r.V_CARGO + '-' + r.ID;
 }
 },
 
 //retorna o objeto com todos os valores
 getTotalizador:function(r){$('#tbSeparado').xTable({prepend: r});   },
 
 Tr: function (r) {
 //r -> retorna todos os campos da columns + o campo value com o valor do compo invocado
 return {class: r.NUM_ORCAMENTO};
 }
 
 }
 });
 }
 });*/


//$('#tbSeparado').xTable({
//   //aqui ele usa o find
//  trDelete:'.trNr7936'
//})
//
//$('#tbSeparado').xTable({
//  prepend:[{"NUM_ORCAMENTO":8888,"HR_INICIAL":"10:52:52","TIPO_PAGAMENTO":"1","VENDEDOR":"JOSE","COD_ESTOQUISTA":505,"ESTOQUISTA":"ISRAEL","NOME_CLIENTE":"TIO XICO","MONTADOR":null,"VENDEDOR_MONTAGEM":null}]
//})
//
//$('#tbSeparado').xTable({
//  append:[{"NUM_ORCAMENTO":8888,"HR_INICIAL":"10:52:52","TIPO_PAGAMENTO":"1","VENDEDOR":"JOSE","COD_ESTOQUISTA":505,"ESTOQUISTA":"ISRAEL","NOME_CLIENTE":"TIO XICO","MONTADOR":null,"VENDEDOR_MONTAGEM":null}]
//})