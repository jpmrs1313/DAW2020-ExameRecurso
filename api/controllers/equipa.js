var Equipa = require('../models/equipa')


module.exports.listar = () => {
    return Equipa
    .aggregate([
        {
           $project: {
              id: "$id",
              team:"$team",
              pitch1:"$pitch1",
              pitch2:"$pitch2",
              techPitch:"$techPitch",
              businessReport:"$businessReport",
              techReport:"$techReport",
              n_members: { $size: "$members" }
           }
        }
     ] )
    .exec()
    }

module.exports.consultar = id => {
    return Equipa
        .findOne({"_id":id})
        .exec()
}

module.exports.consultar_membro = (id,membro)=> {
    return Equipa
        .aggregate( 
            [ 
                { $unwind : "$members" },
                { $match : {"members.id": membro}
                },
                {   
                    $group:
                    {
                        _id: "$members.id",
                        produtos: { $push: {produto:"$members" }}
                    }
                }
            ] )
        .exec()
}


module.exports.remove = id => {
    return Equipa.deleteOne({_id: id})
}

module.exports.inserir_equipa = (dados) => {
    var novo = new Equipa(dados)

    return novo.save()
}

module.exports.inserir_membro = (id,membro) => {
    return Equipa
    .update(
        { _id: id }, 
        { $push: { members:membro } },
    )
    .exec()
}
