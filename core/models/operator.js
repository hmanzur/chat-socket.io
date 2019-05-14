let Operator = function (data) {
    this.data = data;
};

Operator.prototype["data"] = {};

Operator.findById = function (id, callback) {
    db.get('Operators', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new Operator(data));
    });
};

module.exports = Operator;
