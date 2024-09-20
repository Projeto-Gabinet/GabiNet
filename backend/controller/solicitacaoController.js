const SolicitacaoModel = require("../model/entidades/SolicitacaoModel");

const solicitacaoModel = new SolicitacaoModel();

class SolicitacaoController {
    async obterTodos(req,res) {
        const solicitacoes = await solicitacaoModel.obterTodos();
        return res.status(200).json(  solicitacoes );
    }

    async obterPorId(req,res){
        const id =req.params.id;
        const solicitacoes = await solicitacaoModel.obterPorId(id);
        return res.status(200).json(solicitacoes); 
      }

    async adicionar(req, res){
        const {cidadao_id, usuario_id, data, assunto, solicitacao, id_secretaria, status} = req.body;
        const solicitacoes = new SolicitacaoModel(0, cidadao_id, usuario_id, data, assunto, solicitacao, id_secretaria, status);

        try {
            await solicitacaoModel.adicionar(solicitacoes);
            return res.status(200).json({message: 'solicitacao adicionado com sucesso!'});
        } catch (error) {
            console.log('Erro ao cadastrar solicitacao:'+error);
            res.status(500).json('Erro ao cadastrar solicitacao');
        }
    console.log(solicitacoes)   
    return res.status(201).json({message: 'solicitacao adicionado com sucesso!'});

    }
    async atualizar(req,res){
        const id =req.params.id;
        const {cidadao_id, usuario_id, data, assunto, solicitacao, id_secretaria, status} = req.body;
        const solicitacoes = new SolicitacaoModel(0, cidadao_id, usuario_id, data, assunto, solicitacao, id_secretaria, status);
    
           try {
             await solicitacao.atualizar(id,solicitacao);
            return res.status(201).json({message:'Atualização com successo'})
           } catch (error) {
            console.log('Erro ao cadastrar solicitacao:'+error)
            res.status(500).json({error:'Erro ao atualizar solicitacao'})
           }  
    
}
    async excluir(req,res){
        const id = req.params.id;
        try {
        await solicitacaoModel.delete(id);
        res.status(200).json({message:'Item removido'})
        } catch (error) {
        console.log('Erro ao tentar excluir solicitacao',error)
        res.status(500).json({error:'Erro ao tentar excluir solicitacao'})
        
        }       
    }
  
    async filtrar(req,res){
        const termoBusca =req.params.termoBusca;
        const solicitacao = await solicitacaoModel.filtrar(termoBusca);
        return res.status(200).json(solicitacao); 
    }
    
}

module.exports = SolicitacaoController;