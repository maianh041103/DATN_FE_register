import request from '@/utils/request'
import request2 from '@/utils/request2'
/**
 * Simple RESTful resource class
 */
class Resource {
  constructor(uri) {
    this.uri = uri;
  }
  // mapping new resource endpoints
  edit (id, resource) {
    return request2({
      url: 'user/' + id,
      method: 'put',
      data: resource
    })
  }

  list (query) {
    return request({
      url: "/" + this.uri,
      method: "get",
      params: query,
    });
  }
  get (id) {
    return request({
      url: "/" + this.uri + "/" + id,
      method: "get",
    });
  }
  store (resource) {
    return request({
      url: "/" + this.uri,
      method: "post",
      data: resource,
    });
  }
  update (id, resource) {
    return request({
      url: "/" + this.uri + "/" + id,
      method: "put",
      data: resource,
    });
  }
  destroy (id) {
    return request({
      url: "/" + this.uri + "/" + id,
      method: "delete",
    });
  }

  getDetailTwoLevel (id1, id2) {
    return request({
      url: "/" + this.uri + "/" + id1 + "/" + id2,
      method: "get",
    });
  }
}

export { Resource as default };
