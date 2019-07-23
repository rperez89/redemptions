const assertRevert = async (receiptPromise, reason) => {
  try {
    await receiptPromise
  } catch (error) {
    if (reason) {
      assert.include(error.message, reason, 'Incorrect revert reason')
    }
    return
  }
  assert.fail(`Expected a revert for reason: ${reason}`)
}

const getLog = (receipt, logName, argName) => {
  const log = receipt.logs.find(({ event }) => event === logName)
  return log ? log.args[argName] : null
}

const deployedContract = receipt => getLog(receipt, 'NewAppProxy', 'proxy')

const getSeconds = () => Math.round(new Date() / 1000)

module.exports = {
  assertRevert,
  getLog,
  deployedContract,
  getSeconds,
}
