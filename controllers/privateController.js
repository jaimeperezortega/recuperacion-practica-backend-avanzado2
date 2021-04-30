' use strict';

class PrivateController {

    /**
     * GET /private
     */
    index(req, res, next){

        if(!req.session.usuarioLogado){
            res.redirect('/login');
            return;
        }
        res.render('private');
    }
}

module.exports = new PrivateController;