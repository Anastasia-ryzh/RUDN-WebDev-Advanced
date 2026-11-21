import {describe, expect, it} from 'vitest';

function sum(a: number, b: number, c: number) {
    return a + b + c;
}

describe("Смоук-тест", () => {
    it('Сумма работает на единицах', () =>{
        expect(sum(1,1,1)).toBe(3);
    });

    it('Сумма работает на трех разных числах', () => {
        expect(sum(13,65,69)).toBe(147);
    })

    it('Сумма не работает на трех разных числах', () => {
        expect(sum(13,65,69)).not.toBe(148);
    })
});