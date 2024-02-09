import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | student-detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:student-detail');
    assert.ok(route);
  });
});
