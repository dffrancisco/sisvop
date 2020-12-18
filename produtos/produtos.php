<script src="produtos/produtos.js" type="text/javascript"></script>


<title>Produto</title>

<div class="container">



        <div class="tabela col s12 margintop" id="pnFields">
                <div class="row">
                        <div class="col s3">
                                <label>Codigo</label>
                                <input type="number" class="corInp" placeholder="" name="codigo">

                        </div>
                        <div class="col s3">
                                <label>Descrição</label>
                                <input type="text" class="corInp" placeholder="" name="descricao">

                        </div>
                        <div class="col s3">
                                <label>Quantidade</label>
                                <input type="number" class="corInp" placeholder="" name="qtd">

                        </div>
                        <div class="col s3">
                                <label>Valor</label>
                                <input type="text" class="corInp real" placeholder="" name="valor">

                        </div>
                </div>

                <!-- <div class="row">
                        <div class="col s3">
                                <label>Marca</label>
                                <select name="marca" id="" class="corInp">
                                        <option value="valor1">Valor 1</option>
                                        <option value="valor2" selected>Valor 2</option>
                                        <option value="valor3">Valor 3</option>
                                </select>


                        </div>
                        <div class="col s3">
                                <label>Data de cadastro</label>
                                <input type="text" class="corInp" placeholder="" name="data">

                        </div>


                </div> -->

                <div id="xgProduto" class="list"></div>

                <div id="pnButtons" class="right-align row">
                        
                </div>
                <div id="pnCodigoTela">Estoque</div>
                <div>