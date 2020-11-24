describe('GET /', function () {
    it('hello world check api success', function (done) {
        const url = baseurl + "/";
        request({
            url: url,
            method: 'GET'
        }, function (err, response, body) {
            if (err) {
                console.log(err);
            }
            body.should.be.a('string');
            response.statusCode.should.equal(200);
            done();
        });
    })
});

describe('POST /', function () {
    it('hello world not found 404 error', function (done) {
        const url = baseurl + "/";
        request({
            url: url,
            method: 'POST'
        }, function (err, response, body) {
            if (err) {
                console.log(err);
            }
            body.should.be.a('string');
            response.statusCode.should.equal(404);
            done();
        });
    })
});