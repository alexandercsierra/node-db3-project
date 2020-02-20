module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

const db  = require('../data/db-config');

function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes').where({id}).first();
}

function findSteps(id){
    return db('steps')
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .select('schemes.scheme_name as scheme', 'steps.instructions')
        .where({scheme_id: id})
}
function add(newScheme){
    return db('schemes').insert(newScheme, 'id');
}
function update(newScheme, id){
    return db('schemes').where({id}).update(newScheme);
}
function remove(id){
    return db('schemes').where({id}).delete();
}

function addStep(step, scheme_id){
    step.scheme_id = scheme_id
    return db('steps').insert({...step, scheme_id: scheme_id})
}