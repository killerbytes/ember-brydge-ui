import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeQueryResponse(store, type, payload) {
    const resp = { data:
      payload.map((p)=>{
        return {
          id: p.code,
          type: type.modelName,
          attributes: {
            text: p.subIndustry
          }
        }
      })
    }
    return resp;
  }

});
