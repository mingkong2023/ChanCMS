const {knex} = Chan;

class BaseService {
	model = null;
	constructor() {
	}

	all(model) {
		return knex(model).select()
	}

	detail(model,id){
		return knex(model).where('id', '=', id).select()
	}

	insert(model,params) {
		return knex(model).insert(params)
	}

	update(model,id, params) {
		return knex(model).where('id', '=', id).update(params)
	}

	delete(model,id) {
		return knex(model).where('id', '=', id).del()
	}
}

module.exports = BaseService;