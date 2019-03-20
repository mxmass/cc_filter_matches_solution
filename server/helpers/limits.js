module.exports = {
  check_limits: function (LIMITS, type='int', left, right) {
   /*
    * LIMITS = { MIN: x, MAX: y }
    * type: value data type (int|float)
    * left, right : {
    *         value: min|max value (positive int of float)
    *         must: true if field must have (left|right) constraint
    *                     even if value is not given
    *         over: true if constraint should remain if given value
    *                     is (lower|higher) than according limit value
    *       }
    */
    const parseFn = (type === 'int') ? parseInt : parseFloat;
    const step = (type === 'int') ? parseFn(1) : parseFn(0.01); // value quantum
    let a1 = '', a2 = ''; // values to return
    const lv = left.value ? parseFn(left.value) : false; // be sure we have proper value types
    const rv = right.value ? parseFn(right.value) : false;

    if (lv) {
      a1 = (lv > LIMITS.MIN) ? lv-step : LIMITS.MIN;
    } else {
      a1 = left.must ? LIMITS.MIN : false; // set value if no input value given, but "must" is true
    }
    a1 = ((a1 === LIMITS.MIN) && left.over) ? false : a1; // disable left constraint

    if (rv) {
      a2 = (rv < LIMITS.MAX) ? rv+step : LIMITS.MAX;
    } else {
      a2 = right.must ? LIMITS.MAX : false; // set value if no input value given, but "must" is true
    }
    a2 = ((a2 === LIMITS.MAX) && right.over) ? false : a2; // disable right constraint

    return limits_as_range_object(a1, a2);
  }
};

var limits_as_range_object = function (min_value, max_value) {
  /*
   * return object: { '$gt': x, '$lt': y } if any x, y given
   */
  let result = {};
  if (min_value !== false) result.$gt = min_value;
  if (max_value !== false) result.$lt = max_value;
  return result;
};
