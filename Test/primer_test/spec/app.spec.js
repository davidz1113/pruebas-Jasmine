const saludar = require('../app');

var x = false;
var a = {};
var b = {};

//to equal para variables mas complejas
//to be para variables mas primitivas como string, boolean, etc.
//

describe('verifiar que la variable es true', () => {
    it('La funcion saluda', () => {
        expect(saludar('Platzi')).toContain('Hola Platzi');
    });

    it('X es true', () => {
        expect(x).toBe(false);
        expect(x).toEqual(false);
    })

    it('objetos iguales', () => {
        expect(a).toEqual(b);
    })
})

describe('jasmine.objectContaining', () => {
    it('is useful for comparing arguments', () => {
        const callback = jasmine.createSpy('callback');
        callback({
            bar: 'baz',
        });
        expect(callback).toHaveBeenCalledWith(
            jasmine.objectContaining({
                bar: 'baz',
            })
        );
    });
});

describe("when used with a spy", () => {
    it("comparing arguments", () => {
        const callback = jasmine.createSpy('callback');
        callback('foobarbaz');
        expect(callback)
            .toHaveBeenCalledWith(jasmine.stringMatching('bar'));
        expect(callback)
            .not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
    });
});