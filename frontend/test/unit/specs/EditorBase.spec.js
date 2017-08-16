import EditorBase from '@/components/EditorBase'
import { createVue, destroyVM } from '../util'

describe('EditorBase.vue', () => {
    let vm

    beforeEach(() => {
        vm = createVue(EditorBase, true)
    })

    afterEach(() => {
        destroyVM(vm)
    })

    it('getCommandCodeList函数执行成功', () => {
        let commandList = vm.getCommandCodeList()
         expect(commandList).to.deep.equal([
             'go(5)',
             'repeat 3 times',
             ' go(4)',
             '    turn("left")',
             '    repeat 4 times',
             '        turn("right")',
             '    repeat-end',
             'repeat-end',
             'drop("key")',
             'function run',
             '    go(5)',
             '    repeat 3 times',
             '        go(3)',
             '    repeat-end',
             'function-end',
             'var x=3',
             'nancy.go(x)'
         ])
    })

    it('isSameFormat函数执行成功', () => {
        expect(vm.isSameFormat(/^\s*collect\('\w*'\)\s*$/, '   collect(\'key\')  ')).to.equal(true)
        expect(vm.isSameFormat(/^\s*collect\('\w*'\)\s*$/, '   collect(\'key\')')).to.equal(true)
        expect(vm.isSameFormat(/^\s*collect\('\w*'\)\s*$/, 'hhcollect(\'key\')')).to.equal(false)
        expect(vm.isSameFormat(/^\s*collect\('\w*'\)\s*$/, 'hhcollect(\'key\')hh')).to.equal(false)
        expect(vm.isSameFormat(/^\s*collect\('\w*'\)\s*$/, 'hhcollect(\'key\')hh')).to.equal(false)
        expect(vm.isSameFormat(/^\s*fly\(\)\s*$/,'fly()')).to.equal(true)
        expect(vm.isSameFormat(/^\s*fly\(\)\s*$/,'fly(2)')).to.equal(false)
        expect(vm.isSameFormat(/^\s*repeat \d+ times\s*$/,'repeat 33 times')).to.equal(true)
        expect(vm.isSameFormat(/^\s*repeat \d+ times\s*$/,'repeat aa times')).to.equal(false)
        expect(vm.isSameFormat(/^\s*var\s+\w*\s*=\s*\d*\s*$/,'var xx=33')).to.equal(true)
        expect(vm.isSameFormat(/^\s*var\s+\w*\s*=\s*\d*\s*$/,'var xx=3d')).to.equal(false)
        expect(vm.isSameFormat(/^\s*run\(\)\s*$/,'run()')).to.equal(true)
    })
    it('indexInCommandLibrary', () => {
        expect(vm.indexInCommandLibrary('collect("key")')).to.deep.equal('00')
        expect(vm.indexInCommandLibrary('collect(key)')).to.equal(false)
        expect(vm.indexInCommandLibrary('drop("key")')).to.deep.equal('01')
        expect(vm.indexInCommandLibrary('go(23)')).to.deep.equal('02')
        expect(vm.indexInCommandLibrary('go(ss)')).to.deep.equal('02')
        expect(vm.indexInCommandLibrary('go(\'hellp\')')).to.equal(false)
        expect(vm.indexInCommandLibrary('fly()')).to.deep.equal('03')
        expect(vm.indexInCommandLibrary('fly(hh)')).to.equal(false)
        expect(vm.indexInCommandLibrary('function-end')).to.deep.equal('04')
        expect(vm.indexInCommandLibrary('function run')).to.deep.equal('05')
        expect(vm.indexInCommandLibrary('nancy.go(5)')).to.deep.equal('10')
        expect(vm.indexInCommandLibrary('repeat 23 times')).to.deep.equal('20')
        expect(vm.indexInCommandLibrary('repeat dd times')).to.deep.equal('20')
        expect(vm.indexInCommandLibrary('repeatsstimes')).to.equal(false)
        expect(vm.indexInCommandLibrary('repeat-end')).to.deep.equal('21')
        expect(vm.indexInCommandLibrary('say("hello")')).to.deep.equal('22')
        expect(vm.indexInCommandLibrary('say(hello)')).to.equal(false)
        expect(vm.indexInCommandLibrary('turn("left")')).to.deep.equal('23')
        expect(vm.indexInCommandLibrary('turn("right")')).to.deep.equal('24')
        expect(vm.indexInCommandLibrary('var xx=33')).to.deep.equal('30')
        expect(vm.indexInCommandLibrary('varxx=dd')).to.equal(false)
        expect(vm.indexInCommandLibrary('var x')).to.equal('31')
        expect(vm.indexInCommandLibrary('varx')).to.equal(false)
        expect(vm.indexInCommandLibrary('wait(30)')).to.deep.equal('32')
        expect(vm.indexInCommandLibrary('wait(dd)')).to.deep.equal('32')
        expect(vm.indexInCommandLibrary('wait(\'hha\')')).to.equal(false)
    })
    it('getSafeCode', () => {
        expect(vm.getSafeCode('collect("key")')).to.equal('this.collect("key");')
        expect(vm.getSafeCode('drop("key")')).to.equal('this.drop("key");')
        expect(vm.getSafeCode('fly()')).to.equal('this.fly();')
        expect(vm.getSafeCode('go(55)')).to.equal('this.go(55);')
        expect(vm.getSafeCode('function-end')).to.equal('\';')
        expect(vm.getSafeCode('function run')).to.equal('this.functionSet[\'run\']=\'')
        expect(vm.getSafeCode('run()')).to.equal('eval(this.functionSet["run"]);')
        expect(vm.getSafeCode('nancy.go(5)')).to.equal('this.nancygo(5);')
        expect(vm.getSafeCode('repeat 3 times')).to.equal('for(let i = 0; i < 3; i++) {')
        expect(vm.getSafeCode('repeat-end')).to.equal('}')
        expect(vm.getSafeCode('var x=3')).to.equal('var x=3;')
        expect(vm.getSafeCode('x=2')).to.equal('x=2;')
        expect(vm.getSafeCode('var y')).to.equal('var y;')
        expect(vm.getSafeCode('y')).to.equal('y;')
        expect(vm.getSafeCode('wait(30)')).to.equal('this.wait(30);')
    })
})
