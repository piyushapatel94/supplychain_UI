/**
 * Unit test for the alldetails route
 */

import {expect} from 'chai'
import {route} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

// To specify the other units that are required for this test:
// const test = route('alldetails', ['controller:alldetails'])
const test = route('alldetails')
describe(test.label, function () {
  test.setup()

  let sandbox, route

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    route = this.subject()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should exist', function () {
    expect(route).not.to.equal(undefined)
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })
})
