let toolBoxText = [
    '<xml id="toolbox" style="display: none;">',
    '    <category name="Math" colour="#5C68A6">',
    '        <block type="math_number">',
    '            <field name="NUM">0</field>',
    '        </block>',
    '    </category>',
    '    <category name="Action" colour="#805ba5">',
    '        <block type="dg_forward">',
    '            <value name="NAME">',
    '                <shadow type="math_number">',
    '                    <field name="NUM">5</field>',
    '                </shadow>',
    '            </value>',
    '        </block>',
    '        <block type="dg_turn_direction">',
    '            <field name="direction">Right</field>',
    '        </block>',
    '        <block type="dg_say">',
    '            <field name="message">robot</field>',
    '        </block>',
    '        <block type="dg_collect">',
    '            <field name="message">coins</field>',
    '        </block>',
    '        <block type="dg_drop">',
    '            <field name="message">coins</field>',
    '        </block>',
    '        <block type="dg_fly"></block>',
    '    </category>',
    '    <category name="Control" colour="#5ba56d">',
    '        <block type="dg_for">',
    '            <value name="time">',
    '                <shadow type="math_number">',
    '                    <field name="NUM">3</field>',
    '                </shadow>',
    '            </value>',
    '        </block>',
    '        <block type="dg_wait">',
    '            <value name="NAME">',
    '                <shadow type="math_number">',
    '                    <field name="NUM">10</field>',
    '                </shadow>',
    '            </value>',
    '        </block>',
    '    </category>',
    '    <category name="Variables" colour="#A65C81">',
    '        <block type="dg_var">',
    '            <field name="variableName">x</field>',
    '        </block>',
    '        <block type="dg_var_set">',
    '            <field name="variableName">x</field>',
    '                <value name="value">',
    '                    <shadow type="math_number">',
    '                        <field name="NUM">2</field>',
    '                    </shadow>',
    '                </value>',
    '        </block>',
    '        <block type="dg_value_set">',
    '            <field name="variableName">x</field>',
    '                <value name="value">',
    '                    <shadow type="math_number">',
    '                        <field name="NUM">2</field>',
    '                    </shadow>',
    '                </value>',
    '        </block>',
    '        <block type="dg_get_value">',
    '            <field name="variableName">x</field>',
    '        </block>',
    '    </category>',
    '    <category name="Object" colour="#a5a55b">',
    '        <block type="dg_object">',
    '            <field name="characterName">robot</field>',
    '        </block>',
    '    </category>',
    '    <category name="Function" colour="#5b93a5">',
    '        <block type="dg_function">',
    '            <field name="functionName">Run</field>',
    '        </block>',
    '        <block type="dg_function_call">',
    '            <field name="functonName">Run</field>',
    '        </block>',
    '    </category>',
    '</xml>'
].join('\n')

/**
* Block需要的字符串常量
*
* @class blockConstData
*/
let blockConstData = {
    /**
    *用于初始化blocly工具栏的字符串
    *
    * @property toolBoxText
    * @type {String}
    */
    toolBoxText
}

module.exports = blockConstData
