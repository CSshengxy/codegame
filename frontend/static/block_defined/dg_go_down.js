Blockly.Blocks['dg_go_down'] = {
    init: function () {
        this.appendDummyInput()
        .appendField('go down')
        .appendField(new Blockly.FieldNumber(0, 0, 100), 'step')
        .appendField('step')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(300)
        this.setTooltip('')
        this.setHelpUrl('')
    }
}
Blockly.JavaScript['dg_go_down'] = function (block) {
    let number_step = block.getFieldValue('step')
    let code = 'this.length = ' + number_step + ' ; this.direct = 3#'
    return code
}
