const Hotel = artifacts.require("Hotel");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hotel", async(accounts) => {
  let instance;
  beforeEach( async() => {
    instance = await Hotel.deployed();
    [alice,bob] = accounts;
  });

  it("should assert true", async function () {
    return assert(instance,"Contract deployed successfully");
  });
});
